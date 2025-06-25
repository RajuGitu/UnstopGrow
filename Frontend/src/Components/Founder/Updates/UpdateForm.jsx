import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../UI/Card';
import { Input } from '../../UI/Input';
import { Button } from '../../UI/Button';
import { Badge } from '../../UI/Badge';
import { PenTool, Send } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';

const availableTags = [
    '#growth', '#milestone', '#funding', '#product', '#team',
    '#launch', '#update', '#achievement', '#partnership', '#innovation'
];

const UpdateForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    const handleTagToggle = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handlePublish = () => {
        if (!title || !description) {
            return;
        }

        setTitle('');
        setDescription('');
        setSelectedTags([]);
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell your story in detail..."
                        className="w-full h-32 p-3 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        maxLength={500}
                    />
                    <p className="text-xs text-slate-500 mt-1">{description.length}/500 characters</p>
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
                    >
                        <Send className="h-4 w-4 mr-2" /> Publish Update
                    </Button>
                </div>
            </CardContent>
        </Card>

        
    );
};

export default UpdateForm;
