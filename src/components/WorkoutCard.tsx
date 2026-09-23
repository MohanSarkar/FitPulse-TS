'use client';

import Link from 'next/link';
import { Workout } from '@/types/workout';
import { Clock, Flame, Star } from 'lucide-react';

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link href={`/workout/${workout.id}`} className="block group">
      <div className="bg-[#16181C] border border-gray-800/80 rounded-xl overflow-hidden hover:border-[#CCFF00]/50 transition-all duration-300 flex flex-col h-full shadow-lg">
        
        {/* Card Image */}
        <div className="relative w-full h-44 bg-gray-900 overflow-hidden">
          <img
            src={workout.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd'}
            alt={workout.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Card Content */}
        <div className="p-4 flex flex-col flex-1 justify-between gap-3">
          <div>
            {/* Category Badge */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="bg-[#CCFF00] text-black text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                {workout.category}
              </span>
            </div>

            {/* Workout Title */}
            <h3 className="text-white font-black text-base uppercase tracking-tight group-hover:text-[#CCFF00] transition-colors line-clamp-1">
              {workout.name}
            </h3>

            {/* Equipment Subtitle */}
            <p className="text-gray-400 text-xs mt-1 line-clamp-1 font-medium">
              {workout.equipment}
            </p>
          </div>

          {/* Stats Footer */}
          <div className="flex items-center justify-between text-xs text-gray-300 font-semibold pt-2 border-t border-gray-800/60">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>{workout.duration} min</span>
            </div>

            <div className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>{workout.calories} kcal</span>
            </div>

            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-[#CCFF00] fill-[#CCFF00]" />
              <span>{workout.rating}</span>
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}