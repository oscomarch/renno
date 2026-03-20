export const TRADE_CATEGORIES = [
  { id: "plumbing", label: "Plumbing", icon: "Wrench", tag: "fix" },
  { id: "electrical", label: "Electrical", icon: "Zap", tag: "fix" },
  { id: "painting", label: "Painting & Decorating", icon: "Paintbrush", tag: "paint" },
  { id: "carpentry", label: "Carpentry", icon: "Hammer", tag: "build" },
  { id: "roofing", label: "Roofing", icon: "Home", tag: "build" },
  { id: "tiling", label: "Tiling", icon: "Grid3x3", tag: "install" },
  { id: "renovation", label: "General Renovation", icon: "Building2", tag: "renovate" },
  { id: "masonry", label: "Masonry", icon: "Brick", tag: "build" },
  { id: "hvac", label: "HVAC", icon: "Thermometer", tag: "fix" },
  { id: "landscaping", label: "Landscaping", icon: "TreePine", tag: "maintain" },
  { id: "flooring", label: "Flooring", icon: "Layers", tag: "install" },
  { id: "windows_doors", label: "Windows & Doors", icon: "DoorOpen", tag: "install" }
] as const;

export const PROJECT_STATUSES = {
  draft: { label: "Draft", color: "brown" },
  open: { label: "Open", color: "terracotta" },
  matching: { label: "Finding Pros", color: "terracotta" },
  in_progress: { label: "In Progress", color: "sage" },
  completed: { label: "Completed", color: "sage" },
  cancelled: { label: "Cancelled", color: "brown" },
  disputed: { label: "Disputed", color: "red" }
} as const;

export const MILESTONE_STATUSES = {
  pending: { label: "Pending", color: "brown" },
  funded: { label: "Funded", color: "terracotta" },
  in_progress: { label: "In Progress", color: "terracotta" },
  submitted: { label: "Submitted for Review", color: "terracotta" },
  approved: { label: "Approved", color: "sage" },
  released: { label: "Payment Released", color: "sage" },
  disputed: { label: "Disputed", color: "red" }
} as const;

export const PLATFORM_FEE_BASIC = 0.08;
export const PLATFORM_FEE_PREMIUM = 0.05;
export const ESCROW_FEE_CLIENT = 0.035;
