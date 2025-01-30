import { create } from 'zustand';
import { EMISSION_FACTORS } from './constants';

interface Activity {
  id: string;
  date: string;
  type: 'TRANSPORT' | 'DIET' | 'ENERGY';
  category: string;
  value: number;
  emissions: number;
}

interface UserState {
  activities: Activity[];
  weeklyCO2: number;
  monthlyCO2: number;
  goal: number;
  badges: string[];
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  calculateEmissions: () => void;
}

export const useStore = create<UserState>((set, get) => ({
  activities: [],
  weeklyCO2: 142,
  monthlyCO2: 568,
  goal: 100,
  badges: ['green-commuter', 'plant-power'],
  
  addActivity: (activity) => {
    const newActivity = {
      ...activity,
      id: Math.random().toString(36).substring(7),
    };
    
    set((state) => ({
      activities: [...state.activities, newActivity],
    }));
    
    get().calculateEmissions();
  },
  
  calculateEmissions: () => {
    const activities = get().activities;
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const weeklyActivities = activities.filter(
      (a) => new Date(a.date) >= weekAgo
    );
    const monthlyActivities = activities.filter(
      (a) => new Date(a.date) >= monthAgo
    );
    
    const weeklyCO2 = weeklyActivities.reduce((acc, curr) => acc + curr.emissions, 0);
    const monthlyCO2 = monthlyActivities.reduce((acc, curr) => acc + curr.emissions, 0);
    
    set({ weeklyCO2, monthlyCO2 });
  },
}));