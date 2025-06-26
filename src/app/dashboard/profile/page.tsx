'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import EditableCard from '@/components/EditableCard';
import { PenLine } from 'lucide-react';
import ProfileSkeleton from '@/components/ProfileSkeleton';
import type { User, Business } from '@/types/user';
import Link from 'next/link';

export default function ProfilePage() {
  const [profile, setProfile] = useState<User | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/user/profile/get', { credentials: 'include' });
      const data = await res.json();
      if (res.ok) {
        setProfile(data.users);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const updateField = (fullKey: string, value: string) => {
    const [scope, field] = fullKey.split('.') as ['profile', keyof User];
    if (scope === 'profile' && profile) {
      setProfile({ ...profile, [field]: value });
    }
  };

  const saveChanges = async () => {
    const body = { ...profile };
    try {
      const res = await fetch('/api/user/profile/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (res.ok) {
        toast.success('Changes saved.');
      } else {
        toast.error('Failed to save changes.');
      }
    } catch {
      toast.error('Error saving changes.');
    }
  };

  if (loading) {
    return (
      <ProfileSkeleton />
    )
  }

  if (!profile) {
    return <p className="text-center mt-10 text-error">Please check your email to verify your account. Check spam, too.
      <br /> If you do not see anything, please reach out to Simpler Salon.</p>;
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      <div className="space-y-1 text-center">
        <h2 className="text-sm font-semibold text-gray-500">Account Settings</h2>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-sm text-gray-400">
          Click any field to edit. Press <kbd>Enter</kbd> or click away to save.
        </p>
        <p className="flex items-center justify-center gap-1 text-xs text-gray-500">
          <PenLine size={12} className="inline-block" />
          indicates editable fields
        </p>
      </div>

      {/* Tier card */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className="self-start rounded-xl bg-base-200 p-6 shadow space-y-4 text-base-content">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Tier</h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold tracking-widest text-secondary">{profile.tier.toUpperCase()}</span>
            <Link
              href="/dashboard/upgrade"
              className="rounded-md px-3 py-1 transition border border-neutral-content bg-base-100 text-secondary"
            >
              Upgrade
            </Link>
          </div>
        </div>

        <div className="md:col-span-1">
          <EditableCard
            title="Your Details"
            fields={[
              { label: 'First Name', fieldKey: 'profile.first_name', value: profile.first_name, editable: true },
              { label: 'Last Name', fieldKey: 'profile.last_name', value: profile.last_name },
              { label: 'Phone', fieldKey: 'profile.phone', value: profile.phone, editable: false },
              { label: 'Email', fieldKey: 'profile.email', value: profile.email, editable: false },
            ]}
            editingField={editing}
            setEditingField={setEditing}
            updateField={updateField}
            onSave={saveChanges}
          />
        </div>
      </div>

    </main>
  );
}
