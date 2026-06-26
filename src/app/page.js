import { Banner } from "@/components/homepage/Banner";
import CategorySlider from "@/components/homepage/CategorySlider";
import Testimonials from "@/components/homepage/Testimonials";
import WhyChooseSkillSwap from "@/components/homepage/WhyChooseSkillSwap";


export default function Home() {

  return (
    <>
      <Banner />
      <CategorySlider/>
      <WhyChooseSkillSwap />
      <Testimonials/>
    </>
  )
}
