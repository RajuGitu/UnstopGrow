import { Card, CardHeader, CardTitle, CardContent } from "../../UI/Card";
import { Lightbulb } from "lucide-react";

const tips = [
  "Keep your problem statement clear and relatable",
  "Use specific metrics and numbers for traction",
  "Include a compelling pitch video or demo",
  "Upload a professional PDF pitch deck",
  "Show market validation and early customer feedback",
];

const PitchTips = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center text-blue-700 text-2xl">
          <Lightbulb className="h-5 w-5 mr-2" />
          Pitch Tips
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <ul className="space-y-3 text-sm text-blue-700">
          {tips.map((tip, idx) => (
            <li key={idx} className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PitchTips;
