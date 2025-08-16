type HeroProps = {
  businessName: string;
  slogan: string;
};

export default function HeroSection({ businessName, slogan }: HeroProps) {
  return (
    <section className="bg-primary text-neutral-content py-20 mt-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome to {businessName}
        </h1>
        <p className="mt-4 text-lg md:text-xl">{slogan || 'Only the best for you!'}</p>
        <a
          href="/services"
          className="mt-6 inline-block bg-neutral-content text-secondary font-semibold py-2 px-6 rounded shadow hover:bg-neutral-content/70 transition"
        >
          Explore Our Services
        </a>
      </div>
    </section>
  );
}
