import { Search, Bell } from "lucide-react";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";

export const InvestorNavbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search startups, founders, or domains..."
              className="pl-10 pr-4 py-2 w-full border-gray-300"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4 ">
          <Button variant="outline" size="sm" className="border-gray-300">
            Filters
          </Button>
          
          <div className="relative">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
          </div>

          <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
};