import Link from "next/link";

const experiences = [
  {
    category: "ADVENTURE",
    duration: "6 NIGHTS",
    title: "Chase the northern lights",
    description:
      "Glacier hikes by day, auroras by night across Iceland’s wild south coast.",
    linkText: "Discover Reykjavík & South Coast",
    href: "/explore?destination=iceland",
    image: "/images/nature.jpg",
    imageAlt: "Dramatic Icelandic landscape with waterfalls and mountains",
    imagePosition: "left",
  },
  {
    category: "CULTURE",
    duration: "5 NIGHTS",
    title: "Autumn in old Kyoto",
    description:
      "Tea ceremonies, maple-lit temples and kaiseki dinners in the ancient capital.",
    linkText: "Discover Kyoto",
    href: "/explore?destination=kyoto",
    image: "/images/kyoto2.jpg",
    imageAlt: "Traditional Japanese architecture surrounded by autumn scenery",
    imagePosition: "right",
  },
  {
    category: "MOUNTAINS",
    duration: "4 NIGHTS",
    title: "Beneath the Matterhorn",
    description:
      "Car-free alpine village life, glacier skiing and fondue in mountain huts.",
    linkText: "Discover Zermatt",
    href: "/explore?destination=zermatt",
    image: "/images/pic.jpg",
    imageAlt: "The Matterhorn rising above the Swiss alpine village of Zermatt",
    imagePosition: "left",
  },
];

export default function FeaturedExperiences() {
  return (
    <section className="bg-[#f2eadd] px-6 py-14 sm:px-8 lg:px-11 lg:py-16">
      <div className="mx-auto max-w-[1700px]">
        {/* Section heading */}
        <div className="mb-12 lg:mb-16">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[#526174] sm:text-xs">
            Featured Experiences
          </p>

          <h2 className="max-w-[900px] font-serif text-3xl leading-[1.1] tracking-[-0.035em] text-[#191b20] sm:text-4xl lg:text-[60px]">
            Journeys worth planning a year around
          </h2>
        </div>

        {/* Featured experiences */}
        <div className="space-y-16 lg:space-y-20">
          {experiences.map((experience, index) => (
            <article
              key={experience.title}
              className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.95fr_1fr] lg:gap-[5vw] ${
                experience.imagePosition === "right"
                  ? "lg:[&_.experience-image]:order-2 lg:[&_.experience-content]:order-1"
                  : ""
              }`}
            >
              {/* Image */}
              <div className="experience-image relative aspect-[4/3] w-full max-w-[790px] overflow-hidden rounded-[24px] sm:rounded-[30px]">
                <img
                  src={experience.image}
                  alt={experience.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>

              {/* Content */}
              <div className="experience-content flex flex-col items-start justify-center py-2 lg:py-8">
                <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.23em] text-[#102e50] sm:text-xs">
                  {experience.category} · {experience.duration}
                </p>

                <h3 className="mb-4 font-serif text-3xl leading-[1.12] tracking-[-0.025em] text-[#191b20] sm:text-4xl lg:text-[46px]">
                  {experience.title}
                </h3>

                <p className="mb-6 max-w-[560px] text-[15px] leading-[1.65] text-[#697587] sm:text-base lg:text-[19px]">
                  {experience.description}
                </p>

                <Link
                  href={experience.href}
                  className="group inline-flex items-center gap-3 border-b border-[#191b20] pb-1.5 text-sm font-medium text-[#191b20] transition-colors hover:border-[#244b70] hover:text-[#244b70] sm:text-base"
                >
                  {experience.linkText}

                  <span className="inline-block text-lg transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
