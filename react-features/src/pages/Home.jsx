import '../App.css';
import HeroSection from '../components/HeroSection';
import FeaturesGrid from '../components/FeaturesGrid';

function Home() {
  return (
    <section className="w-full min-h-[80vh] bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center">
      <HeroSection />
      <FeaturesGrid />
    </section>
  );
}

export default Home;
