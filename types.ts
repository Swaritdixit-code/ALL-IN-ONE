
export interface Feature {
  id: number;
  name: string;
  description: string;
  category: CategoryKey;
  icon: string;
  prompt: string;
}

export type CategoryKey = 
  | 'PROFESSIONAL' 
  | 'SAFETY' 
  | 'HEALTH' 
  | 'EDUCATION' 
  | 'TRAVEL' 
  | 'TECH' 
  | 'COMMUNITY' 
  | 'AI_CORE' 
  | 'FUN' 
  | 'CONVENIENCE';

export interface Category {
  id: CategoryKey;
  label: string;
  color: string;
  bgColor: string;
  icon: string;
}

export interface UserPreferences {
  name: string;
  language: string;
  location: string;
  medicalInfo?: string;
  interests: string[];
  history: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
