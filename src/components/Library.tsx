'use client';

import { useState, useEffect } from 'react';
import { Workout } from '@/types/workout';
import WorkoutCard from './WorkoutCard';
import { Loader2 } from 'lucide-react';

export default function Library() {
  // Explicitly typing state as Workout array
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async (): Promise<void> => {
      try {
        setLoading(true);
        const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
        if (!res.ok) throw new Error('Failed to fetch workouts data.');
        
        // Asserting the API response as Workout array
        const data: Workout[] = await res.json();
        setWorkouts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Something went wrong while fetching data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section id="workout-library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          THE LIBRARY
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#CCFF00]" />
          <p className="text-sm font-medium">Loading Workouts...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center my-8">
          <p className="font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-xs bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* 3x4 Grid Rendering */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout: Workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}

    </section>
  );
}