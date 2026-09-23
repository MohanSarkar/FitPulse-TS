'use client';

import { useState } from 'react';
import { usePlan } from '@/context/PlanContext';
import Link from 'next/link';
import WorkoutCard from '@/components/WorkoutCard';
import { Trash2, CheckCircle, Circle } from 'lucide-react';

export default function MyPlanPage() {
  const { todayPlan, savedWorkouts, removeFromPlan, removeFromSaved, toggleComplete } = usePlan();
  
  const [activeTab, setActiveTab] = useState<'today' | 'saved'>('today');
  const [sortBy, setSortBy] = useState<'duration' | 'calories' | 'rating'>('duration');

  // Stats Calculations for Today's Plan
  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce((sum, item) => sum + item.workout.duration, 0);
  const totalCalories = todayPlan.reduce((sum, item) => sum + item.workout.calories, 0);

  // Sorting Logic
  const getSortedTodayPlan = () => {
    return [...todayPlan].sort((a, b) => {
      if (sortBy === 'duration') return b.workout.duration - a.workout.duration;
      if (sortBy === 'calories') return b.workout.calories - a.workout.calories;
      if (sortBy === 'rating') return b.workout.rating - a.workout.rating;
      return 0;
    });
  };

  const getSortedSavedWorkouts = () => {
    return [...savedWorkouts].sort((a, b) => {
      if (sortBy === 'duration') return b.duration - a.duration;
      if (sortBy === 'calories') return b.calories - a.calories;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  };

  const sortedTodayPlan = getSortedTodayPlan();
  const sortedSavedWorkouts = getSortedSavedWorkouts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
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

      {/* Controls Bar (Tabs & Sort Dropdown) */}
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
            /* Empty State Card */
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
            /* Items List */
            <div className="space-y-4">
              {sortedTodayPlan.map(({ workout, isCompleted }) => (
                <div
                  key={workout.id}
                  className={`bg-[#16181C] border ${
                    isCompleted ? 'border-green-500/40 bg-green-950/10' : 'border-gray-800'
                  } p-5 rounded-2xl flex items-center justify-between gap-4 transition-all shadow-md`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => toggleComplete(workout.id)}
                      className="text-gray-400 hover:text-[#CCFF00] focus:outline-none"
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </button>

                    <div>
                      <h3
                        className={`font-bold text-base uppercase ${
                          isCompleted ? 'line-through text-gray-500' : 'text-white'
                        }`}
                      >
                        {workout.name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-1 font-medium">
                        <span className="text-[#CCFF00]">{workout.category}</span>
                        <span>•</span>
                        <span>{workout.duration} min</span>
                        <span>•</span>
                        <span>{workout.calories} kcal</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="text-xs text-gray-300 hover:text-white font-semibold bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-xl transition-all"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => removeFromPlan(workout.id)}
                      className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Content */}
      {activeTab === 'saved' && (
        <div>
          {sortedSavedWorkouts.length === 0 ? (
            /* Empty State Card */
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
            /* Saved Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedSavedWorkouts.map((workout) => (
                <div key={workout.id} className="relative group">
                  <WorkoutCard workout={workout} />
                  <button
                    onClick={() => removeFromSaved(workout.id)}
                    className="absolute top-3 right-3 bg-red-600/80 hover:bg-red-600 text-white p-2 rounded-lg text-xs transition-all z-10"
                    title="Remove from Saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}