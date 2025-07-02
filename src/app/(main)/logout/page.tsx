import Link from 'next/link';

export default function LogoutPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">You have been logged out</h1>
        <p className="mb-6">Thank you for using our service!</p>
        <Link href="/" className="btn btn-primary">Return to Home</Link>
      </div>
    </div>
  );
}