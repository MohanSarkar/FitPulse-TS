'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Workout, PlanItem, PlanContextType } from '@/types/workout';

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [todayPlan, setTodayPlan] = useState<PlanItem[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);

  // Load initial data from localStorage
  useEffect(() => {
    const localPlan = localStorage.getItem('fitpulse_plan');
    const localSaved = localStorage.getItem('fitpulse_saved');
    if (localPlan) setTodayPlan(JSON.parse(localPlan));
    if (localSaved) setSavedWorkouts(JSON.parse(localSaved));
  }, []);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('fitpulse_plan', JSON.stringify(todayPlan));
  }, [todayPlan]);

  useEffect(() => {
    localStorage.setItem('fitpulse_saved', JSON.stringify(savedWorkouts));
  }, [savedWorkouts]);

  const addToPlan = (workout: Workout) => {
    if (todayPlan.length >= 5) {
      return false; 
    }
    if (todayPlan.some((item) => String(item.workout.id) === String(workout.id))) {
      return false; 
    }
    setTodayPlan((prev) => [...prev, { workout, isCompleted: false }]);
    return true;
  };

  const removeFromPlan = (id: string | number) => {
    setTodayPlan((prev) => prev.filter((item) => String(item.workout.id) !== String(id)));
  };

  const saveForLater = (workout: Workout) => {
    if (savedWorkouts.some((item) => String(item.id) === String(workout.id))) {
      return false; 
    }
    setSavedWorkouts((prev) => [...prev, workout]);
    return true;
  };

  const removeFromSaved = (id: string | number) => {
    setSavedWorkouts((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const toggleComplete = (id: string | number) => {
    setTodayPlan((prev) =>
      prev.map((item) =>
        String(item.workout.id) === String(id) ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        addToPlan,
        removeFromPlan,
        saveForLater,
        removeFromSaved,
        toggleComplete,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};