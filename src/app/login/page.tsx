import LoginForm from '@/components/auth/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative p-4">
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/storycraft-7050a.appspot.com/o/images%2Foriginal%2Fmap_of_thousand_islands.png_1720032762026?alt=media&token=9172e149-98a5-4e72-9d8f-5af2be13635d"
        alt="Vintage map of Thousand Islands background"
        fill
        objectFit="cover"
        quality={85}
        className="fixed inset-0 z-[-1] opacity-30"
        data-ai-hint="vintage map"
      />
      <div className="fixed inset-0 bg-background/80 z-[-1]" />
      <LoginForm />
    </div>
  );
}
