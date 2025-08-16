type AboutProps = {
  about: string;
};

export default function AboutSection({ about }: AboutProps) {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-accent mb-6">About Us</h2>
        <p className="text-lg leading-relaxed text-base-content/80">{about}</p>
      </div>
    </section>
  );
}
