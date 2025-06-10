import LoginForm from '@/components/auth/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative p-4">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Immersive island scenery background"
        fill
        objectFit="cover"
        quality={85}
        className="fixed inset-0 z-[-1] opacity-30"
        data-ai-hint="river sunrise"
      />
      <div className="fixed inset-0 bg-background/80 z-[-1]" />
      <LoginForm />
    </div>
  );
}