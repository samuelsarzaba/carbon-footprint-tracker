"use client";

import { useStore } from '@/lib/store';
import { BADGES } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Medal, Target } from 'lucide-react';

export default function ProfilePage() {
  const { badges, goal, monthlyCO2 } = useStore();
  const monthlyProgress = Math.min((monthlyCO2 / (goal * 4)) * 100, 100);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-2xl font-bold">Monthly Goal</CardTitle>
          <Target className="h-6 w-6 text-green-600" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{monthlyCO2.toFixed(1)} kg CO2e</span>
            <span>{(goal * 4)} kg CO2e target</span>
          </div>
          <Progress value={monthlyProgress} className="h-3" />
          <p className="text-sm text-muted-foreground">
            {monthlyProgress < 100 
              ? `You're on track to meet your monthly goal!` 
              : `You've exceeded your monthly target. Try to reduce your emissions.`}
          </p>
        </CardContent>
      </Card>

      <div>
        <div className="flex items-center gap-2 mb-6">
          <Medal className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold">Your Badges</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {BADGES.map((badge) => (
            <Card 
              key={badge.id}
              className={badges.includes(badge.id) ? 'border-green-600' : 'opacity-50'}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="text-base">{badge.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}