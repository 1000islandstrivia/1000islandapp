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
        src="https://firebasestorage.googleapis.com/v0/b/storycraft-7050a.appspot.com/o/images%2Foriginal%2Fmap_of_thousand_islands.png_1720032762026?alt=media&token=9172e149-98a5-4e72-9d8f-5af2be13635d"
        alt="Vintage map of Thousand Islands background"
        layout="fill"
        objectFit="cover"
        quality={85}
        className="fixed inset-0 z-[-1] opacity-40"
        data-ai-hint="vintage map"
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
