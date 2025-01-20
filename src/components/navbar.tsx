import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="relative flex items-center justify-between shadow-sm ">
      <ul className="flex items-center justify-between space-x-4 text-lg bg-black text-white/80 border-2 border-white/80 px-8 py-3 rounded-full gap-6 italic font-semibold">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/projects">Projects</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
