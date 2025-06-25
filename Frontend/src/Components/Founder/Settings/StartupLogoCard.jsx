import { Card, CardHeader, CardTitle, CardContent } from "../../UI/Card";
import { Button } from "../../UI/Button";
import { User } from "lucide-react";
import { useRef ,useState} from "react";

export default function StartupLogoCard() {
    const inputRef = useRef(null);
    const [logoFile, setLogoFile] = useState(null);       // stores file object
    const [previewUrl, setPreviewUrl] = useState(null);   // stores preview URL

    const handleSelectLogo = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // allow only image types ≤ 5 MB
        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validTypes.includes(file.type) || file.size > 5 * 1024 * 1024) {
            alert("Please choose a JPG / PNG smaller than 5 MB.");
            return;
        }

        setLogoFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    return (
        <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-col space-y-1.5 p-6">
                <CardTitle className="flex items-center space-x-2 text-2xl font-semibold">
                    <User className="h-5 w-5 text-purple-600" />
                    <span>Startup Logo</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-6 pt-0">
                <div className="text-center">
                    {/* Logo preview */}
                    <div className="w-24 h-24 rounded-xl mx-auto mb-4 overflow-hidden">
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Logo preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                <span className="text-white font-bold text-2xl">T</span>
                            </div>
                        )}
                    </div>

                    {/* Hidden file input */}
                    <input
                        type="file"
                        accept="image/jpeg, image/png, image/jpg"
                        ref={inputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {/* Trigger button */}
                    <Button variant="outline" onClick={handleSelectLogo}>
                        Upload New Logo
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
