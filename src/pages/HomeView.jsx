import Catagories from "../components/Categories";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import OurServices from "../components/OurServices";
import SpecialDishes from '../components/SpecialDishes';


function HomeView() {
  return (
    <div>    
      <Hero />
      <Catagories />
      <Testimonials />
      <OurServices />
      {/* <SpecialDishes/> */}

    </div>
  );
}

export default HomeView;
