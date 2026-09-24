import React from 'react';
import Link from 'next/link';
import { Clock, Flame, Star } from 'lucide-react';
import Image from 'next/image';

export interface Workout {
  id: string | number;
  name: string;
  category?: string;
  muscleGroups?: string[];
  duration: number;
  calories?: number;
  caloriesBurned?: number; // Added caloriesBurned
  rating: number;
  image?: string;
  equipment?: string;
}

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  // calories, caloriesBurned ba fallback 0 check
  const displayCalories =
    workout?.caloriesBurned ?? workout?.calories ?? 0;

  // Primary muscle group or category fallback
  const categoryName =
    workout?.category || (workout?.muscleGroups && workout.muscleGroups[0]) || 'General';

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="block bg-[#16181C] border border-gray-800 hover:border-gray-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg group cursor-pointer"
    >
      {/* Image / Top Section */}
      <div className="relative h-48 w-full bg-gray-900 overflow-hidden">
        {workout.image ? (
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500 text-sm">
            No Image
          </div>
        )}

        {/* Category Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-[#CCFF00] text-black text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
            {categoryName}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-extrabold text-lg text-white uppercase tracking-tight group-hover:text-[#CCFF00] transition-colors">
            {workout.name}
          </h3>
          {workout.equipment && (
            <p className="text-gray-400 text-xs mt-1 font-medium">
              {workout.equipment}
            </p>
          )}
        </div>

        {/* Footer Info: Duration, Calories & Rating */}
        <div className="flex items-center justify-between text-xs text-gray-300 pt-2 border-t border-gray-800/60">

          {/* Duration */}
          <div className="flex items-center gap-1.5 font-semibold">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>{workout.duration || 0} min</span>
          </div>

          {/* Calories (Fixed for caloriesBurned) */}
          <div className="flex items-center gap-1.5 font-semibold">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>{displayCalories} kcal</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 font-semibold text-white">
            <Star className="w-3.5 h-3.5 fill-[#CCFF00] text-[#CCFF00]" />
            <span>{workout.rating ? Number(workout.rating).toFixed(1) : '0.0'}</span>
          </div>

        </div>
      </div>
    </Link>
  );
}