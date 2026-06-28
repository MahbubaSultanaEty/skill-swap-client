import { Banner } from "@/components/homepage/Banner";
import CategorySlider from "@/components/homepage/CategorySlider";
import TasksSection from "@/components/homepage/TasksSection";
import Testimonials from "@/components/homepage/Testimonials";
import WhyChooseSkillSwap from "@/components/homepage/WhyChooseSkillSwap";
import Footer from "@/components/shared/Footer";


export default function Home() {

  return (
    <>
      <Banner />
      <TasksSection/>
      <CategorySlider/>
      <WhyChooseSkillSwap />
      <Testimonials />
      <Footer/>
    </>
  )
}
