'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  link?: string;
  footer?: ReactNode;
  className?: string;
}

export default function DashboardCard({
  title,
  description,
  icon,
  link,
  footer,
  className = '',
}: DashboardCardProps) {
  const content = (
    <div
      className={`bg-base-200 rounded-lg shadow p-5 space-y-2 transition hover:shadow-md ${link ? 'cursor-pointer hover:bg-base-300' : ''} ${className}`}
    >
      <div className="flex items-center gap-3">
        {icon && <div className="text-primary">{icon}</div>}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {description && <p className="text-sm text-gray-400">{description}</p>}
      {footer && <div className="pt-2 border-t border-base-300">{footer}</div>}
    </div>
  );

  return link ? <Link href={link}>{content}</Link> : content;
}
