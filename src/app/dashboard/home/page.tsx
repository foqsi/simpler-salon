'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

type DashboardMetric = {
  id: string;
  title: string;
  value: number | string;
  description: string;
  link?: string;
};

export default function DashboardHome() {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const res = await fetch('/api/dashboard/metrics');
      const data = await res.json();
      setMetrics(data);
    };

    fetchMetrics();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome back!</h1>
      <p className="text-sm text-base-content/70 mb-6">
        Here&apos;s an overview. You can click on a card to manage that area.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Link key={metric.id} href={metric.link || "#"}>
            <div className="bg-base-200 hover:bg-base-300 p-6 rounded-xl shadow transition cursor-pointer">
              <h2 className="text-lg font-semibold mb-1">{metric.title}</h2>
              <p className="text-4xl font-bold mb-1">{metric.value}</p>
              <p className="text-sm text-base-content/70">{metric.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
