'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import EditableCard from '@/components/EditableCard';
import { PenLine } from 'lucide-react';
import ProfileSkeleton from '@/components/ProfileSkeleton';
import type { User, Business } from '@/types/user';

export default function ProfilePage() {
  const [profile, setProfile] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/user/profile/get', { credentials: 'include' });
      const data = await res.json();
      if (res.ok) {
        setProfile(data.users);
        setBusiness(data.business);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const updateField = (fullKey: string, value: string) => {
    const [scope, field] = fullKey.split('.') as ['profile' | 'business', keyof User | keyof Business];
    if (scope === 'profile' && profile) {
      setProfile({ ...profile, [field]: value });
    } else if (scope === 'business' && business) {
      setBusiness({ ...business, [field]: value });
    }
  };

  const saveChanges = async () => {
    const body = { ...profile, ...business };
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

  if (!profile || !business) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EditableCard
          title="Your Details"
          fields={[
            { label: 'Tier', fieldKey: 'profile.tier', value: profile.tier, editable: false },
            { label: 'First Name', fieldKey: 'profile.first_name', value: profile.first_name, editable: false },
            { label: 'Last Name', fieldKey: 'profile.last_name', value: profile.last_name },
            { label: 'Phone', fieldKey: 'profile.phone', value: profile.phone, editable: false },
            { label: 'Email', fieldKey: 'profile.email', value: profile.email, editable: false },
          ]}
          editingField={editing}
          setEditingField={setEditing}
          updateField={updateField}
          onSave={saveChanges}
        />

        <EditableCard
          title="Your Business Details"
          fields={[
            { label: 'Business Name', fieldKey: 'business.name', value: business.name },
            { label: 'Street', fieldKey: 'business.street', value: business.street },
            { label: 'City', fieldKey: 'business.city', value: business.city },
            { label: 'State', fieldKey: 'business.state', value: business.state },
            { label: 'Zip', fieldKey: 'business.zip', value: business.zip },
            { label: 'Phone', fieldKey: 'business.phone', value: business.phone },
            { label: 'Email', fieldKey: 'business.email', value: business.email },
            { label: 'Custom Domain', fieldKey: 'business.custom_domain', value: business.custom_domain },
          ]}
          editingField={editing}
          setEditingField={setEditing}
          updateField={updateField}
          onSave={saveChanges}
        />
      </div>
    </main>
  );
}
