import { Card, CardHeader, CardTitle, CardContent } from "../../UI/Card";
import { Button } from "../../UI/Button";
import { User, Upload, Loader2, Check, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { useProfile } from "../../../context/ProfileContext";

export default function StartupLogoCard() {
    const inputRef = useRef(null);
    const { form } = useProfile();

    const getImageURL = (imagePath) => {
        if (!imagePath) return null;
        const relativePath = imagePath?.split("uploads")[1];
        return relativePath ? `http://localhost:5000/uploads${relativePath.replace(/\\/g, "/")}`
            : "https://via.placeholder.com/150";
    }
    const [logoFile, setLogoFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(getImageURL(form.logo));
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        setPreviewUrl(getImageURL(form.logo));
    }, [form.logo]);


    const reset = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token found");

            await axiosInstance.delete("/founder/logoUpload", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            setLogoFile(null);
            setPreviewUrl(null);
            setStatus(null);
        } catch (err) {
            console.error("Failed to delete logo:", err);
            setStatus("err");
        }
    };


    const acceptFile = (file) => {
        const types = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
        if (!file || !types.includes(file.type) || file.size > 5 * 1024 * 1024) {
            setStatus("err");
            return;
        }
        setLogoFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const pickFile = (e) => acceptFile(e.target.files[0]);

    const uploadLogo = async () => {
        if (!logoFile || saving) return;
        try {
            setSaving(true); setStatus(null);

            const fd = new FormData();
            fd.append("logo", logoFile);
            const token = localStorage.getItem("token");

            const res = await axiosInstance.post("/founder/logoUpload", fd, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            });
            const imageurl = getImageURL(res.data.url);
            setPreviewUrl(imageurl);
            setLogoFile(null);
            setStatus("ok");
        } catch (err) {
            console.error(err);
            setStatus("err");
        } finally {
            setSaving(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <User className="h-5 w-5 text-indigo-600" />
                    Startup Logo
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="mx-auto w-28 h-28 rounded-lg overflow-hidden bg-gray-200">
                    {previewUrl ? (
                        <img src={previewUrl} alt="logo" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Upload className="h-6 w-6" />
                        </div>
                    )}
                </div>

                <div className="flex justify-center gap-2">

                    {!previewUrl && (
                        <>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                ref={inputRef}
                                className="hidden"
                                onChange={pickFile}
                            />
                            <Button variant="outline" onClick={() => inputRef.current?.click()} disabled={saving}>
                                Browse
                            </Button>
                        </>
                    )}

                    {logoFile && (
                        <Button onClick={uploadLogo} disabled={saving}>
                            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Upload"}
                        </Button>
                    )}

                    {previewUrl && (
                        <Button variant="destructive" onClick={reset} disabled={saving}>
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                {status === "ok" && (
                    <p className="flex items-center justify-center gap-1 text-sm text-emerald-600">
                        <Check className="h-4 w-4" /> Uploaded successfully!
                    </p>
                )}
                {status === "err" && (
                    <p className="flex items-center justify-center gap-1 text-sm text-red-600">
                        <X className="h-4 w-4" /> Upload failed, try again.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
