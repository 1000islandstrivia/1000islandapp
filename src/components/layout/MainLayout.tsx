import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Immersive island scenery background"
        layout="fill"
        objectFit="cover"
        quality={85}
        className="fixed inset-0 z-[-1] opacity-40"
        data-ai-hint="island scenery"
      />
      <div className="fixed inset-0 bg-background/50 z-[-1]" /> {/* Overlay for readability */}
      
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}