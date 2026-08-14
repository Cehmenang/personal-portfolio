import AboutShader from "./AboutShader"
import AboutText from "./AboutText"

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-neutral-950 text-neutral-50 px-6 md:px-12"
    >
      <div className="mb-14 md:mb-20">
        <span className="block text-sm tracking-[0.2em] uppercase text-neutral-400 mb-3">
          About
        </span>
        <h2 className="font-primary font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight">
          Behind The <span className="italic">Screen</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_2fr] gap-x-0 md:gap-x-10">
        {/* photo — portrait, sticky di desktop */}
        <div className="lg:sticky lg:top-32 h-fit">
          <div className="about-photo relative w-full mx-auto lg:mx-0 aspect-video bg-neutral-800 overflow-hidden gap-x-10">
                <AboutShader/>
                <img src={"/about/AboutGweh.webp"} className="w-full h-full object-cover absolute top-0 z-[1] grayscale"/>
          </div>
        </div>

        <AboutText />
      </div>
    </section>
  )
}