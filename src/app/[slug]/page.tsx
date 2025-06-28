import { getTenantBySlug } from '@/lib/tenants';

export default async function TenantSite({ params }: { params: { slug: string } }) {
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
