import Hero from '@/components/Hero';
import Library from '@/components/Library';

export default function Home() {
  return (
    <div className="space-y-6 pb-12">
      <Hero />
      <Library />
    </div>
  );
}