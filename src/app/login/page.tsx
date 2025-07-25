import LoginForm from '@/components/auth/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative p-4">
      <Image
        src="https://i.imgur.com/U8X6gGq.png"
        alt="Scenic river and mountains background"
        fill
        style={{objectFit: "cover"}}
        quality={85}
        className="fixed inset-0 z-[-1] opacity-30"
        data-ai-hint="river mountains"
        priority
      />
      <div className="fixed inset-0 bg-background/80 z-[-1]" />
      <LoginForm />
    </div>
  );
}
