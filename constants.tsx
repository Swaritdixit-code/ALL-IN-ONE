
import React from 'react';
import { 
  Briefcase, ShieldAlert, Heart, GraduationCap, MapPin, 
  Cpu, Users, BrainCircuit, Smile, ShoppingBag,
  Scale, Stethoscope, Hammer, Calculator, FileText, 
  Compass, Palette, School, Handshake, AlertTriangle,
  Siren, Flame, Woman, Lock, Wifi, 
  Car, Hospital, Map, Dumbbell, Utensils,
  Moon, Pill, Baby, Activity, PawPrint,
  CheckCircle, BookOpen, Brain, Languages, Target,
  PenTool, Calendar, Cloud, Terminal, Power,
  Globe, Gift, Eye, BarChart, Leaf,
  MessageSquare, Mic, Disc, Zap, Lightbulb,
  Music, Book, HelpCircle, Star, ShoppingCart,
  ChefHat, Wallet, ListTodo, Home, Sun
} from 'lucide-react';
import { Category, CategoryKey, Feature } from './types';

export const CATEGORIES: Record<CategoryKey, Category> = {
  PROFESSIONAL: { id: 'PROFESSIONAL', label: 'Professional Services', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: 'Briefcase' },
  SAFETY: { id: 'SAFETY', label: 'Safety & Emergency', color: 'text-red-600', bgColor: 'bg-red-50', icon: 'ShieldAlert' },
  HEALTH: { id: 'HEALTH', label: 'Health & Lifestyle', color: 'text-green-600', bgColor: 'bg-green-50', icon: 'Heart' },
  EDUCATION: { id: 'EDUCATION', label: 'Education & Growth', color: 'text-purple-600', bgColor: 'bg-purple-50', icon: 'GraduationCap' },
  TRAVEL: { id: 'TRAVEL', label: 'Travel & Transport', color: 'text-orange-600', bgColor: 'bg-orange-50', icon: 'MapPin' },
  TECH: { id: 'TECH', label: 'Technology & Utils', color: 'text-indigo-600', bgColor: 'bg-indigo-50', icon: 'Cpu' },
  COMMUNITY: { id: 'COMMUNITY', label: 'Community & Social', color: 'text-cyan-600', bgColor: 'bg-cyan-50', icon: 'Users' },
  AI_CORE: { id: 'AI_CORE', label: 'AI Core Features', color: 'text-pink-600', bgColor: 'bg-pink-50', icon: 'BrainCircuit' },
  FUN: { id: 'FUN', label: 'Fun & Engagement', color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: 'Smile' },
  CONVENIENCE: { id: 'CONVENIENCE', label: 'Convenience', color: 'text-teal-600', bgColor: 'bg-teal-50', icon: 'ShoppingBag' },
};

