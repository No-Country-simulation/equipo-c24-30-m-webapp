import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Stats from "../components/LandingSections/Stats";
import Working from "../components/LandingSections/Working";
import Pets from "../components/LandingSections/Pets";
import Testimonials from "../components/LandingSections/Testimonials";
import Benefits from "../components/LandingSections/Benefits";
import Footer from "../components/Footer/Footer";

const LandingLayout = () => {

  return (
    <div className="min-h-screen flex flex-col pt-40 lg:pt-25">
      <Navbar/>
      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-[url(/src/assets/images/landing-bg.jpeg)] bg-cover opacity-20 z-0"></div>
        <div className="relative z-10">
          <Hero/>
          <Stats/>
          <Working/>
          <Pets/>
          <Testimonials/>
          <Benefits/>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default LandingLayout;