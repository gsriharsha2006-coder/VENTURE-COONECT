
export enum UserRole {
  FOUNDER = 'FOUNDER',
  INVESTOR = 'INVESTOR',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isPremium: boolean;
  profileCompleted: boolean;
  avatar?: string;
}

export interface Idea {
  id: string;
  founderId: string;
  title: string;
  summary: string;
  description: string;
  industry: string;
  fundingStage: 'Pre-seed' | 'Seed' | 'Series A' | 'Series B';
  status: 'Draft' | 'Open for Pitch' | 'Funded';
  pitchScore?: number;
  collaborators: string[];
  createdAt: string;
}

export interface Meeting {
  id: string;
  founderId: string;
  investorId: string;
  date: string;
  time: string;
  link: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Pending';
  title: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface AICoachFeedback {
  id: string;
  pitchText: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  tips: string[];
  timestamp: string;
}
