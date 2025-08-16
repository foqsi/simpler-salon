export default function CTASection() {
  return (
    <section className="bg-accent text-accent-content py-16">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to treat yourself?</h3>
        <a
          href="/appointment"
          className="inline-block bg-base-100 text-base font-semibold py-2 px-6 rounded shadow hover:bg-base-200 transition"
        >
          Book an Appointment
        </a>
      </div>
    </section>
  );
}
