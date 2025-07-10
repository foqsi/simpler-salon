'use client';

import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import type { User } from '@/types/user';
import { X, Eye } from 'lucide-react';
import Preview from './components/Preview';

// interface Business {
//   id: string;
//   name: string;
//   slug: string;
//   tier: string;
//   pending_tier?: string;
// }

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [profile, setProfile] = useState<User | null>(null);
  // const [business, setBusiness] = useState<Business | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/user/profile/get', { credentials: 'include' });
      const data = await res.json();
      if (res.ok && data.users) {
        setProfile(data.users);

        // const businessRes = await fetch(`/api/business/get?id=${data.users.business_id}`, { credentials: 'include' });
        // const businessData = await businessRes.json();
        // if (businessRes.ok) {
        //   setBusiness(businessData);
        // }
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader
            onOpenSidebar={() => setSidebarOpen(true)}
            firstName={profile?.first_name || ''}
            lastName={profile?.last_name || ''}
          />
          <main className="p-4 md:p-6 lg:p-8 pb-20">
            {/* Optionally pass profile/business as props or context here */}
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Preview Button */}
      <button
        className="md:hidden fixed top-20 right-4 z-40 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary-focus transition"
        onClick={() => setPreviewOpen(true)}
        aria-label="Open Preview"
      >
        <Eye size={20} />
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${previewOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setPreviewOpen(false)}
      />

      {/* Slide-out Drawer */}
      <aside
        className={`
          fixed top-0 right-0 w-5/6 max-w-sm h-full bg-base-200 z-50 transform transition-transform duration-300
          ${previewOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-4 flex justify-between items-center border-b border-base-300">
          <h2 className="text-lg font-bold">Preview</h2>
          <button className="btn btn-sm btn-ghost" onClick={() => setPreviewOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
          <Preview />
        </div>
      </aside>
    </>
  );
}
