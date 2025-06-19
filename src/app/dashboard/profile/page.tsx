'use client';

import { useEffect, useState } from 'react';
import { Building, Mail, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui';
import { toast } from 'react-hot-toast';

interface ProfileData {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  tier: string;
}

interface BusinessData {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  custom_domain: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [business, setBusiness] = useState<BusinessData | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching profile data...');
    const fetchProfile = async () => {
      const res = await fetch('/api/user/profile/get', { credentials: 'include' });
      const data = await res.json();
      if (res.ok) {
        setLoading(false);
        setProfile(data.users);
        setBusiness(data.business);
      }
    };
    fetchProfile();
  }, []);

  const handleFieldUpdate = (field: keyof ProfileData | keyof BusinessData, value: string) => {
    if (profile && field in profile) {
      setProfile({ ...profile, [field]: value });
    } else if (business && field in business) {
      setBusiness({ ...business, [field]: value });
    }
  };

  const saveChanges = async () => {
    const body = {
      ...profile,
      ...business,
    };

    try {
      const res = await fetch('/api/user/profile/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      const result = await res.json();
      if (!res.ok) {
        console.error('Failed to save:', result.error);
        toast.error('Failed to save changes.');
      } else {
        toast.success('Changes saved.');
      }
    } catch (err) {
      console.error('Error saving changes:', err);
      toast.error('Error saving changes.');
    }
  };

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto py-12 px-4 space-y-6">
        <div className="space-y-2">
          <div className="h-8 w-48 skeleton" />
          <div className="h-4 w-80 skeleton" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((card) => (
            <section
              key={card}
              className="bg-base-200 p-5 rounded-lg shadow space-y-4"
            >
              <div className="h-6 w-32 skeleton" />
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center py-2">
                  <div className="h-4 w-24 skeleton" />
                  <div className="h-6 w-40 skeleton" />
                </div>
              ))}
            </section>
          ))}
        </div>
      </main>
    );
  }

  if (!profile) return <p className="text-center mt-10 text-sm text-error">Unable to load profile.</p>;

  if (!profile && !business) {
    return <p className="text-center mt-10 text-sm text-warning">No profile or business data found.</p>;
  }

  const renderField = (
    label: string,
    field: keyof ProfileData | keyof BusinessData,
    value: string | undefined
  ) => {
    const isEditing = editing === field;
    return (
      <div className="flex justify-between items-center py-2">
        <label className="font-medium">{label}</label>
        {isEditing ? (
          <input
            className="input input-sm input-bordered ml-4"
            value={value ?? ''}
            onChange={(e) => handleFieldUpdate(field, e.target.value)}
            onBlur={() => {
              setEditing(null);
              saveChanges();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setEditing(null);
                saveChanges();
              }
            }}
            autoFocus
          />

        ) : (
          <div className="flex items-center gap-2">
            <span>{value || '-'}</span>
            <button onClick={() => setEditing(field)} className="text-blue-500 text-xs hover:underline">
              edit
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="max-w-5xl mx-auto py-12 px-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Profile Settings</h1>
        <p className="text-sm text-gray-400">
          Tip: Click any field to edit. Press <kbd>Enter</kbd> or click away to save changes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Profile Card */}
        <section className="bg-base-200 p-5 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold">Your Profile</h2>
          {profile && (
            <>
              {renderField('First Name', 'first_name', profile.first_name)}
              {renderField('Last Name', 'last_name', profile.last_name)}
              {renderField('Phone', 'phone', profile.phone)}
              {renderField('Email', 'email', profile.email)}
              {renderField('Tier', 'tier', profile.tier)}
            </>
          )}
        </section>

        {/* Business Card */}
        <section className="bg-base-200 p-5 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold">Your Website</h2>
          {business && (
            <>
              {renderField('Business Name', 'name', business.name)}
              {renderField('Street', 'street', business.street)}
              {renderField('City', 'city', business.city)}
              {renderField('State', 'state', business.state)}
              {renderField('Zip Code', 'zip', business.zip)}
              {renderField('Phone', 'phone', business.phone)}
              {renderField('Email', 'email', business.email)}
              {renderField('Custom Domain', 'custom_domain', business.custom_domain)}
            </>
          )}
        </section>
      </div>
    </main>
  );

}