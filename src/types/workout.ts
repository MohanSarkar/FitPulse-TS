export type Category = 'Cardio' | 'Strength' | 'HIIT' | 'Yoga' | 'Flexibility';

export interface Workout {
  id: string;             
  name: string;           
  category: Category;     
  duration: number;       
  calories: number;       
  rating: number;         
  equipment: string;      
  image: string;          
  instructions: string[]; 
}

export interface PlanItem {
  workout: Workout;       
  isCompleted: boolean; 
}

export interface PlanContextType {
  todayPlan: PlanItem[];
  savedWorkouts: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  saveForLater: (workout: Workout) => void;
  removeFromSaved: (id: string) => void;
  toggleComplete: (id: string) => void;
}