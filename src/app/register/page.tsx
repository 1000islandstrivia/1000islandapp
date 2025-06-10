import RegisterForm from '@/components/auth/RegisterForm';
import Image from 'next/image';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative p-4">
       <Image
        src="https://placehold.co/1920x1080.png"
        alt="Immersive island scenery background"
        fill
        objectFit="cover"
        quality={85}
        className="fixed inset-0 z-[-1] opacity-30"
        data-ai-hint="river fog"
      />
      <div className="fixed inset-0 bg-background/80 z-[-1]" />
      <RegisterForm />
    </div>
  );
}