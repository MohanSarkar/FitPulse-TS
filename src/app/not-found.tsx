import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-extrabold text-[#CCFF00] mb-4">404</h1>
      <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
      <p className="text-gray-400 mb-6 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-[#CCFF00] text-black font-semibold px-6 py-3 rounded-md hover:bg-opacity-90 transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
}