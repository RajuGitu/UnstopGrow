import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Button } from "../../UI/Button";
function TrendingStartups() {
  const [showAll, setShowAll] = useState(false);

  const mockStartups = [
    {
      id: 1,
      name: "EcoTech Solutions",
      logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
      tagline: "Revolutionizing renewable energy with AI-powered smart grids",
      domain: "GreenTech",
      stage: "MVP",
      fundingGoal: 5000000,
      currentFunding: 1200000,
      location: "Bangalore, India",
      founded: "2023",
      employees: "11-50",
      tags: ["AI", "GreenTech", "B2B"],
      pitchDeck:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      description:
        "EcoTech Solutions is building the next generation of smart grid technology that uses AI to optimize renewable energy distribution.",
      founder: {
        name: "Priya Sharma",
        role: "CEO & Co-founder",
        linkedin: "https://linkedin.com/in/priyasharma",
      },
      traction: {
        users: 15000,
        revenue: 250000,
        growth: 45,
      },
      verified: true,
      saved: false,
    },
    {
      id: 2,
      name: "HealthHub AI",
      logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=center",
      tagline: "AI-powered healthcare diagnostics for rural communities",
      domain: "HealthTech",
      stage: "Prototype",
      fundingGoal: 3000000,
      currentFunding: 800000,
      location: "Mumbai, India",
      founded: "2023",
      employees: "1-10",
      tags: ["AI", "HealthTech", "Rural"],
      pitchDeck:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
      description:
        "Bringing world-class healthcare diagnostics to underserved rural communities through AI-powered mobile health units.",
      founder: {
        name: "Dr. Rajesh Kumar",
        role: "Founder & CTO",
        linkedin: "https://linkedin.com/in/drrajeshkumar",
      },
      traction: {
        users: 8500,
        revenue: 120000,
        growth: 67,
      },
      verified: true,
      saved: true,
    },
    {
      id: 3,
      name: "EdFuture",
      logo: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=100&h=100&fit=crop&crop=center",
      tagline: "Personalized learning platform for K-12 students",
      domain: "EdTech",
      stage: "Funded",
      fundingGoal: 8000000,
      currentFunding: 6500000,
      location: "Delhi, India",
      founded: "2022",
      employees: "51-100",
      tags: ["EdTech", "AI", "K12"],
      pitchDeck:
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop",
      description:
        "AI-powered personalized learning platform that adapts to each student's learning style and pace.",
      founder: {
        name: "Anita Patel",
        role: "CEO",
        linkedin: "https://linkedin.com/in/anitapatel",
      },
      traction: {
        users: 50000,
        revenue: 1200000,
        growth: 89,
      },
      verified: true,
      saved: false,
    },
    {
      id: 4,
      name: "FinFlow",
      logo: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=100&h=100&fit=crop&crop=center",
      tagline: "Digital banking solutions for small businesses",
      domain: "FinTech",
      stage: "MVP",
      fundingGoal: 4500000,
      currentFunding: 2100000,
      location: "Pune, India",
      founded: "2023",
      employees: "11-50",
      tags: ["FinTech", "B2B", "Banking"],
      pitchDeck:
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      description:
        "Comprehensive digital banking platform designed specifically for small and medium businesses.",
      founder: {
        name: "Vikram Singh",
        role: "Founder",
        linkedin: "https://linkedin.com/in/vikramsingh",
      },
      traction: {
        users: 12000,
        revenue: 350000,
        growth: 52,
      },
      verified: true,
      saved: true,
    },
  ];

  const displayedStartups = showAll ? mockStartups : mockStartups.slice(0, 3);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>🔥 Trending Startups This Week</span>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View All"}
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedStartups.map((startup) => (
              <div
                key={startup.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={startup.logo}
                    alt={startup.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{startup.name}</h3>
                    <p className="text-sm text-gray-600">{startup.domain}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">{startup.tagline}</p>
                <div className="flex justify-between items-center">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-300 mt-5"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TrendingStartups;
