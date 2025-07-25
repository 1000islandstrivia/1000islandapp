
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function RegisterPage() {
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
      <Card className="w-full max-w-md shadow-2xl bg-card/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Chart Your Course!</CardTitle>
          <CardDescription>Create your account to begin.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" placeholder="Choose a username" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Your email address" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Choose a strong password" required />
            </div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground">
            Already a RiverRat?{' '}
            <Button variant="link" asChild className="text-accent p-0 h-auto">
              <Link href="/login">Log In</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
