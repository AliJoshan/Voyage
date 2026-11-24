import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import PopularDestinations from "../components/home/PopularDestinations";
import FeaturedExperiences from "../components/home/FeaturedExperiences";
import WhyVoyage from "../components/home/WhyVoyage";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <PopularDestinations />
        <FeaturedExperiences />
        <WhyVoyage />
      </main>
      <Footer />
    </>
  );
}
