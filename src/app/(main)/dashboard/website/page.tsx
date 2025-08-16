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
import { Image } from 'lucide-react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const timeOptions = [
  '',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  'Closed',
];

export default function WebsiteEditor() {
  const [formData, setFormData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch('/api/dashboard/website');
        const data = await res.json();
        console.log('Fetched home page data:', data);
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


  const handleChange = (field: keyof HomePageData, value: unknown) => {
    if (!formData) return;
    setFormData((prev) => ({ ...prev!, [field]: value }));
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
      <p className="text-sm mb-4 text-base-content/80">Your business info shown across your site.</p>

      <div className="flex">
        <div className="max-w-xl space-y-6">
          <InputField label="Company Name" value={formData.companyName} onChange={(e) => handleChange('companyName', e.target.value)} />
          <InputField label="Slogan" value={formData.slogan} onChange={(e) => handleChange('slogan', e.target.value)} />
          <InputField label="Phone Number" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} />

          {/* Location */}
          {['street', 'city', 'state', 'zip'].map((field) => (
            <InputField
              key={field}
              label={field[0].toUpperCase() + field.slice(1)}
              value={formData.location[field as keyof typeof formData.location]}
              onChange={(e) =>
                handleChange('location', {
                  ...formData.location,
                  [field]: e.target.value,
                })
              }
            />
          ))}

          <InputField label="Book Now Button Text" value={formData.CTA} onChange={(e) => handleChange('CTA', e.target.value)} />

          <ImageUploader
            label="Company Logo"
            imageUrl={formData.logoUrl}
            onUpload={async (file: File) => {
              const url = URL.createObjectURL(file);
              handleChange('logoUrl', url);
            }}
          />

          <div className="flex items-center gap-2">
            <Image className="w-6 h-6" />

          </div>

          <ImageUploader
            label="Banner Images (you can upload multiple)"
            multiple
            imageUrls={formData.bannerImages}
            onUpload={async (files: File[] | File) => {
              const urls = Array.isArray(files) ? files.map((f) => URL.createObjectURL(f)) : [URL.createObjectURL(files)];
              handleChange('bannerImages', urls);
            }}
          />

          {/* Banner Texts */}
          <section>
            <label className="block text-sm font-medium mb-1">Banner Texts</label>
            <div className="space-y-2">
              {formData.bannerText.map((text, index) => (
                <div key={index} className="flex gap-2">
                  <InputField
                    value={text}
                    onChange={(e) => {
                      const updated = [...formData.bannerText];
                      updated[index] = e.target.value;
                      handleChange('bannerText', updated);
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const updated = formData.bannerText.filter((_, i) => i !== index);
                      handleChange('bannerText', updated);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => handleChange('bannerText', [...formData.bannerText, ''])}>
                + Add Banner Text
              </Button>
            </div>
          </section>

          {/* Business Hours */}
          <section>
            <label className="block text-sm font-medium mb-1">Business Hours</label>
            <div className="space-y-3">
              {daysOfWeek.map((day, index) => (
                <div key={day} className="flex items-center gap-2">
                  <span className="w-20">{day}</span>
                  <select
                    value={formData.businessHours[day]?.open || ''}
                    onChange={(e) =>
                      handleChange('businessHours', {
                        ...formData.businessHours,
                        [day]: {
                          ...formData.businessHours[day],
                          open: e.target.value,
                        },
                      })
                    }
                  >
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t || 'Select'}
                      </option>
                    ))}
                  </select>
                  <span>-</span>
                  <select
                    value={formData.businessHours[day]?.close || ''}
                    onChange={(e) =>
                      handleChange('businessHours', {
                        ...formData.businessHours,
                        [day]: {
                          ...formData.businessHours[day],
                          close: e.target.value,
                        },
                      })
                    }
                  >
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t || 'Select'}
                      </option>
                    ))}
                  </select>
                  {index > 0 && (
                    <Button
                      type="button"
                      onClick={() => {
                        const prevDay = daysOfWeek[index - 1];
                        handleChange('businessHours', {
                          ...formData.businessHours,
                          [day]: { ...formData.businessHours[prevDay] },
                        });
                      }}
                    >
                      Copy {daysOfWeek[index - 1]}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </section>

          <TextArea
            label="About Section"
            value={formData.about}
            placeholder={`EXAMPLE:\n\nAt My Company,\nWe are more than just a nail salon...`}
            onChange={(value) => handleChange('about', value)}
          />

          <ImageUploader
            label="About Section Image"
            imageUrl={formData.aboutImage}
            onUpload={async (file: File) => {
              const url = URL.createObjectURL(file);
              handleChange('aboutImage', url);
            }}
          />

          <Button onClick={handleSubmit} className="mt-4 w-full">
            Save Changes
          </Button>
        </div>

        <div className="mx-auto hidden md:flex">
          {formData && <Preview />}
        </div>
      </div>
    </div>
  );
}
