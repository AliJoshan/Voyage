import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import PopularDestinations from "../components/home/PopularDestinations";
import FeaturedExperiences from "../components/home/FeaturedExperiences";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <PopularDestinations />
        <FeaturedExperiences />
      </main>
    </>
  );
}
