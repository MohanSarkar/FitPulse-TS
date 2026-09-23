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
      alert("You can only add up to 5 workouts to today's plan!");
      return;
    }
    if (todayPlan.some((item) => item.workout.id === workout.id)) {
      alert('This workout is already in your plan!');
      return;
    }
    setTodayPlan((prev) => [...prev, { workout, isCompleted: false }]);
  };

  const removeFromPlan = (id: string) => {
    setTodayPlan((prev) => prev.filter((item) => item.workout.id !== id));
  };

  const saveForLater = (workout: Workout) => {
    if (savedWorkouts.some((item) => item.id === workout.id)) {
      alert('Already saved!');
      return;
    }
    setSavedWorkouts((prev) => [...prev, workout]);
  };

  const removeFromSaved = (id: string) => {
    setSavedWorkouts((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodayPlan((prev) =>
      prev.map((item) =>
        item.workout.id === id ? { ...item, isCompleted: !item.isCompleted } : item
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