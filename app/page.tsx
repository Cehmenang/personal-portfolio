import AboutSection from "@/components/about/AboutSection";
import BaseName from "@/components/name/BaseName";
import WorksMain from "@/components/works/WorksMain";

export default function Main(){
  return (
    <div className="main flex flex-col gap-y-40 bg-neutral-950 text-neutral-50">
      <BaseName/>
      <AboutSection/>
      <WorksMain/>
    </div>
  )
}