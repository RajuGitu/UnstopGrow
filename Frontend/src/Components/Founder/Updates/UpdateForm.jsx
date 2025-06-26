import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../UI/Card';
import { Input } from '../../UI/Input';
import { Button } from '../../UI/Button';
import { Badge } from '../../UI/Badge';
import { PenTool, Send, Upload, X, Image } from 'lucide-react';

const availableTags = [
    '#growth', '#milestone', '#funding', '#product', '#team',
    '#launch', '#update', '#achievement', '#partnership', '#innovation'
];

const UpdateForm = () => {
    const [title, setTitle] = useState('');
    const [descriptions, setDescriptions] = useState(''); // Match schema field name
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // Single image to match schema

    const handleTagToggle = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // Only take first file
        
        if (file && file.type.startsWith('image/')) {
            // Clean up previous image URL if it exists
            if (selectedImage) {
                URL.revokeObjectURL(selectedImage.preview);
            }
            
            setSelectedImage({
                file,
                preview: URL.createObjectURL(file),
                id: Math.random().toString(36).substr(2, 9)
            });
        }
    };

    const removeImage = () => {
        if (selectedImage) {
            URL.revokeObjectURL(selectedImage.preview);
            setSelectedImage(null);
        }
    };

    const handlePublish = async () => {
        if (!title || !descriptions || !selectedImage) {
            alert('Please fill in all required fields and add an image');
            return;
        }

        // Create FormData for file upload
        const formData = new FormData();
        formData.append('title', title);
        formData.append('descriptions', descriptions); // Match schema field name
        formData.append('media', selectedImage.file);
        formData.append('tags', JSON.stringify(selectedTags));

        try {
            // Example API call - replace with your actual endpoint
            const response = await fetch('/api/posts', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // Clean up and reset form
                if (selectedImage) {
                    URL.revokeObjectURL(selectedImage.preview);
                }
                
                setTitle('');
                setDescriptions('');
                setSelectedTags([]);
                setSelectedImage(null);
                
                alert('Update published successfully!');
            } else {
                alert('Failed to publish update');
            }
        } catch (error) {
            console.error('Error publishing update:', error);
            alert('Error publishing update');
        }
    };

    return (
        <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <PenTool className="h-5 w-5 text-indigo-600" />
                    <span>Create New Update</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Title Input */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Update Title *</label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Share an exciting milestone..."
                        className="text-lg font-medium"
                        maxLength={80}
                    />
                    <p className="text-xs text-slate-500 mt-1">{title.length}/80 characters</p>
                </div>

                {/* Description Input */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Description *</label>
                    <textarea
                        value={descriptions}
                        onChange={(e) => setDescriptions(e.target.value)}
                        placeholder="Tell your story in detail..."
                        className="w-full h-32 p-3 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        maxLength={500}
                    />
                    <p className="text-xs text-slate-500 mt-1">{descriptions.length}/500 characters</p>
                </div>

                {/* Single Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Add Image *</label>
                    
                    {!selectedImage ? (
                        <label className="cursor-pointer block">
                            <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors">
                                <Upload className="h-8 w-8 text-slate-400 mb-2" />
                                <span className="text-sm text-slate-600">Click to upload image</span>
                                <span className="text-xs text-slate-500 mt-1">JPG, PNG up to 10MB</span>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                    ) : (
                        <div className="relative w-full max-w-md">
                            <img
                                src={selectedImage.preview}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-lg border border-slate-200"
                            />
                            <button
                                onClick={removeImage}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Add Tags</label>
                    <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => (
                            <Badge
                                key={tag}
                                variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                                className={`cursor-pointer transition-all ${selectedTags.includes(tag)
                                    ? 'bg-indigo-500 text-white'
                                    : 'hover:bg-indigo-50'
                                    }`}
                                onClick={() => handleTagToggle(tag)}
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Publish Button */}
                <div className="flex justify-end pt-4 border-t">
                    <Button
                        onClick={handlePublish}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                        disabled={!title || !descriptions || !selectedImage}
                    >
                        <Send className="h-4 w-4 mr-2" /> Publish Update
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default UpdateForm;