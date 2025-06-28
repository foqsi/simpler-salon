// import { getTenantBySlug } from '@/lib/tenants';
// import { notFound } from 'next/navigation';

// interface PageProps {
//   params: { slug: string };
// }

// export default async function TenantSite({ params }: PageProps) {
//   const tenant = await getTenantBySlug(params.slug);

//   if (!tenant) return notFound();

//   return (
//     <div>
//       <h1>Welcome to {tenant.companyName}</h1>
//       <p>{tenant.about}</p>
//     </div>
//   );
// }
