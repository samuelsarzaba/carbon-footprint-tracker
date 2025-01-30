"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Leaf, BarChart2, PlusCircle, User } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart2 },
  { name: 'Log Activity', href: '/log-activity', icon: PlusCircle },
  { name: 'Profile', href: '/profile', icon: User },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex h-16 items-center px-4 border-b bg-background">
      <div className="flex items-center gap-2 font-semibold">
        <Leaf className="h-6 w-6 text-green-600" />
        <span>EcoTrack</span>
      </div>
      <div className="flex items-center gap-6 ml-8">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary',
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => {}}
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
}