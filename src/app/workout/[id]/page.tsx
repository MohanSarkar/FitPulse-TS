'use client';

import { usePlan } from '@/context/PlanContext';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Plus, Bookmark, Check, Loader2 } from 'lucide-react';
import { use, useEffect, useState } from 'react';

interface Workout {
  id: string | number;
  name: string;
  description: string;
  tags?: string[];
  image?: string;
  imageUrl?: string;
  equipment?: string;
  difficulty?: string;
  sets?: string | number;
  reps?: string | number;
  duration?: number;
  calories?: number;
  rating?: number;
  instructions?: string[];
}

export default function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const workoutId = resolvedParams.id;

  const { addToPlan, saveWorkout, todayPlan, savedWorkouts } = usePlan();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWorkout() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${workoutId}`);

        if (!res.ok) {
          throw new Error('Failed to fetch workout details');
        }

        const data = await res.json();
        setWorkout(data.data || data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    if (workoutId) {
      fetchWorkout();
    }
  }, [workoutId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-white gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-[#CCFF00]" />
        <p className="text-xs text-gray-400 font-medium">Loading workout details...</p>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="max-w-xl mx-auto my-20 p-8 bg-[#121418] rounded-2xl text-center border border-gray-800 space-y-4">
        <h2 className="text-xl font-bold text-white uppercase">Workout Not Found</h2>
        <p className="text-gray-400 text-xs">Could not load the requested workout details.</p>
        <Link
          href="/"
          className="inline-block bg-[#CCFF00] text-black font-bold text-xs px-6 py-2.5 rounded-full hover:bg-[#b3e600] transition-colors"
        >
          Back to Workouts
        </Link>
      </div>
    );
  }

  const imageSource = workout.imageUrl || workout.image || '';
  const isInTodayPlan = todayPlan.some((item) => String(item.workout.id) === String(workout.id));
  const isSaved = savedWorkouts.some((item) => String(item.id) === String(workout.id));

  // Fallback tags if API doesn't return them
  const tagsList = workout.tags && workout.tags.length > 0 ? workout.tags : ['Back', 'Arms'];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6 bg-[#0B0C0E] text-white min-h-screen">
      
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Workouts
      </Link>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Exact Image Container */}
        <div className="lg:col-span-5 relative min-h-[420px] lg:min-h-full w-full rounded-2xl overflow-hidden bg-[#16181C] border border-gray-800/60 shadow-xl">
          {imageSource ? (
            <Image
              src={imageSource}
              alt={workout.name || 'Workout'}
              fill
              className="object-cover object-center"
              priority
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
              No Image Available
            </div>
          )}
        </div>

        {/* Right Side: Details */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-white">
              {workout.name}
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-lg">
              {workout.description}
            </p>

            {/* Neon Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {tagsList.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-[#CCFF00] text-black text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-[#121418] border border-gray-800/80 rounded-xl overflow-hidden divide-y divide-gray-800/50">
            <div className="flex justify-between items-center px-4 py-2.5 text-xs">
              <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Equipment</span>
              <span className="text-gray-200 font-semibold">{workout.equipment || 'Pull-up Bar'}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2.5 text-xs">
              <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Difficulty</span>
              <span className="text-gray-200 font-semibold">{workout.difficulty || 'Intermediate'}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2.5 text-xs">
              <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Sets</span>
              <span className="text-gray-200 font-semibold">{workout.sets || '4'}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2.5 text-xs">
              <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Reps</span>
              <span className="text-gray-200 font-semibold">{workout.reps || '6-10'}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2.5 text-xs">
              <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Duration</span>
              <span className="text-gray-200 font-semibold">{workout.duration ? `${workout.duration} min` : '15 min'}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2.5 text-xs">
              <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Calories</span>
              <span className="text-gray-200 font-semibold">{workout.calories ? `${workout.calories} kcal` : '120 kcal'}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2.5 text-xs">
              <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Rating</span>
              <span className="text-gray-200 font-semibold">{workout.rating || '4.7'}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-2.5">
            <h2 className="text-lg font-black text-white uppercase tracking-wider">
              INSTRUCTIONS
            </h2>
            <ol className="space-y-2 text-xs text-gray-300">
              {(workout.instructions && workout.instructions.length > 0 ? workout.instructions : [
                'Hang from the bar with a shoulder-width overhand grip.',
                'Brace your core and pull your chest toward the bar.',
                'Pause at the top with elbows tucked, then lower with control.',
                'Avoid kipping unless you are training a specific variation.'
              ]).map((step, idx) => (
                <li key={idx} className="flex gap-2 leading-relaxed">
                  <span className="font-bold text-white min-w-[14px]">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => addToPlan(workout)}
              disabled={isInTodayPlan}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                isInTodayPlan
                  ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                  : 'bg-[#CCFF00] hover:bg-[#b3e600] text-black shadow-lg shadow-[#CCFF00]/10'
              }`}
            >
              {isInTodayPlan ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {isInTodayPlan ? "Added to today's plan" : "Add to today's plan"}
            </button>

            <button
              onClick={() => saveWorkout(workout)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
                isSaved
                  ? 'border-[#CCFF00] text-[#CCFF00] bg-[#CCFF00]/10'
                  : 'border-gray-700 bg-[#121418] text-white hover:bg-gray-800'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              {isSaved ? 'Saved' : 'Save for later'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}