'use client';

import { useEffect, useState } from 'react';
import InputField from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import ImageUploader from '@/components/ui/ImageUploader';
import toast from 'react-hot-toast';
import { HomePageData } from '@/app/dashboard/types/index';
import LargeThrobber from '@/components/LargeThrobber';
import Preview from '@/app/dashboard/components/Preview'

export default function HomePageEditor() {
  const [formData, setFormData] = useState<HomePageData>({
    companyName: '',
    slogan: '',
    bannerText: '',
    logoUrl: '',
    bannerImages: [],
    about: '',
    phone: '',
    location: '',
    businessHours: '',
    CTA: 'Book Now',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch('/api/dashboard/home');
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load homepage data');
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const handleChange = (field: keyof HomePageData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/dashboard/home', {
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

  if (loading) return <LargeThrobber />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Edit Site Content</h1>
      <p className='text-sm mb-4 text-base-content/80'>Your business info shown across your site.</p>
      <div className='flex'>
        <div className="max-w-xl space-y-6">
          <InputField label="Company Name" value={formData.companyName} placeholder='Simpler Salon' onChange={e => handleChange('companyName', e.target.value)} />
          <InputField label="Slogan" value={formData.slogan} placeholder='Pay Once, Own It Forever' onChange={e => handleChange('slogan', e.target.value)} />
          <InputField label="Phone Number" value={formData.phone} placeholder='4055556666' onChange={e => handleChange('phone', e.target.value)} />
          <InputField label="Location" value={formData.location} placeholder='123 Main St, Miami, FL, 00000' onChange={e => handleChange('location', e.target.value)} />
          <InputField label="Book Now Button Text" value={formData.CTA} onChange={e => handleChange('CTA', e.target.value)} />

          <ImageUploader
            label="Company Logo"
            imageUrl={formData.logoUrl}
            onUpload={async (file: File) => {
              const url = URL.createObjectURL(file); // or upload and get back a real URL
              handleChange('logoUrl', url);
            }}
          />

          <ImageUploader
            label="Banner Images (you can upload multiple)"
            multiple
            imageUrls={formData.bannerImages}
            onUpload={async (file: File) => {
              const url = URL.createObjectURL(file);
              handleChange('bannerImages', url);
            }}
          />

          <TextArea label="About Section" value={formData.about}
            placeholder={`EXAMPLE:\n\nAt My Company,\nWe are more than just a nail salon. We are a family-owned and family-operated business dedicated to serving our community with care and excellence.
As a new addition to the town, we take pride in offering a welcoming and relaxing environment where every client feels valued and pampered.
Our mission is simple: to provide outstanding nail and spa services that combine quality, creativity, and comfort. Whether you're here for a quick touch-up, a luxurious spa treatment, or stunning nail art, our team is committed to exceeding your expectations.
We believe in building lasting relationships with our clients by delivering personalized care and attention to detail. Every visit to My Company is an opportunity to relax, unwind, and leave feeling refreshed and confident.
Thank you for welcoming us! We look forward to serving you and being a part of your self-care journey!`}
            onChange={(e: { target: { value: string | string[]; }; }) => handleChange('about', e.target.value)} />

          <TextArea label="Banner Text" value={formData.bannerText} placeholder={'New Loyalty Program - 20% off on 6th visit!\n20% for New Years!'} onChange={(e: { target: { value: string | string[]; }; }) => handleChange('bannerText', e.target.value)} />
          <TextArea label="Business Hours" value={formData.businessHours} placeholder={'Monday - Friday: 10:00AM - 7:00PM \nSaturday: 12:00 PM - 6:00PM \nSunday: Closed'} onChange={(e: { target: { value: string | string[]; }; }) => handleChange('businessHours', e.target.value)} />


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
