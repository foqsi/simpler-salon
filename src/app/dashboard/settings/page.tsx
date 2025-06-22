'use client';

export default function SettingsPage() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4 space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-1">Settings</h1>
        <p className="text-sm text-gray-400">
          Manage your preferences and system options here.
        </p>
      </header>

      <section className="bg-base-200 p-6 rounded-lg shadow space-y-4">
        <h2 className="text-lg font-semibold">General Preferences</h2>
        <p className="text-sm text-gray-400">Manage your efault view, language, etc.</p>
        <div className="flex items-center justify-between py-2 border-t border-base-300">
          <span>Coming soon...</span>
        </div>
      </section>

      <section className="bg-base-200 p-6 rounded-lg shadow space-y-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <p className="text-sm text-gray-400">Decide how and when you want to be notified.</p>
        <div className="flex items-center justify-between py-2 border-t border-base-300">
          <span>Coming soon...</span>
        </div>
      </section>
    </main>
  );
}
