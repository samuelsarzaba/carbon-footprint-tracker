"use client";

import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Leaf, TrendingDown, Target } from 'lucide-react';

const mockData = [
  { date: '2024-03-01', emissions: 25 },
  { date: '2024-03-02', emissions: 22 },
  { date: '2024-03-03', emissions: 28 },
  { date: '2024-03-04', emissions: 20 },
  { date: '2024-03-05', emissions: 24 },
  { date: '2024-03-06', emissions: 18 },
  { date: '2024-03-07', emissions: 15 },
];

export default function DashboardPage() {
  const { weeklyCO2, monthlyCO2, goal } = useStore();
  const progress = Math.min((weeklyCO2 / goal) * 100, 100);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Emissions</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyCO2.toFixed(1)} kg CO2e</div>
            <p className="text-xs text-muted-foreground">
              -12% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Average</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(monthlyCO2 / 4).toFixed(1)} kg CO2e</div>
            <p className="text-xs text-muted-foreground">
              Per week average
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="h-2" />
            <p className="mt-2 text-xs text-muted-foreground">
              {goal} kg CO2e weekly target
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Emissions Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'long' })}
                  formatter={(value) => [`${value} kg CO2e`, 'Emissions']}
                />
                <Line 
                  type="monotone" 
                  dataKey="emissions" 
                  stroke="#16a34a" 
                  strokeWidth={2}
                  dot={{ fill: '#16a34a' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}