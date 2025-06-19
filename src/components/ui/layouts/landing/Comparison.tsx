'use client';

export default function Comparison() {
  const comparisons = [
    {
      feature: 'One-time Payment',
      simpler: '✅ Included',
      others: '❌ Monthly Fees',
    },
    {
      feature: 'Full Ownership',
      simpler: '✅ You Own It',
      others: '❌ Platform-Dependent',
    },
    {
      feature: 'Custom Branding',
      simpler: '✅ Tailored for Your Business',
      others: '❌ Generic Templates',
    },
    {
      feature: 'Free Setup Help',
      simpler: '✅ Guided Launch Support',
      others: '❌ DIY Only',
    },
    {
      feature: 'Mobile-Friendly',
      simpler: '✅ Fully Responsive',
      others: '⚠️ Often Needs Tinkering',
    },
    {
      feature: 'Edit Without Code',
      simpler: '✅ Simple Admin Tools',
      others: '⚠️ Requires Plugins or Tech Skills',
    },
  ];

  return (
    <section className="bg-base-100 text-base-content px-4 py-20">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary">How Simpler Salon Stacks Up</h2>
        <p className="text-sm md:text-base mt-4 text-base-content/80">
          A smarter solution for small businesses. See how we compare.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border-collapse rounded-xl overflow-hidden shadow-md">
          <thead>
            <tr className="bg-base-200 text-base-content">
              <th className="p-4 text-left text-sm font-semibold">Feature</th>
              <th className="p-4 text-center text-sm font-semibold">Simpler Salon</th>
              <th className="p-4 text-center text-sm font-semibold">Website Builders</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((row, i) => (
              <tr key={i} className="border-t border-base-300">
                <td className="p-4 text-sm">{row.feature}</td>
                <td className="p-4 text-center font-medium text-success">{row.simpler}</td>
                <td className="p-4 text-center text-error">{row.others}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
