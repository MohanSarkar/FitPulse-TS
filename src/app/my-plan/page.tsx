'use client';

import { useState } from 'react';
import { usePlan } from '@/context/PlanContext';
import Link from 'next/link';
import { Clock, Flame, Star, Check, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function MyPlanPage() {
  const { todayPlan, savedWorkouts, removeFromPlan, removeFromSaved, toggleComplete } = usePlan();
  
  const [activeTab, setActiveTab] = useState<'today' | 'saved'>('today');
  const [sortBy, setSortBy] = useState<'duration' | 'calories' | 'rating'>('duration');

  // Safe Calories Extractor
  const getCalories = (workout: any) => {
    return Number(workout?.caloriesBurned ?? workout?.calories ?? 0);
  };

  // Stats Calculations
  const totalExercises = todayPlan?.length || 0;

  const totalMinutes = todayPlan?.reduce((sum, item) => {
    const duration = Number(item?.workout?.duration || 0);
    return sum + (isNaN(duration) ? 0 : duration);
  }, 0) || 0;

  const totalCalories = todayPlan?.reduce((sum, item) => {
    const cal = getCalories(item?.workout);
    return sum + (isNaN(cal) ? 0 : cal);
  }, 0) || 0;

  // Sorting Logic
  const getSortedTodayPlan = () => {
    if (!todayPlan) return [];
    return [...todayPlan].sort((a, b) => {
      const durA = Number(a?.workout?.duration || 0);
      const durB = Number(b?.workout?.duration || 0);
      const calA = getCalories(a?.workout);
      const calB = getCalories(b?.workout);
      const ratA = Number(a?.workout?.rating || 0);
      const ratB = Number(b?.workout?.rating || 0);

      if (sortBy === 'duration') return durB - durA;
      if (sortBy === 'calories') return calB - calA;
      if (sortBy === 'rating') return ratB - ratA;
      return 0;
    });
  };

  const getSortedSavedWorkouts = () => {
    if (!savedWorkouts) return [];
    return [...savedWorkouts].sort((a, b) => {
      const durA = Number(a?.duration || 0);
      const durB = Number(b?.duration || 0);
      const calA = getCalories(a);
      const calB = getCalories(b);
      const ratA = Number(a?.rating || 0);
      const ratB = Number(b?.rating || 0);

      if (sortBy === 'duration') return durB - durA;
      if (sortBy === 'calories') return calB - calA;
      if (sortBy === 'rating') return ratB - ratA;
      return 0;
    });
  };

  const sortedTodayPlan = getSortedTodayPlan();
  const sortedSavedWorkouts = getSortedSavedWorkouts();

  // Toast Handlers - Explicit String conversion for Context calls
  const handleToggleComplete = (id: string | number, isCompleted: boolean) => {
    toggleComplete(String(id));
    if (!isCompleted) {
      toast.success('Workout logged — nice work', {
        style: {
          background: '#16181C',
          color: '#fff',
          border: '1px solid #22c55e',
        },
      });
    }
  };

  const handleRemoveFromPlan = (id: string | number) => {
    removeFromPlan(String(id));
    toast.success('Removed from today plans', {
      style: {
        background: '#16181C',
        color: '#fff',
        border: '1px solid #374151',
      },
    });
  };

  const handleRemoveFromSaved = (id: string | number) => {
    removeFromSaved(String(id));
    toast.success('Removed from saved', {
      style: {
        background: '#16181C',
        color: '#fff',
        border: '1px solid #374151',
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Toast Top Right Position */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header Section */}
      <div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight uppercase">
          MY PLAN
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Top Stats Banner */}
      <div className="bg-[#16181C] border border-gray-800/80 rounded-2xl grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-800/80 overflow-hidden shadow-xl">
        <div className="p-6">
          <span className="text-gray-400 text-xs font-semibold block mb-1">Exercises</span>
          <span className="text-4xl font-extrabold text-[#CCFF00]">{totalExercises}</span>
        </div>
        <div className="p-6">
          <span className="text-gray-400 text-xs font-semibold block mb-1">Minutes</span>
          <span className="text-4xl font-extrabold text-[#CCFF00]">{totalMinutes}</span>
        </div>
        <div className="p-6">
          <span className="text-gray-400 text-xs font-semibold block mb-1">Calories</span>
          <span className="text-4xl font-extrabold text-[#CCFF00]">{totalCalories}</span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        {/* Tab Buttons */}
        <div className="bg-[#16181C] p-1.5 rounded-xl border border-gray-800 flex items-center gap-1">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'today'
                ? 'bg-[#CCFF00] text-black shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'saved'
                ? 'bg-[#CCFF00] text-black shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="text-gray-400 text-xs font-semibold">Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'duration' | 'calories' | 'rating')}
            className="bg-[#16181C] border border-gray-800 text-white text-xs font-medium px-4 py-2 rounded-xl focus:outline-none focus:border-[#CCFF00] cursor-pointer"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Tab 1: Today's Plan Content */}
      {activeTab === 'today' && (
        <div>
          {sortedTodayPlan.length === 0 ? (
            <div className="bg-[#16181C] border border-gray-800/80 rounded-2xl py-20 px-6 text-center space-y-4 shadow-xl">
              <h3 className="text-xl font-black text-white uppercase tracking-wider">
                NOTHING HERE YET
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto">
                Browse the library and add a lift to get today moving.
              </p>
              <div className="pt-2">
                <Link
                  href="/"
                  className="inline-block bg-[#CCFF00] hover:bg-[#b3e600] text-black font-bold text-xs px-6 py-3 rounded-full transition-all shadow"
                >
                  Go to workouts
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedTodayPlan.map(({ workout, isCompleted }) => {
                const calVal = getCalories(workout);

                return (
                  <div
                    key={workout.id}
                    className="bg-[#16181C] border border-gray-800 hover:border-gray-700 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all shadow-lg"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {workout.image ? (
                        <img
                          src={workout.image}
                          alt={workout.name}
                          className="w-24 h-20 rounded-xl object-cover border border-gray-800 shrink-0"
                        />
                      ) : (
                        <div className="w-24 h-20 rounded-xl bg-gray-800 flex items-center justify-center text-xs text-gray-500 shrink-0">
                          No Image
                        </div>
                      )}

                      <div className="space-y-1">
                        <h3 className="font-black text-base text-white uppercase tracking-tight">
                          {workout.name}
                        </h3>
                        {workout.equipment && (
                          <p className="text-xs text-gray-400 font-medium">
                            {workout.equipment}
                          </p>
                        )}
                        <div className="flex items-center gap-3 text-xs text-gray-300 pt-1 font-semibold">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            {workout.duration} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-orange-500" />
                            {calVal} kcal
                          </span>
                          <span className="flex items-center gap-1 text-white">
                            <Star className="w-3.5 h-3.5 fill-[#CCFF00] text-[#CCFF00]" />
                            {workout.rating ? Number(workout.rating).toFixed(1) : '0.0'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <Link
                        href={`/workout/${workout.id}`}
                        className="text-xs text-white font-semibold border border-gray-700 hover:bg-gray-800 px-4 py-2.5 rounded-full transition-all"
                      >
                        View Details
                      </Link>

                      <button
                        onClick={() => handleToggleComplete(workout.id, !!isCompleted)}
                        className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-full transition-all ${
                          isCompleted
                            ? 'bg-green-500 text-black'
                            : 'bg-[#CCFF00] hover:bg-[#b3e600] text-black'
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                        {isCompleted ? 'Done' : 'Mark as Done'}
                      </button>

                      <button
                        onClick={() => handleRemoveFromPlan(workout.id)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        title="Remove from plan"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Content */}
      {activeTab === 'saved' && (
        <div>
          {sortedSavedWorkouts.length === 0 ? (
            <div className="bg-[#16181C] border border-gray-800/80 rounded-2xl py-20 px-6 text-center space-y-4 shadow-xl">
              <h3 className="text-xl font-black text-white uppercase tracking-wider">
                NO SAVED WORKOUTS
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto">
                Save workouts from the library to build your future routines.
              </p>
              <div className="pt-2">
                <Link
                  href="/"
                  className="inline-block bg-[#CCFF00] hover:bg-[#b3e600] text-black font-bold text-xs px-6 py-3 rounded-full transition-all shadow"
                >
                  Go to workouts
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedSavedWorkouts.map((workout) => {
                const calVal = getCalories(workout);

                return (
                  <div
                    key={workout.id}
                    className="bg-[#16181C] border border-gray-800 hover:border-gray-700 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all shadow-lg"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {workout.image ? (
                        <img
                          src={workout.image}
                          alt={workout.name}
                          className="w-24 h-20 rounded-xl object-cover border border-gray-800 shrink-0"
                        />
                      ) : (
                        <div className="w-24 h-20 rounded-xl bg-gray-800 flex items-center justify-center text-xs text-gray-500 shrink-0">
                          No Image
                        </div>
                      )}

                      <div className="space-y-1">
                        <h3 className="font-black text-base text-white uppercase tracking-tight">
                          {workout.name}
                        </h3>
                        {workout.equipment && (
                          <p className="text-xs text-gray-400 font-medium">
                            {workout.equipment}
                          </p>
                        )}
                        <div className="flex items-center gap-3 text-xs text-gray-300 pt-1 font-semibold">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            {workout.duration} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-orange-500" />
                            {calVal} kcal
                          </span>
                          <span className="flex items-center gap-1 text-white">
                            <Star className="w-3.5 h-3.5 fill-[#CCFF00] text-[#CCFF00]" />
                            {workout.rating ? Number(workout.rating).toFixed(1) : '0.0'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <Link
                        href={`/workout/${workout.id}`}
                        className="text-xs text-white font-semibold border border-gray-700 hover:bg-gray-800 px-4 py-2.5 rounded-full transition-all"
                      >
                        View Details
                      </Link>

                      <button
                        onClick={() => handleRemoveFromSaved(workout.id)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        title="Remove from saved"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}