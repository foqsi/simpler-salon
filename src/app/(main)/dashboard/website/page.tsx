'use client';

import { useEffect, useState } from 'react';
import InputField from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import ImageUploader from '@/components/ui/ImageUploader';
import toast from 'react-hot-toast';
import { HomePageData } from '@/app/(main)/dashboard/types/index';
import LargeThrobber from '@/components/LargeThrobber';
import Preview from '@/app/(main)/dashboard/components/Preview';

export default function WebsiteEditor() {
  const [formData, setFormData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch('/api/dashboard/website');
        const data = await res.json();
        setFormData(data); // assume data is already shaped correctly
      } catch (err) {
        console.error(err);
        toast.error('Failed to load homepage data');
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const handleChange = (
    field: keyof HomePageData,
    value: string | string[] | HomePageData['location']
  ) => {
    if (!formData) return;
    setFormData(prev => ({ ...prev!, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/dashboard/website', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      toast.success('Homepage updated successfully!');
    } catch {
      toast.error('Failed to update homepage.');
    }
  };

  if (loading || !formData) return <LargeThrobber />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Edit Site Content</h1>
      <p className='text-sm mb-4 text-base-content/80'>Your business info shown across your site.</p>

      <div className='flex'>
        <div className="max-w-xl space-y-6">
          <InputField label="Company Name" value={formData.companyName} placeholder="Simpler Salon" onChange={e => handleChange('companyName', e.target.value)} />
          <InputField label="Slogan" value={formData.slogan} placeholder="Pay Once, Own It Forever" onChange={e => handleChange('slogan', e.target.value)} />
          <InputField label="Phone Number" value={formData.phone} placeholder="4055556666" onChange={e => handleChange('phone', e.target.value)} />
          <InputField
            label="Street Address"
            value={formData.location.street}
            placeholder="123 Main St"
            onChange={e =>
              handleChange('location', {
                ...formData.location,
                street: e.target.value,
              })
            }
          />

          <InputField
            label="City"
            value={formData.location.city}
            placeholder="Miami"
            onChange={e =>
              handleChange('location', {
                ...formData.location,
                city: e.target.value,
              })
            }
          />

          <InputField
            label="State"
            value={formData.location.state}
            placeholder="Florida"
            onChange={e =>
              handleChange('location', {
                ...formData.location,
                state: e.target.value,
              })
            }
          />

          <InputField
            label="ZIP Code"
            value={formData.location.zip}
            placeholder="00011"
            onChange={e =>
              handleChange('location', {
                ...formData.location,
                zip: e.target.value,
              })
            }
          />

          <InputField label="Book Now Button Text" value={formData.CTA} onChange={e => handleChange('CTA', e.target.value)} />

          <ImageUploader
            label="Company Logo"
            imageUrl={formData.logoUrl}
            onUpload={async (file: File) => {
              const url = URL.createObjectURL(file);
              handleChange('logoUrl', url);
            }}
          />

          <ImageUploader
            label="Banner Images (you can upload multiple)"
            multiple
            imageUrls={formData.bannerImages}
            onUpload={async (files: File[] | File) => {
              const urls = Array.isArray(files)
                ? files.map(f => URL.createObjectURL(f))
                : [URL.createObjectURL(files)];
              handleChange('bannerImages', urls);
            }}
          />

          <TextArea
            label="About Section"
            value={formData.about}
            placeholder={`EXAMPLE:\n\nAt My Company,\nWe are more than just a nail salon...`}
            onChange={value => handleChange('about', value)}
          />

          <TextArea
            label="Banner Text"
            value={formData.bannerText}
            placeholder={'New Loyalty Program - 20% off on 6th visit!\n20% for New Years!'}
            onChange={value => handleChange('bannerText', value)}
          />

          <TextArea
            label="Business Hours"
            value={formData.businessHours}
            placeholder={'Monday - Friday: 10:00AM - 7:00PM\nSaturday: 12:00 PM - 6:00PM\nSunday: Closed'}
            onChange={value => handleChange('businessHours', value)}
          />

          <Button onClick={handleSubmit} className="mt-4 w-full">
            Save Changes
          </Button>
        </div>

        <div className='mx-auto hidden md:flex'>
          <Preview />
        </div>
      </div>
    </div>
  );
}
