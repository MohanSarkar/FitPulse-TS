'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';
import { Menu, X } from 'lucide-react'; // Hamburger & Close icons

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts } = usePlan();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-[#111315] border-b border-gray-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <Image
            src="/assets/logo.png"
            alt="FitPulse Logo"
            width={32}
            height={32}
            className="w-auto h-8 object-contain"
          />
          <span className="text-white font-extrabold text-xl tracking-tight uppercase">
            FITLOG
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="/"
            className={`transition-colors hover:text-[#CCFF00] ${
              pathname === '/' ? 'text-white font-semibold' : 'text-gray-400'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`transition-colors hover:text-[#CCFF00] ${
              pathname === '/my-plan' ? 'text-white font-semibold' : 'text-gray-400'
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Dynamic Badges & Hamburger Toggle */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/my-plan" className="flex items-center gap-2 hover:opacity-90">
            <span>Plan</span>
            <span className="bg-[#CCFF00] text-black w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">
              {todayPlan.length}
            </span>
          </Link>

          <Link href="/my-plan" className="flex items-center gap-2 hover:opacity-90">
            <span>Saved</span>
            <span className="border border-gray-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">
              {savedWorkouts.length}
            </span>
          </Link>

          {/* Hamburger Button for Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#16181A] border-b border-gray-800 px-6 py-4 flex flex-col gap-4 text-sm font-medium transition-all">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`transition-colors hover:text-[#CCFF00] ${
              pathname === '/' ? 'text-[#CCFF00] font-semibold' : 'text-gray-300'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setIsOpen(false)}
            className={`transition-colors hover:text-[#CCFF00] ${
              pathname === '/my-plan' ? 'text-[#CCFF00] font-semibold' : 'text-gray-300'
            }`}
          >
            My Plan
          </Link>
        </div>
      )}
    </nav>
  );
}