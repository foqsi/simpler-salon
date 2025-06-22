'use client';

import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import type { User } from '@/types/user';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/user/profile/get', { credentials: 'include' });
      const data = await res.json();
      if (res.ok) {
        setProfile(data.users);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <DashboardHeader
          onOpenSidebar={() => setSidebarOpen(true)}
          firstName={profile?.first_name || ''}
          lastName={profile?.last_name || ''}
        />
        <main className="p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}