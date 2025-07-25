
import { auth } from '@/lib/auth-ssr';
import { redirect } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import AchievementsDisplay from '@/components/achievements/AchievementsDisplay';
import { getAchievementsForUser } from '@/services/achievementsService';
import { Trophy } from 'lucide-react';

export default async function AchievementsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  // On the server, we fetch the achievement data directly.
  const userAchievements = await getAchievementsForUser(session.user.username);

  return (
    <MainLayout>
      <div className="text-center mb-12">
        <Trophy className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-5xl font-headline font-bold text-primary">Your Accolades</h1>
        <p className="text-xl text-foreground/80 mt-2">Track your triumphs and milestones in RiverRat Lore!</p>
      </div>
      <AchievementsDisplay achievements={userAchievements} />
    </MainLayout>
  );
}
