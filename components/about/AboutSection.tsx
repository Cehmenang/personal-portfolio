import AboutText from "./AboutText";

export default function AboutSection(){
    return (
        <div className=" mt-40 grid grid-cols-2 px-40 gap-x-10">
            <div className="about-photo h-[400px] bg-neutral-500"></div>
            <AboutText/>
        </div>
    )
}