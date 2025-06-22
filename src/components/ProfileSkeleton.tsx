export default function ProfileSkeleton() {
  return (
    <main className="max-w-5xl mx-auto py-12 px-4 space-y-6">
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="h-6 w-40 skeleton" />
        <div className="h-4 w-64 skeleton" />
        <div className="h-4 w-64 skeleton" />
        <div className="h-4 w-64 skeleton" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <section key={i} className="bg-base-200 p-5 rounded-lg shadow space-y-4">
            <div className="h-5 w-32 skeleton" />
            {Array.from({ length: 6 }).map((_, j) => (
              <div key={j} className="space-y-2">
                <div className="h-4 w-24 skeleton" />
                <div className="h-6 w-full skeleton" />
              </div>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
