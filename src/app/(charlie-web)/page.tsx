import Image from "next/image";
import Navbar from "./components/navbar";
import Divider from "./components/divider";
import EmblaCarousel from "./components/carousel";

export default function Home() {
  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-8 lg:p-10 font-[family-name:var(--font-inter)] bg-[#0A090C] text-white	">
      <main className="flex flex-col gap-6 md:gap-8 items-center justify-center dark:[color-scheme:light_dark]">
        <div className="flex flex-col gap-4 text-center justify-center items-center w-full"> 
          <Image 
            src="/logo.svg" 
            alt="Logo" 
            width={300}
            height={300}
            className="w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px]"
          />
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-12 lg:gap-16 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white/20">
            <h2 className="hover:text-[#FF2800] transition-all duration-300 ease-in-out cursor-pointer">FX</h2>
            <h2 className="hover:text-[#4BC0FF] transition-all duration-300 ease-in-out cursor-pointer">Develop</h2>
            <h2 className="hover:text-[#90FF94] transition-all duration-300 ease-in-out cursor-pointer">Design</h2>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6  ">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[100px_30px_20px_70px_10px_100px]">
            <div className="flex flex-col justify-center bg-[#1D1D1D]/40 rounded-3xl text-white text-center lg:col-span-1 lg:col-start-2 hover:scale-105 transition-all duration-300 ease-in-out">
                     <div className="flex flex-row justify-evenly">
                      <Image 
                        src="/youtube.svg"
                        alt="Charlie"
                        width={50}
                        height={100}
                        className="hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer filter hover:brightness-100 brightness-[.2]"
                      />
                      <Image 
                        src="/twitter.svg"
                        alt="Charlie"
                        width={50}
                        height={100}
                        className="hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer filter hover:brightness-100 brightness-[.2]"

                      />
                      <Image 
                        src="/instagram.svg"
                        alt="Charlie"
                        width={50}
                        height={100}
                        className="hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer filter hover:brightness-100 brightness-[.2]"

                      />
                      <Image 
                        src="/github.svg"
                        alt="Charlie"
                        width={50}
                        height={100}
                        className="hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer filter hover:brightness-100 brightness-[.2]"

                      />
                     </div>
            </div>

            <div className="bg-[#1D1D1D]/40 rounded-3xl p-4 sm:p-6 text-white lg:col-span-1 lg:col-start-1 lg:row-span-5 lg:row-start-1 hover:scale-105 transition-all duration-300 ease-in-out">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex flex-row items-center gap-5 ">
                <div className="bg-yellow-300 w-12 sm:w-16 h-12 sm:h-16 rounded-full mb-4"></div>
                <h1 className="text-2xl sm:text-3xl font-medium">Charlie Fox</h1>
                </div>
                <p className=" text-md text-white/80">
                  I'm a software engineer and 3D artist dedicated to building scalable web applications and creating visually impactful digital experiences.
                </p>
                <p className="mt-4 text-md text-white/80">
                  Over the years, I've worked on a range of projects that have helped me improve my skills and deepen my expertise across multiple areas.
                </p>
              </div>
            </div>

            <div className="bg-[#1D1D1D]/40 rounded-3xl p-4 sm:p-6 text-white flex flex-col justify-between lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:row-span-3 hover:scale-105 transition-all duration-300 ease-in-out">
              <h2 className="text-lg sm:text-xl font-semibold">Latest Blog Post</h2>
              <div className=" border-2 border-white/30 rounded-xl p-6">
                <p className="text-gray-400 text-sm">Jan 17, 2025 &bull; 8 min read</p>
                <p className="mt-2 font-medium ">Smart Home Automation with Home Assistant</p>
              </div>
            </div>

             
            <div className="bg-[#1D1D1D]/40 rounded-3xl p-4 sm:p-4 text-white flex flex-col gap-4 lg:col-span-1 lg:col-start-2 lg:row-span-5 lg:row-start-2 hover:scale-105 transition-all duration-300 ease-in-out">
                <div className=" rounded-3xl">
                  <Image 
                    src="/thumbnails/kitchen.png"
                    alt="Kitchen"
                    width={400}
                    height={300}
                    className="rounded-xl"
                  />
                <h4 className="mt-4 text-xm font-semibold text-white/40">FEATURED PROJECT</h4>
                <p className=" font-medium text-2xl">Checky</p>
                <p className="text-lg text-gray-400">Simple check-in for businesses</p>
              </div>
            </div>

            <div className="bg-[#1D1D1D]/40 rounded-3xl p-4 sm:p-4 text-white lg:col-span-1 lg:col-start-3 lg:row-span-3 lg:row-start-4 hover:scale-105 transition-all duration-300 ease-in-out bg-[url('/thumbnails/kitchen.png')] bg-cover bg-center">

            </div>

            <div className="bg-[#1D1D1D]/40 rounded-3xl p-4 text-white lg:col-start-1 lg:col-span-1 lg:row-span-1 lg:row-start-6 flex items-center justify-center hover:scale-105 transition-all duration-300 ease-in-out">
              <p className="text-lg sm:text-xl font-medium">Contact me</p>
            </div>
          </div>
        </div>

        
        <div className="flex flex-col gap-4 text-center w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white/80">Featured Projects</h2>
          <EmblaCarousel slides={SLIDES} />
        </div>
      </main>
    </div>
  );
}

const SLIDES = [
  {
    id: 1,
    title: "Project 1",
    description: "Description of project 1",
    image: "/thumbnails/kitchen.png",
  },
  {
    id: 2,
    title: "Project 2",
    description: "Description of project 2",
    image: "/thumbnails/bar.png",
  },
  {
    id: 3,
    title: "Project 3",
    description: "Description of project 3",
    image: "/thumbnails/houdini.png",
  },
];

const clients = [
  {
    id: 1,
    name: "Avtconnect",
    image: "/thumbnails/client1.png",
  },
  {
    id: 2,
    name: "TOMA",
    image: "/thumbnails/client2.png",
  },
  {
    id: 3,
    name: "David Howells builders",
    image: "/thumbnails/client3.png",
  },
  {
    id: 4,
    name: "ChangeLab",
    image: "/thumbnails/client1.png",
  }
];

const OPTIONS = { loop: true };