
"use client";

import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { HelpCircle, ShieldAlert } from 'lucide-react';
import AddQuestionForm from '@/components/admin/AddQuestionForm';
import { Button } from '@/components/ui/button';

export default function AddQuestionAdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.username !== 'Dan')) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <HelpCircle className="w-12 h-12 animate-spin text-primary" />
        <p className="ml-4 text-xl">Verifying permissions...</p>
      </div>
    );
  }

  if (user.username !== 'Dan') {
    return (
        <MainLayout>
            <div className="flex flex-col items-center justify-center text-center p-8">
                <ShieldAlert className="w-16 h-16 text-destructive mb-4" />
                <h1 className="text-3xl font-bold text-destructive">Access Denied</h1>
                <p className="text-lg mt-2">You do not have permission to view this page.</p>
                <Button onClick={() => router.push('/dashboard')} className="mt-6">Return to Dashboard</Button>
            </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-headline font-bold text-primary">Add New Trivia Question</h1>
        <p className="text-xl text-foreground/80 mt-2">Use this form to add a new question to the Firestore database.</p>
      </div>
      <AddQuestionForm />
    </MainLayout>
  );
}
