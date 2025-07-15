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
      ? `https://unstopgrowb.onrender.com/uploads${rel.replace(/\\/g, "/")}`
      : imgPlaceholder;
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-4 sm:p-6">Loading updates…</CardContent>
      </Card>
    );
  }

  // Limit to only 3 posts
  const limitedPosts = post.slice(0, 3);

  return (
    <Card className="bg-white/80 backdrop-blur-sm w-full">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
            <span className="text-base sm:text-lg">Your Recent Updates</span>
          </div>
          <Badge variant="outline" className="text-xs sm:text-sm">
            {limitedPosts.length} of {post.length} shown
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 sm:px-6">
        <div className="space-y-4 sm:space-y-6">
          {limitedPosts.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-8">
              No updates yet. Create your first update above!
            </p>
          )}

          {limitedPosts.map((u) => (
            <div key={u._id} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-slate-50 rounded-lg">
              <img
                src={makeUrl(u.media)}
                alt={u.title}
                className="w-full sm:w-24 h-32 sm:h-16 object-cover rounded-lg flex-shrink-0"
              />

              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-slate-900 text-sm sm:text-base line-clamp-2">
                  {u.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                  {u.description}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                  {/* tags can be undefined → fallback to [] */}
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {(u.tags || []).slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {(u.tags || []).length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{(u.tags || []).length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center space-x-3 sm:space-x-4 text-xs text-slate-500">
                    <span className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      {(u.likes || []).length}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      {(u.comments || []).length}
                    </span>
                    <span className="hidden sm:inline">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </span>
                    <span className="sm:hidden">
                      {new Date(u.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
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