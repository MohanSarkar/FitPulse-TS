'use client';

import Image from 'next/image';

export default function Hero() {
  const scrollToLibrary = () => {
    const libraryElement = document.getElementById('workout-library');
    if (libraryElement) {
      libraryElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="bg-[#16181C] rounded-2xl p-8 md:p-12 border border-gray-800/60 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 overflow-hidden shadow-xl">
        
        {/* Left Text Content */}
        <div className="flex-1 space-y-6 text-left max-w-xl">
          {/* Eyebrow Badge */}
          <span className="text-[#CCFF00] font-bold text-xs uppercase tracking-widest block">
            WORKOUT LIBRARY
          </span>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] uppercase">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          {/* Subtitle Description */}
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>

          {/* CTA Button */}
          <div className="pt-2">
            <button
              onClick={scrollToLibrary}
              className="bg-[#CCFF00] hover:bg-[#b3e600] text-black font-bold text-sm px-6 py-3 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md"
            >
              Browse Workouts
            </button>
          </div>
        </div>

        {/* Right Image Banner */}
        <div className="flex-1 flex justify-center items-center w-full max-w-md md:max-w-none">
          <div className="relative w-full h-[280px] sm:h-[340px] md:h-[380px]">
            <Image
              src="/assets/banner.png"
              alt="Workout Banner"
              fill
              priority
              className="object-contain object-center"
            />
          </div>
        </div>

      </div>
    </section>
  );
}