
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
        src="https://i.imgur.com/U8X6gGq.png"
        alt="Scenic river and mountains background"
        fill
        style={{objectFit: "cover"}}
        quality={85}
        className="fixed inset-0 z-[-1] opacity-40"
        data-ai-hint="river mountains"
        priority
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
