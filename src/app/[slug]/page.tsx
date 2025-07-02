import { notFound } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

interface SlugPageProps {
  params: {
    slug: string;
  };
}

export default async function SlugPage({ params }: SlugPageProps) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabase
    .from('business')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!data || error) return notFound();

  const {
    name,
    slogan,
    about,
    banner_texts,
    banner_images,
    logo_url,
    phone,
    location,
    business_hours,
  } = data;

  return (
    <main className="min-h-screen px-4 py-8 max-w-5xl mx-auto">
      <header className="text-center mb-10">
        {logo_url && <img src={logo_url} alt={`${name} logo`} className="mx-auto mb-4 max-h-32" />}
        <h1 className="text-4xl font-bold">{name}</h1>
        <p className="text-xl text-gray-600">{slogan}</p>
      </header>

      {banner_images?.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {banner_images.map((url: string, index: number) => (
            <img key={index} src={url} alt={`Banner ${index + 1}`} className="rounded-lg w-full" />
          ))}
        </section>
      )}

      {banner_texts && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Welcome</h2>
          <p>{banner_texts}</p>
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">About Us</h2>
        <p>{about}</p>
      </section>

      <section className="text-sm text-gray-700">
        <h2 className="text-xl font-semibold mb-2">Contact</h2>
        {location && (
          <p className="mb-1">
            {location.street}, {location.city}, {location.state} {location.zip}
          </p>
        )}
        {phone && <p className="mb-1">Phone: <a href={`tel:${phone}`}>{phone}</a></p>}
        {business_hours && <p className="mb-1">Hours: {business_hours}</p>}
      </section>
    </main>
  );
}
