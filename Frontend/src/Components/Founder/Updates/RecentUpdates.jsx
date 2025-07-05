import { useEffect } from "react";
import {
  Card, CardHeader, CardTitle, CardContent,
} from "../../UI/Card";
import { Badge } from "../../UI/Badge";
import { Heart, MessageSquare, Calendar } from "lucide-react";
import { usePitchPost } from "../../../context/PitchPostContext";

const imgPlaceholder = "https://via.placeholder.com/120x80?text=No+Image";

export default function RecentUpdates() {
  const { post, getAllPost, loading } = usePitchPost();

  useEffect(() => { getAllPost(); }, [getAllPost]);
  const makeUrl = (absolute) => {
    const rel = absolute.split("uploads")[1];
    return rel
      ? `http://localhost:5000/uploads${rel.replace(/\\/g, "/")}`
      : imgPlaceholder;
  };

  if (loading) {
    return (
      <Card><CardContent className="p-6">Loading updates…</CardContent></Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-slate-600" />
            <span>Your Recent Updates</span>
          </div>
          <Badge variant="outline">{post.length} published</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {post.length === 0 && <p className="text-sm text-slate-500">No updates yet.</p>}

          {post.map((u) => (
            <div key={u._id} className="flex space-x-4 p-4 bg-slate-50 rounded-lg">
              <img
                src={makeUrl(u.media)}
                alt={u.title}
                className="w-24 h-16 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-1">{u.title}</h3>
                <p className="text-sm text-slate-600 mb-2">{u.description}</p>

                <div className="flex items-center justify-between">
                  {/* tags can be undefined → fallback to [] */}
                  <div className="flex space-x-2">
                    {(u.tags || []).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-slate-500">
                    <span className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      {(u.likes || []).length}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      {(u.comments || []).length}
                    </span>
                    <span>{new Date(u.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
