import './globals.css';
import { PlanProvider } from '@/context/PlanContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'FitPulse TS - Workout Planner',
  description: 'Plan and track your daily workout routines.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body 
        className="bg-[#0d0e10] text-white flex flex-col min-h-screen"
        style={{ backgroundColor: '#0d0e10' }}
        suppressHydrationWarning
      >
        <PlanProvider>
          <Navbar />
          <main className="flex-1 bg-[#0d0e10]">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}