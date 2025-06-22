import DashboardCard from "@/components/DashboardCard";

export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome back!</h1>
      <p className="text-sm text-base-content/70">
        Here’s an overview of your salon. Use the sidebar to manage your services, gallery, appointments, and more.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <DashboardCard
          title="Manage Your Salon"
          description="Add services, manage appointments, and customize your salon settings."
          icon={<i className="fas fa-cogs"></i>}
          link="/Dashboard/services"
          className="mb-4"
        />
        <DashboardCard
          title="Manage Your Salon"
          description="Add services, manage appointments, and customize your salon settings."
          icon={<i className="fas fa-cogs"></i>}
          link="/Dashboard/services"
          className="mb-4"
        />
      </div>
    </div>
  );
}
