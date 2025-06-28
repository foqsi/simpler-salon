import { getTenantBySlug } from '@/lib/tenants';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function TenantSite({ params }: PageProps) {
  const tenant = await getTenantBySlug(params.slug);

  if (!tenant) {
    return <div>404 Not Found</div>;
  }

  return (
    <div>
      <h1>Welcome to {tenant.companyName}</h1>
      <p>{tenant.about}</p>
    </div>
  );
}
