import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default async function SlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = createServerComponentClient({ cookies });

  const { data: business } = await supabase
    .from("business")
    .select("name, logo_url, tier, slug, phone, slogan, business_hours")
    .eq("slug", slug)
    .single();

  if (!business) {
    return <div className="text-center py-20 text-red-500">Business not found</div>;
  }

  return (
    <>
      <Navbar business={business} />
      {children}
      <Footer business={business} />
    </>
  );
}
