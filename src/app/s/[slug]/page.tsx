// src/app/s/[slug]/page.tsx
import type { Metadata } from "next";
import { headers, cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Landing from "./layouts/landing/Landing";

// If your slug sites live at /s/[slug], set NEXT_PUBLIC_SLUG_PREFIX="s" in .env
const PATH_PREFIX =
  process.env.NEXT_PUBLIC_SLUG_PREFIX?.replace(/^\/|\/$/g, "") || "";

/** Derive the absolute site URL at request time (supports Vercel and proxies). */
async function getBaseUrl() {
  const h = headers();
  const host = (await h).get("x-forwarded-host") ?? (await h).get("host") ?? "simplersalon.com";
  const proto = (await h).get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}`;
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const supabase = createServerComponentClient({ cookies });

  const { data: business } = await supabase
    .from("business")
    .select("name, slogan, meta_title, meta_description, meta_image_url, slug")
    .eq("slug", slug)
    .single();

  const baseTitle = "Simpler Salon";
  const baseDescription = "Create your salon website easily with Simpler Salon.";
  const title = business?.meta_title || business?.name || baseTitle;
  const description = business?.meta_description || business?.slogan || baseDescription;

  const baseUrl = getBaseUrl();
  const path = PATH_PREFIX ? `/${PATH_PREFIX}/${slug}` : `/${slug}`;
  const absoluteUrl = `${baseUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl },
    openGraph: {
      type: "website",
      title,
      description,
      url: absoluteUrl,
      siteName: "Simpler Salon",
      images: business?.meta_image_url ? [{ url: business.meta_image_url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: business?.meta_image_url ? [business.meta_image_url] : [],
    },
  };
}

export default async function Home({ params }: PageProps) {
  const { slug } = await params;

  const supabase = createServerComponentClient({ cookies });

  const { data: business, error } = await supabase
    .from("business")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !business) {
    return <div className="text-center py-20 text-red-600">Business not found</div>;
  }

  return <Landing business={business} />;
}
