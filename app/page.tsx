import AboutSection from "@/components/about/AboutSection";
import Footer from "@/components/footer/Footer";
import BaseName from "@/components/name/BaseName";
import Navbar from "@/components/navbar/Navbar";
import VanillaScroll from "@/components/scroll/VanillaScroll";
import GetInTouch from "@/components/touch/GetInTouch";
import WorksMain from "@/components/works/WorksMain";

export default function Main(){
  return (
    
    <div className="main flex flex-col gap-y-40 bg-neutral-950 text-neutral-50">
      <VanillaScroll>
      <Navbar/>
      <BaseName/>
      <AboutSection/>
      <WorksMain/>
      <GetInTouch/>
    </VanillaScroll>
    </div>

  )
}