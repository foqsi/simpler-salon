'use client';

import React from 'react';
import Link from 'next/link';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link' | 'outline' | 'error';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  href?: string;
  className?: string;
};


export default function Button({
  type = 'button',
  variant = 'primary',
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
  children,
  href,
  className = '',
}: ButtonProps) {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const widthClass = fullWidth ? 'block w-full' : '';
  const combined = [baseClass, variantClass, widthClass, className].filter(Boolean).join(' ');

  if (href && !disabled && !loading) {
    return (
      <Link href={href} className={combined}>
        {children}
      </Link >
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combined}
    >
      {loading ? <span className="loading loading-spinner" /> : children}
    </button>
  );
}
