import React, { createContext, useContext, useState, useCallback } from 'react';
import axiosInstance from "../../utils/axiosInstance";

const ProfileContext = createContext();

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};

export const ProfileProvider = ({ children }) => {
    const [form, setForm] = useState({
        startUpName: "",
        bio: "",
        location: "",
        domain: "AI & Machine Learning",
        website: "",
        email: "",
        logo: "",
        achievements: "",
        readytomerge: false,
        socials: {
            twitter: "",
            linkedin: "",
            github: "",
        },
    });

    const [lockedFields, setLockedFields] = useState({
        startUpName: false,
        location: false,
        email: false,
        website: false,
        socials: {
            twitter: false,
            linkedin: false,
            github: false,
        }
    });

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [saveStatus, setSaveStatus] = useState(null);

    const MAX_BIO = 250;
    const MAX_ACH = 500;

    const fetchProfile = useCallback(async () => {
        try {
            setFetchLoading(true);
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No authentication token found");
            }

            const { data } = await axiosInstance.get("/founder/getprofile", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            const p = data.founderProfile;

            // Determine which fields are locked (already have values)
            const newLockedFields = {
                startUpName: Boolean(p.startUpName?.trim()),
                location: Boolean(p.location?.trim()),
                email: Boolean(p.email?.trim()),
                website: Boolean(p.website?.trim()),
                socials: {
                    twitter: Boolean(p.socials?.twitter?.trim()),
                    linkedin: Boolean(p.socials?.linkedin?.trim()),
                    github: Boolean(p.socials?.github?.trim()),
                }
            };

            setLockedFields(newLockedFields);

            setForm({
                startUpName: p.startUpName ?? "",
                bio: p.bio ?? "",
                location: p.location ?? "",
                domain: p.domain ?? "AI & Machine Learning",
                website: p.website ?? "",
                email: p.email ?? "",
                logo: p.logo ?? "",
                achievements: p.achievements ?? "",
                readytomerge: p.readytomerge ?? false,
                socials: {
                    twitter: p.socials?.twitter ?? "",
                    linkedin: p.socials?.linkedin ?? "",    
                    github: p.socials?.github ?? "",
                },
            });

            setErrors({});
            setSaveStatus(null);
        } catch (err) {
            console.error("Error fetching profile:", err);
            setErrors({ fetch: "Failed to load profile data. Please refresh the page." });
        } finally {
            setFetchLoading(false);
        }
    }, []);

    const validateForm = useCallback(() => {
        const newErrors = {};

        // Only validate startup name if it's not locked and empty
        if (!lockedFields.startUpName && !form.startUpName.trim()) {
            newErrors.startUpName = "Startup name is required";
        }

        // Bio is always editable
        if (!form.bio.trim()) {
            newErrors.bio = "Bio is required";
        } else if (form.bio.length > MAX_BIO) {
            newErrors.bio = `Bio must be ${MAX_BIO} characters or less`;
        }

        // Only validate location if it's not locked and empty
        if (!lockedFields.location && !form.location.trim()) {
            newErrors.location = "Location is required";
        }

        // Only validate domain if it's not locked and empty
        if (!form.domain.trim()) {
            newErrors.domain = "Domain is required";
        }

        // Only validate email if it's not locked and empty
        if (!lockedFields.email && !form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!lockedFields.email && form.email.trim() && !/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Only validate website if it's not locked and has a value
        if (!lockedFields.website && form.website && !/^https?:\/\/.+/.test(form.website)) {
            newErrors.website = "Please enter a valid website URL (starting with http:// or https://)";
        }

        // Achievements are always editable
        if (form.achievements.length > MAX_ACH) {
            newErrors.achievements = `Achievements must be ${MAX_ACH} characters or less`;
        }

        // Validate social links only if they're not locked and have values
        ['twitter', 'linkedin', 'github'].forEach(social => {
            if (!lockedFields.socials[social] && form.socials[social] && !/^https?:\/\/.+/.test(form.socials[social])) {
                newErrors[`socials.${social}`] = `Please enter a valid ${social} URL`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [form, lockedFields, MAX_BIO, MAX_ACH]);

    const saveProfile = useCallback(async () => {
        if (loading) return;

        // Validate form before saving
        if (!validateForm()) {
            setSaveStatus('error');
            return;
        }

        try {
            setLoading(true);
            setSaveStatus(null);

            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No authentication token found");
            }

            const formData = {
                bio: form.bio.trim(),
                achievements: form.achievements.trim(),
                readytomerge: form.readytomerge,
                domain: form.domain.trim(),
            };

            if (!lockedFields.startUpName) {
                formData.startUpName = form.startUpName.trim();
            }
            if (!lockedFields.location) {
                formData.location = form.location.trim();
            }
            if (!lockedFields.email) {
                formData.email = form.email.trim();
            }
            if (!lockedFields.website) {
                formData.website = form.website.trim();
            }

            const socialUpdates = {};
            if (!lockedFields.socials.twitter) {
                socialUpdates.twitter = form.socials.twitter.trim();
            }
            if (!lockedFields.socials.linkedin) {
                socialUpdates.linkedin = form.socials.linkedin.trim();
            }
            if (!lockedFields.socials.github) {
                socialUpdates.github = form.socials.github.trim();
            }

            // Only include socials if there are updates
            if (Object.keys(socialUpdates).length > 0) {
                formData.socials = socialUpdates;
            }

            await axiosInstance.put("/founder/updateprofile", formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            setSaveStatus('success');
            setErrors({});

            setTimeout(() => setSaveStatus(null), 3000);

        } catch (err) {
            console.error("Update failed:", err);
            setSaveStatus('error');

            if (err.response?.status === 401) {
                setErrors({ save: "Session expired. Please log in again." });
            } else if (err.response?.status === 400) {
                setErrors({ save: "Invalid data provided. Please check your inputs." });
            } else {
                setErrors({ save: "Failed to save changes. Please try again." });
            }
        } finally {
            setLoading(false);
        }
    }, [form, lockedFields, loading, validateForm]);

    const updateForm = useCallback((key, value) => {
        if (key === 'startUpName' && lockedFields.startUpName) return;
        if (key === 'location' && lockedFields.location) return;
        if (key === 'email' && lockedFields.email) return;
        if (key === 'website' && lockedFields.website) return;

        setForm((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) {
            setErrors(prev => ({ ...prev, [key]: null }));
        }
    }, [lockedFields, errors]);

    const updateSocial = useCallback((key, value) => {
        if (lockedFields.socials[key]) return;

        setForm((prev) => ({
            ...prev,
            socials: { ...prev.socials, [key]: value },
        }));
        // Clear specific social field error
        if (errors[`socials.${key}`]) {
            setErrors(prev => ({ ...prev, [`socials.${key}`]: null }));
        }
    }, [lockedFields, errors]);

    const clearErrors = useCallback(() => {
        setErrors({});
    }, []);

    const clearSaveStatus = useCallback(() => {
        setSaveStatus(null);
    }, []);

    const value = {
        // State
        form,
        lockedFields,
        loading,
        fetchLoading,
        errors,
        saveStatus,
        MAX_BIO,
        MAX_ACH,

        // Actions
        fetchProfile,
        saveProfile,
        validateForm,
        updateForm,
        updateSocial,
        clearErrors,
        clearSaveStatus,
    };

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
};
