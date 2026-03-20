import type { Message, Milestone, ProProfile, Project, Quote } from "@/types";

export const demoPros: ProProfile[] = [
  {
    id: "pro-1",
    businessName: "Atelier Mason",
    trades: ["Renovation", "Kitchen", "Bathroom"],
    bio: "High-touch renovation studio focused on kitchens, bathrooms, and heritage interiors.",
    ratingAvg: 4.9,
    ratingCount: 123,
    hourlyRate: 118,
    locationCity: "Brooklyn",
    yearsExperience: 14,
    verified: true,
    featured: true,
    portfolioImages: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "pro-2",
    businessName: "Volt Works",
    trades: ["Electrical", "HVAC"],
    bio: "Licensed electrical contractor with fast-response crews for rewires, panels, and HVAC upgrades.",
    ratingAvg: 4.8,
    ratingCount: 86,
    hourlyRate: 102,
    locationCity: "Queens",
    yearsExperience: 10,
    verified: true,
    portfolioImages: [
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "pro-3",
    businessName: "Brush & Beam",
    trades: ["Painting", "Flooring"],
    bio: "Interior finishing specialists for paint, trim, flooring, and polished handover details.",
    ratingAvg: 4.7,
    ratingCount: 59,
    hourlyRate: 74,
    locationCity: "Jersey City",
    yearsExperience: 8,
    verified: true,
    portfolioImages: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "pro-4",
    businessName: "Greenframe Build",
    trades: ["Extensions", "Carpentry", "Roofing"],
    bio: "Design-build shop for garden studios, loft conversions, and structural carpentry.",
    ratingAvg: 5,
    ratingCount: 41,
    hourlyRate: 132,
    locationCity: "Hoboken",
    yearsExperience: 16,
    verified: true,
    portfolioImages: [
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=900&q=80"
    ]
  }
];

export const demoProjects: Project[] = [
  {
    id: "project-1",
    clientId: "client-1",
    title: "Kitchen renovation in Park Slope",
    description: "Full gut renovation with custom cabinetry, quartz worktops, and new lighting plan.",
    category: "Renovation",
    status: "in_progress",
    budgetMin: 18000,
    budgetMax: 26000,
    locationCity: "Brooklyn",
    urgency: "normal",
    desiredStartDate: "2025-03-25",
    desiredEndDate: "2025-05-30",
    updatedAt: "2h ago",
    assignedProId: "pro-1"
  },
  {
    id: "project-2",
    clientId: "client-1",
    title: "Bathroom remodel in Williamsburg",
    description: "Replace shower, retile walls, install vanity, improve ventilation.",
    category: "Bathroom",
    status: "matching",
    budgetMin: 9000,
    budgetMax: 14000,
    locationCity: "Brooklyn",
    urgency: "urgent",
    desiredStartDate: "2025-03-18",
    desiredEndDate: "2025-04-18",
    updatedAt: "45m ago"
  },
  {
    id: "project-3",
    clientId: "client-1",
    title: "Brownstone exterior repaint",
    description: "Restore and repaint front facade with weather-safe coating.",
    category: "Painting",
    status: "open",
    budgetMin: 4500,
    budgetMax: 7800,
    locationCity: "Queens",
    urgency: "flexible",
    desiredStartDate: "2025-04-12",
    desiredEndDate: "2025-05-01",
    updatedAt: "1d ago"
  },
  {
    id: "project-4",
    clientId: "client-2",
    title: "Panel upgrade and EV charger",
    description: "200A panel replacement and exterior EV charger install.",
    category: "Electrical",
    status: "completed",
    budgetMin: 3800,
    budgetMax: 6200,
    locationCity: "Queens",
    urgency: "normal",
    desiredStartDate: "2025-02-10",
    desiredEndDate: "2025-02-28",
    updatedAt: "6d ago",
    assignedProId: "pro-2"
  }
];

export const demoQuotes: Quote[] = [
  {
    id: "quote-1",
    projectId: "project-2",
    proId: "pro-1",
    status: "pending",
    totalAmount: 12800,
    estimatedDurationDays: 19,
    message: "We can start within two weeks and keep all tile and plumbing work under one PM.",
    breakdown: [
      { label: "Demolition", amount: 1800 },
      { label: "Plumbing and waterproofing", amount: 3600 },
      { label: "Fixtures and finishes", amount: 7400 }
    ]
  },
  {
    id: "quote-2",
    projectId: "project-2",
    proId: "pro-3",
    status: "pending",
    totalAmount: 11100,
    estimatedDurationDays: 16,
    message: "Lean finishing crew with transparent sourcing. Great fit if materials are preselected.",
    breakdown: [
      { label: "Strip-out and prep", amount: 1600 },
      { label: "Tile and flooring", amount: 3400 },
      { label: "Painting and install", amount: 6100 }
    ]
  }
];

export const demoMilestones: Milestone[] = [
  {
    id: "milestone-1",
    projectId: "project-1",
    title: "Demolition and first fix",
    amount: 6500,
    status: "released",
    dueDate: "2025-04-01"
  },
  {
    id: "milestone-2",
    projectId: "project-1",
    title: "Cabinetry and surfaces",
    amount: 8400,
    status: "in_progress",
    dueDate: "2025-04-18"
  },
  {
    id: "milestone-3",
    projectId: "project-1",
    title: "Final fixtures and handover",
    amount: 5200,
    status: "pending",
    dueDate: "2025-05-02"
  }
];

export const demoMessages: Message[] = [
  {
    id: "message-1",
    projectId: "project-1",
    senderName: "Amelia Stone",
    content: "Cabinetmaker confirmed Thursday install. I uploaded the revised elevation pack.",
    createdAt: "10:24 AM"
  },
  {
    id: "message-2",
    projectId: "project-1",
    senderName: "You",
    content: "Perfect. I approved the quartz sample and funded milestone two.",
    createdAt: "10:31 AM"
  }
];
