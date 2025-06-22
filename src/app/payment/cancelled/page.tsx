// app/payment/cancelled/page.tsx
export default function PaymentCancelledPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-base-100 text-base-content px-4">
      <div className="bg-base-200 p-8 rounded-xl shadow-lg text-center max-w-lg">
        <h1 className="text-2xl font-bold mb-4">❌ Payment Cancelled</h1>
        <p className="text-sm text-base-content/80 mb-4">
          No payment was made. You can try again anytime from your account dashboard or pricing page.
        </p>
        <a href="/dashboard" className="btn btn-primary">
          Return to Dashboard
        </a>
      </div>
    </main>
  );
}
