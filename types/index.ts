export type Role = "client" | "pro" | "admin";

export type Profile = {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  phone?: string;
  role: Role;
};

export type ProProfile = Profile & {
  businessName: string;
  trades: string[];
  bio: string;
  ratingAvg: number;
  ratingCount: number;
  hourlyRate: number;
  locationCity: string;
  yearsExperience: number;
  verified: boolean;
  portfolioImages: string[];
  featured?: boolean;
};

export type ProjectStatus =
  | "draft"
  | "open"
  | "matching"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "disputed";

export type Project = {
  id: string;
  clientId: string;
  title: string;
  description: string;
  category: string;
  status: ProjectStatus;
  budgetMin: number;
  budgetMax: number;
  locationCity: string;
  urgency: "emergency" | "urgent" | "normal" | "flexible";
  desiredStartDate: string;
  desiredEndDate: string;
  updatedAt: string;
  assignedProId?: string;
};

export type Quote = {
  id: string;
  projectId: string;
  proId: string;
  status: "pending" | "accepted" | "rejected" | "withdrawn" | "expired";
  totalAmount: number;
  estimatedDurationDays: number;
  message: string;
  breakdown: Array<{ label: string; amount: number }>;
};

export type Milestone = {
  id: string;
  projectId: string;
  title: string;
  amount: number;
  status: "pending" | "funded" | "in_progress" | "submitted" | "approved" | "released" | "disputed";
  dueDate: string;
};

export type Message = {
  id: string;
  projectId: string;
  senderName: string;
  content: string;
  createdAt: string;
};
