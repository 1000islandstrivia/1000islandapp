"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { LogIn } from 'lucide-react';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!username || !password) {
      setError('Please enter username and password.');
      setLoading(false);
      return;
    }
    try {
      // In a real app, you'd validate credentials against a backend
      await login(username);
      // useRouter().push('/dashboard') is handled by useAuth hook
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-2xl bg-card/90 backdrop-blur-sm">
      <CardHeader className="text-center">
        <LogIn className="mx-auto h-12 w-12 text-primary mb-2" />
        <CardTitle className="font-headline text-3xl">Welcome Back, RiverRat!</CardTitle>
        <CardDescription>Log in to continue your adventure.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              type="text" 
              placeholder="E.g. BoldtCastleExplorer" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
              className="bg-background/70"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Your secret passphrase"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="bg-background/70"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading}>
            {loading ? 'Logging In...' : 'Login'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <p className="text-sm text-muted-foreground">
          New to the river?{' '}
          <Button variant="link" asChild className="text-accent p-0 h-auto">
            <Link href="/register">Create an Account</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}