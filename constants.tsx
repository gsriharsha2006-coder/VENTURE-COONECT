import React from 'react';
import { 
  LayoutDashboard, 
  Send, 
  Lightbulb, 
  BrainCircuit, 
  MessageSquare, 
  User, 
  Calendar, 
  Trophy
} from 'lucide-react';

export const COLORS = {
  primary: '#4f46e5',
  secondary: '#7c3aed',
  accent: '#10b981',
  danger: '#ef4444'
};

export const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, roles: ['FOUNDER', 'INVESTOR', 'ADMIN'] },
  { id: 'workspace', label: 'Idea Workspace', icon: <Lightbulb size={20} />, roles: ['FOUNDER', 'INVESTOR'] },
  { id: 'apply', label: 'Submit to VC', icon: <Send size={20} />, roles: ['FOUNDER'] },
  { id: 'opportunities', label: 'Opportunities', icon: <Trophy size={20} />, roles: ['FOUNDER'] },
  { id: 'unicorn', label: 'Unicorn Meeting', icon: <Calendar size={20} />, roles: ['FOUNDER'] },
  { id: 'vc-readiness', label: 'VC Readiness Report', icon: <BrainCircuit size={20} />, roles: ['FOUNDER'] },
  { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} />, roles: ['FOUNDER', 'INVESTOR'] },
  { id: 'profile', label: 'Profile', icon: <User size={20} />, roles: ['FOUNDER', 'INVESTOR', 'ADMIN'] },
];

export const MOCK_OPPORTUNITIES = [
  { id: '1', type: 'Hackathon', name: 'Global GenAI 2025', prize: '$50,000', deadline: '2025-06-15' },
  { id: '2', type: 'Incubator', name: 'Y-Combinator Summer Batch', location: 'San Francisco', deadline: '2025-05-01' },
  { id: '3', type: 'Grant', name: 'UNESCO Youth Innovation', value: '$10,000', deadline: '2025-04-20' },
];
