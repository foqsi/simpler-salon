import Image from 'next/image';

export default function Logo({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/logo.png"
        alt="El Reno Nail Spa Logo"
        className="object-contain w-full h-full"
        width={40}
        height={40}
        priority
      />
    </div>
  );
}
