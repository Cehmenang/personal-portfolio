import AboutText from "./AboutText"

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full about bg-neutral-950 text-neutral-50 px-6 md:px-12 py-24 md:py-32"
    >
      <div className="mb-14 md:mb-20">
        <span className="block text-sm tracking-[0.2em] uppercase text-neutral-400 mb-3">
          About
        </span>
      </div>

      <div className="grid grid-cols-1">
        <div className="about-txt absolute top-0 left-0 z-10">
            <AboutText/>
        </div>
        <div className="gambar w-full h-[500px] bg-neutral-700 absolute top-0 left-0">

        </div>
      </div>
    </section>
  )
}