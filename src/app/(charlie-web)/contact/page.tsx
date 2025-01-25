import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
// ...existing code...

const Contact = () => {
  return (
    <div id="contact" className="flex flex-col items-center gap-4 container mx-auto px-4 py-8">
      <Navbar isNav={true} />
      <div className="p-8 w-full max-w-2xl flex flex-col gap-6  rounded-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white/80 mb-4">
          Contact
        </h1>

        <form
          action="https://formspree.io/f/xayrrkkk"
          method="POST"
          className="flex flex-col gap-5"
        >
          <label className="grid gap-2">
            <h2 className="text-xl font-semibold text-white/80 mb-0">Your email:</h2>
            <input
              type="email"
              name="email"
              className="p-2 rounded border border-gray-300 bg-white text-black text-lg"
              required
            />
          </label>
          <label className="grid gap-2">
            <h2 className="text-xl font-semibold text-white/80 mb-0">Your message:</h2>
            <textarea
              name="message"
              className="p-2 rounded border border-gray-300 bg-white text-black text-lg h-56 w-full"
              required
            ></textarea>
          </label>
          <Button
            type="submit"
            className="bg-[#FFF94D] text-black py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 font-semibold"
          >
            Send
          </Button>
        </form>

        <a
          href="mailto:charlie@charliedesign.live"
          className="text-[#FFF94D] mt-4 inline-block hover:underline"
        >
          <h3 className="text-lg font-medium">Direct: charlie@charliedesign.live</h3>
        </a>
      </div>
    </div>
  )
}

export default Contact
