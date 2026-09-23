import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0D0E10] border-t border-gray-800 text-gray-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="FitPulse Logo"
            width={24}
            height={24}
            className="w-auto h-6 object-contain"
          />
          <span className="text-white font-bold tracking-tight">FITLOG</span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} FitPulse TS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}