export const FEATURES: Feature[] = [
  // 1. CORE PROFESSIONAL SERVICES
  { id: 1, name: 'Law / Lawyer Assistant', description: 'Simplified legal explanations & rights', category: 'PROFESSIONAL', icon: 'Scale', prompt: 'You are a professional legal consultant. Explain legal terms simply.' },
  { id: 2, name: 'Doctor / Health Consultant', description: 'Symptom checker & guidance', category: 'PROFESSIONAL', icon: 'Stethoscope', prompt: 'You are an AI health assistant. Provide guidance based on symptoms.' },
  { id: 3, name: 'Engineer / DIY Guide', description: 'Home & gadget repair steps', category: 'PROFESSIONAL', icon: 'Hammer', prompt: 'You are a master handyman and engineer. Provide step-by-step repair guides.' },
  { id: 4, name: 'Finance & Tax Advisor', description: 'Budgeting & tax basics', category: 'PROFESSIONAL', icon: 'Calculator', prompt: 'You are a financial advisor. Help with budgeting and tax calculations.' },
  { id: 5, name: 'Insurance Assistant', description: 'Insurance guidance & types', category: 'PROFESSIONAL', icon: 'FileText', prompt: 'You are an insurance expert. Explain different coverage types.' },
  { id: 6, name: 'Career Guidance', description: 'Resume tips & job advice', category: 'PROFESSIONAL', icon: 'Compass', prompt: 'You are a career coach. Help with resume building and interview prep.' },
  { id: 7, name: 'Skill Learning Hub', description: 'Coding, design, life skills', category: 'PROFESSIONAL', icon: 'Terminal', prompt: 'You are a multi-skilled tutor. Provide short tutorials on various topics.' },
  { id: 8, name: 'Architect / Interior Design', description: 'Layouts & decor ideas', category: 'PROFESSIONAL', icon: 'Palette', prompt: 'You are an interior designer. Suggest layouts and decor based on room dimensions.' },
  { id: 9, name: 'Tutor Finder', description: 'Online & local tutor matching', category: 'PROFESSIONAL', icon: 'School', prompt: 'You are a student coordinator. Help find the best subjects and tutors.' },
  { id: 10, name: 'Legal Doc Generator', description: 'Contracts & agreements', category: 'PROFESSIONAL', icon: 'FileText', prompt: 'You are a legal document assistant. Create simple draft contracts.' },

  // 2. SAFETY & EMERGENCY
  { id: 11, name: 'Emergency Contacts', description: 'Police, Fire, SOS', category: 'SAFETY', icon: 'AlertTriangle', prompt: 'Manage emergency contact lists and SOS signals.' },
  { id: 12, name: 'Disaster Alerts', description: 'Earthquake & flood info', category: 'SAFETY', icon: 'Siren', prompt: 'You are an emergency response unit. Provide real-time safety instructions.' },
  { id: 13, name: 'Women’s Safety System', description: 'SOS & location sharing', category: 'SAFETY', icon: 'Woman', prompt: 'Focus on safety tips and location tracking for women.' },
  { id: 14, name: 'Home Security Guidance', description: 'Locks, cameras, alarms', category: 'SAFETY', icon: 'Lock', prompt: 'Advise on securing homes and electronic locks.' },
  { id: 15, name: 'Cyber Safety', description: 'Scam alerts & passwords', category: 'SAFETY', icon: 'ShieldAlert', prompt: 'Provide advice on online security and scam detection.' },
  { id: 16, name: 'Nearby Danger Alerts', description: 'Crime or hazard alerts', category: 'SAFETY', icon: 'AlertTriangle', prompt: 'Simulate local hazard and safety reporting.' },
  { id: 17, name: 'Emergency AI Chat', description: 'Calm emergency steps', category: 'SAFETY', icon: 'MessageSquare', prompt: 'Stay calm and provide step-by-step first aid or safety instructions.' },
  { id: 18, name: 'Roadside Assistance', description: 'Vehicle breakdown help', category: 'SAFETY', icon: 'Hammer', prompt: 'Help with roadside mechanical issues and towing.' },
  { id: 19, name: 'Medical Emergency Finder', description: 'Nearest hospitals', category: 'SAFETY', icon: 'Hospital', prompt: 'Help locate nearest medical facilities.' },
  { id: 20, name: 'Disaster Survival Guide', description: 'Survival kits & info', category: 'SAFETY', icon: 'Flame', prompt: 'Provide survival techniques for natural disasters.' },

  // 3. HEALTH & LIFESTYLE
  { id: 21, name: 'Fitness Coach', description: 'Workouts & tracking', category: 'HEALTH', icon: 'Dumbbell', prompt: 'You are a fitness coach. Suggest exercises based on goals.' },
  { id: 22, name: 'Nutrition Planner', description: 'Meal plans & diet', category: 'HEALTH', icon: 'Utensils', prompt: 'Suggest healthy meal plans based on calorie needs.' },
  { id: 23, name: 'Mental Health Support', description: 'Mindfulness & stress', category: 'HEALTH', icon: 'Smile', prompt: 'You are a compassionate counselor. Provide stress relief exercises.' },
  { id: 24, name: 'Sleep Tracker & Tips', description: 'Sleep quality help', category: 'HEALTH', icon: 'Moon', prompt: 'Advise on sleep hygiene and circadian rhythms.' },
  { id: 25, name: 'Meds Reminder', description: 'Vaccine & meds tracking', category: 'HEALTH', icon: 'Pill', prompt: 'Manage medication schedules and reminders.' },
  { id: 26, name: 'Women & Child Health', description: 'Pediatric & maternal care', category: 'HEALTH', icon: 'Baby', prompt: 'Provide health advice for mothers and children.' },
  { id: 27, name: 'Yoga & Meditation', description: 'Guided sessions', category: 'HEALTH', icon: 'Activity', prompt: 'Lead a short guided meditation or yoga sequence.' },
  { id: 28, name: 'Pet Care Assistant', description: 'Vet advice & feeding', category: 'HEALTH', icon: 'PawPrint', prompt: 'You are a pet specialist. Give advice on feeding and health for animals.' },
  { id: 29, name: 'Weight & BMI Tracker', description: 'Track physical progress', category: 'HEALTH', icon: 'Activity', prompt: 'Calculate BMI and provide weight management tips.' },
  { id: 30, name: 'Habit Builder', description: 'Healthy routine setup', category: 'HEALTH', icon: 'CheckCircle', prompt: 'Help design and track new positive habits.' },

  // 4. EDUCATION & PERSONAL GROWTH
  { id: 31, name: 'Study Helper', description: 'Homework & explanations', category: 'EDUCATION', icon: 'BookOpen', prompt: 'Help explain complex academic concepts simply.' },
  { id: 32, name: 'Daily Knowledge', description: 'Life tips & facts', category: 'EDUCATION', icon: 'Lightbulb', prompt: 'Share an interesting fact or life hack daily.' },
  { id: 33, name: 'Quizzes & Brain Teasers', description: 'Fun learning tests', category: 'EDUCATION', icon: 'Brain', prompt: 'Generate a short quiz or riddle.' },
  { id: 34, name: 'Language Learning', description: 'Lessons & practice', category: 'EDUCATION', icon: 'Languages', prompt: 'Help with vocabulary and conversation in any language.' },
  { id: 35, name: 'Personality Test', description: 'Skills & self-assessment', category: 'EDUCATION', icon: 'Target', prompt: 'Simulate a Myers-Briggs or skill assessment test.' },
  { id: 36, name: 'AI Tutor', description: 'Interactive Q&A', category: 'EDUCATION', icon: 'MessageSquare', prompt: 'Act as a 1-on-1 tutor for any subject.' },
  { id: 37, name: 'Career Skill Courses', description: 'Short professional courses', category: 'EDUCATION', icon: 'Briefcase', prompt: 'Summarize key points of a specific professional skill.' },
  { id: 38, name: 'Exam Prep Assistant', description: 'Study plans & mocks', category: 'EDUCATION', icon: 'PenTool', prompt: 'Generate a study schedule for an upcoming exam.' },
  { id: 39, name: 'Book Recommendations', description: 'Reading lists', category: 'EDUCATION', icon: 'Book', prompt: 'Suggest books based on genres or interests.' },
  { id: 40, name: 'Brain Training Games', description: 'Memory improvement', category: 'EDUCATION', icon: 'Zap', prompt: 'Suggest games to improve cognitive functions.' },

  // 5. TRAVEL & TRANSPORT
  { id: 41, name: 'Navigation Alerts', description: 'Traffic & routes', category: 'TRAVEL', icon: 'MapPin', prompt: 'Check traffic conditions and find best routes.' },
  { id: 42, name: 'Vehicle Maintenance', description: 'Car & bike health', category: 'TRAVEL', icon: 'Hammer', prompt: 'Remind and explain routine vehicle maintenance.' },
  { id: 43, name: 'Weather Forecast', description: 'Alerts & updates', category: 'TRAVEL', icon: 'Sun', prompt: 'Provide local and destination weather forecasts.' },
  { id: 44, name: 'Public Directory', description: 'Utilities & services', category: 'TRAVEL', icon: 'Globe', prompt: 'Find contact info for local government and public utilities.' },
  { id: 45, name: 'Calendar Manager', description: 'Event planning', category: 'TRAVEL', icon: 'Calendar', prompt: 'Help organize and schedule travel events.' },
  { id: 46, name: 'Tourist Guide', description: 'Local attractions', category: 'TRAVEL', icon: 'Map', prompt: 'Suggest sights and restaurants at a specific location.' },
  { id: 47, name: 'Fuel & EV Finder', description: 'Stations & charging', category: 'TRAVEL', icon: 'Zap', prompt: 'Locate nearest fuel or EV stations.' },
  { id: 48, name: 'Transport Tracker', description: 'Bus & train times', category: 'TRAVEL', icon: 'Activity', prompt: 'Check public transport schedules.' },
  { id: 49, name: 'Parking Finder', description: 'Locate parking spots', category: 'TRAVEL', icon: 'CheckCircle', prompt: 'Find available parking in busy areas.' },
  { id: 50, name: 'Travel Checklist', description: 'Packing generator', category: 'TRAVEL', icon: 'ListTodo', prompt: 'Generate a packing list based on destination and duration.' },

  // 6. TECHNOLOGY & UTILITIES
  { id: 51, name: 'Tech Support', description: 'Gadget troubleshooting', category: 'TECH', icon: 'Cpu', prompt: 'Help solve common laptop and phone issues.' },
  { id: 52, name: 'Energy Saver', description: 'Bill reduction tips', category: 'TECH', icon: 'Power', prompt: 'Suggest ways to save on electricity and water.' },
  { id: 53, name: 'Doc Scanner', description: 'Scan & store', category: 'TECH', icon: 'Eye', prompt: 'Explain how to use mobile camera for high-quality scanning.' },
  { id: 54, name: 'Notes Organizer', description: 'File management', category: 'TECH', icon: 'FileText', prompt: 'Help categorize and organize digital notes.' },
  { id: 55, name: 'AI Tech Advisor', description: 'Software suggestions', category: 'TECH', icon: 'Zap', prompt: 'Recommend best apps and gadgets for specific needs.' },
  { id: 56, name: 'Smart Home Hub', description: 'Integration tips', category: 'TECH', icon: 'Home', prompt: 'Advise on smart home setup and automation.' },
  { id: 57, name: 'Cloud Backup', description: 'Data safety tips', category: 'TECH', icon: 'Cloud', prompt: 'Explain cloud storage and backup strategies.' },
  { id: 58, name: 'Wi-Fi Troubleshooter', description: 'Internet speed help', category: 'TECH', icon: 'Wifi', prompt: 'Help fix slow internet and router problems.' },
  { id: 59, name: 'Device Health', description: 'Battery & storage', category: 'TECH', icon: 'Activity', prompt: 'Analyze and provide tips for device optimization.' },
  { id: 60, name: 'Digital Skills', description: 'Software tutorials', category: 'TECH', icon: 'Terminal', prompt: 'Provide step-by-step guides for using common apps.' },

  // 7. COMMUNITY & SOCIAL
  { id: 61, name: 'Volunteer Portal', description: 'Help requests & offers', category: 'COMMUNITY', icon: 'Heart', prompt: 'Coordinate community service and volunteering.' },
  { id: 62, name: 'Gov Schemes', description: 'Local event & aid info', category: 'COMMUNITY', icon: 'Globe', prompt: 'Find and explain government welfare programs.' },
  { id: 63, name: 'Community Chat', description: 'AI moderated discussions', category: 'COMMUNITY', icon: 'MessageSquare', prompt: 'Provide a safe space for neighbor interactions.' },
  { id: 64, name: 'Donation Guide', description: 'Charity matching', category: 'COMMUNITY', icon: 'Gift', prompt: 'Match resources with verified charities.' },
  { id: 65, name: 'Neighborhood Watch', description: 'Issue reporting', category: 'COMMUNITY', icon: 'ShieldAlert', prompt: 'Report local issues like potholes or safety hazards.' },
  { id: 66, name: 'Skill Exchange', description: 'Barter system', category: 'COMMUNITY', icon: 'Handshake', prompt: 'Help users trade skills without money.' },
  { id: 67, name: 'Lost & Found', description: 'Item reporting', category: 'COMMUNITY', icon: 'HelpCircle', prompt: 'Assist in listing and finding lost items.' },
  { id: 68, name: 'Local Deals', description: 'Neighborhood offers', category: 'COMMUNITY', icon: 'ShoppingBag', prompt: 'Find current sales and offers nearby.' },
  { id: 69, name: 'Community Polls', description: 'Group feedback', category: 'COMMUNITY', icon: 'BarChart', prompt: 'Create and analyze polls for community decisions.' },
  { id: 70, name: 'Eco Impact Tips', description: 'Social responsibility', category: 'COMMUNITY', icon: 'Leaf', prompt: 'Suggest ways to reduce environmental footprint.' },

  // 8. AI-POWERED CORE
  { id: 71, name: 'AI Assistant', description: 'General text chat', category: 'AI_CORE', icon: 'MessageSquare', prompt: 'You are the core Life Helper AI. Help with anything.' },
  { id: 72, name: 'Voice Assistant', description: 'Two-way talking', category: 'AI_CORE', icon: 'Mic', prompt: 'You are an AI with a voice. Keep answers conversational.' },
  { id: 73, name: 'AI Memory', description: 'Preference learning', category: 'AI_CORE', icon: 'Disc', prompt: 'Analyze past interactions to personalize the experience.' },
  { id: 74, name: 'Doc Summarizer', description: 'Extract key info', category: 'AI_CORE', icon: 'FileText', prompt: 'Summarize the text provided into bullet points.' },
  { id: 75, name: 'Personalized Engine', description: 'Interest-based tips', category: 'AI_CORE', icon: 'Zap', prompt: 'Suggest topics based on user browsing history.' },
  { id: 76, name: 'Life Coach', description: 'Health & career coach', category: 'AI_CORE', icon: 'Star', prompt: 'Provide holistic life advice for growth.' },
  { id: 77, name: 'Goal Tracker', description: 'Fitness & life goals', category: 'AI_CORE', icon: 'Target', prompt: 'Motivate and track progress toward long-term goals.' },
  { id: 78, name: 'Smart Reminders', description: 'Contextual alerts', category: 'AI_CORE', icon: 'Zap', prompt: 'Predict upcoming tasks and send intelligent reminders.' },
  { id: 79, name: 'AI Health Advisor', description: 'Preventive checkups', category: 'AI_CORE', icon: 'Heart', prompt: 'Advise on regular checkups based on age and history.' },
  { id: 80, name: 'AI Safety Advisor', description: 'Risk assessment', category: 'AI_CORE', icon: 'ShieldAlert', prompt: 'Analyze situations for potential fraud or safety risks.' },

  // 9. FUN & ENGAGEMENT
  { id: 81, name: 'Mini Games', description: 'Brain puzzles', category: 'FUN', icon: 'Zap', prompt: 'Provide a word puzzle or memory challenge.' },
  { id: 82, name: 'Journaling', description: 'Voice & text diary', category: 'FUN', icon: 'PenTool', prompt: 'Act as a supportive journal prompt generator.' },
  { id: 83, name: 'Social Sharing', description: 'Progress & tips', category: 'FUN', icon: 'Globe', prompt: 'Help draft a post about recent achievements.' },
  { id: 84, name: 'Daily Motivation', description: 'Quotes & inspiration', category: 'FUN', icon: 'Star', prompt: 'Give a powerful motivational quote.' },
  { id: 85, name: 'Daily Challenges', description: 'Streaks & fun tasks', category: 'FUN', icon: 'Activity', prompt: 'Issue a small daily challenge (e.g., drink more water).' },
  { id: 86, name: 'Fun AI Chat', description: 'Jokes & casual talk', category: 'FUN', icon: 'Smile', prompt: 'Tell a funny joke or engage in casual banter.' },
  { id: 87, name: 'Relaxation Sounds', description: 'Music & ambiance', category: 'FUN', icon: 'Music', prompt: 'Describe calming soundscapes or play ambient noises.' },
  { id: 88, name: 'Audiobooks', description: 'Stories & reads', category: 'FUN', icon: 'Book', prompt: 'Summarize or read a short story.' },
  { id: 89, name: 'Drawing Ideas', description: 'Art prompts', category: 'FUN', icon: 'Palette', prompt: 'Suggest a creative theme for an art project.' },
  { id: 90, name: 'Trivia Master', description: 'Fun facts & quiz', category: 'FUN', icon: 'Brain', prompt: 'Challenge the user with obscure trivia.' },

  // 10. CONVENIENCE & LIFESTYLE
  { id: 91, name: 'Shopping Helper', description: 'Price & deals search', category: 'CONVENIENCE', icon: 'ShoppingCart', prompt: 'Compare prices for a requested product.' },
  { id: 92, name: 'Recipe Planner', description: 'Meal & grocery lists', category: 'CONVENIENCE', icon: 'ChefHat', prompt: 'Plan a meal based on ingredients in the fridge.' },
  { id: 93, name: 'Bill Helper', description: 'Payment tracker', category: 'CONVENIENCE', icon: 'Wallet', prompt: 'Organize and track utility bill deadlines.' },
  { id: 94, name: 'Daily Planner', description: 'To-do list manager', category: 'CONVENIENCE', icon: 'ListTodo', prompt: 'Organize the day into manageable slots.' },
  { id: 95, name: 'Household Tips', description: 'Cleaning & chores', category: 'CONVENIENCE', icon: 'Home', prompt: 'Provide eco-friendly cleaning hacks.' },
  { id: 96, name: 'Plant Care', description: 'Gardening help', category: 'CONVENIENCE', icon: 'Leaf', prompt: 'Advise on plant watering and sunlight needs.' },
  { id: 97, name: 'Style Advisor', description: 'Fashion tips', category: 'CONVENIENCE', icon: 'Palette', prompt: 'Suggest outfits based on the day’s weather.' },
  { id: 98, name: 'Travel Packing', description: 'Suitcase assistant', category: 'CONVENIENCE', icon: 'CheckCircle', prompt: 'Verify if everything is packed for a trip.' },
  { id: 99, name: 'Translator', description: 'Instant translation', category: 'CONVENIENCE', icon: 'Languages', prompt: 'Translate text between any two languages.' },
  { id: 100, name: 'Quick Notes', description: 'Voice & text memos', category: 'CONVENIENCE', icon: 'PenTool', prompt: 'Take and store a fast note or voice clip.' },
];
