
export const mockStartups = [
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
    pitchDeck: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    description: "EcoTech Solutions is building the next generation of smart grid technology that uses AI to optimize renewable energy distribution.",
    founder: {
      name: "Priya Sharma",
      role: "CEO & Co-founder",
      linkedin: "https://linkedin.com/in/priyasharma" 
    },
    traction: {
      users: 15000,
      revenue: 250000,
      growth: 45
    },
    verified: true,
    saved: false
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
    pitchDeck: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
    description: "Bringing world-class healthcare diagnostics to underserved rural communities through AI-powered mobile health units.",
    founder: {
      name: "Dr. Rajesh Kumar",
      role: "Founder & CTO",
      linkedin: "https://linkedin.com/in/drrajeshkumar"
    },
    traction: {
      users: 8500,
      revenue: 120000,
      growth: 67
    },
    verified: true,
    saved: true
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
    pitchDeck: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop",
    description: "AI-powered personalized learning platform that adapts to each student's learning style and pace.",
    founder: {
      name: "Anita Patel",
      role: "CEO",
      linkedin: "https://linkedin.com/in/anitapatel"
    },
    traction: {
      users: 50000,
      revenue: 1200000,
      growth: 89
    },
    verified: true,
    saved: false
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
    pitchDeck: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
    description: "Comprehensive digital banking platform designed specifically for small and medium businesses.",
    founder: {
      name: "Vikram Singh",
      role: "Founder",
      linkedin: "https://linkedin.com/in/vikramsingh"
    },
    traction: {
      users: 12000,
      revenue: 350000,
      growth: 52
    },
    verified: true,
    saved: true
  }
];

export const mockContactRequests = [
  {
    id: 1,
    startup: "EcoTech Solutions",
    founder: "Priya Sharma",
    status: "accepted",
    requestedOn: "2024-01-15",
    message: "I'm interested in your renewable energy solutions and would like to discuss potential investment opportunities."
  },
  {
    id: 2,
    startup: "HealthHub AI",
    founder: "Dr. Rajesh Kumar",
    status: "pending",
    requestedOn: "2024-01-20",
    message: "Your healthcare AI platform looks promising. I'd love to learn more about your go-to-market strategy."
  },
  {
    id: 3,
    startup: "FinFlow",
    founder: "Vikram Singh",
    status: "declined",
    requestedOn: "2024-01-18",
    message: "Interested in your B2B fintech solution. Can we schedule a call?"
  }
];

export const mockInvestmentHistory = [
  {
    id: 1,
    startup: "EdFuture",
    amount: 50000,
    date: "2023-12-15",
    tier: "Angel",
    status: "confirmed",
    equity: "0.5%"
  },
  {
    id: 2,
    startup: "TechStart",
    amount: 25000,
    date: "2023-11-20",
    tier: "Silver",
    status: "confirmed",
    equity: "0.2%"
  }
];