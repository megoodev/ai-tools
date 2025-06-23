'use client'
import Link from "next/link"
import AuthButton from "./components/AuthButton"
import Image from "next/image"
import logo from '../../../../public/assits/logo.svg'
import { MenuIcon, XIcon } from "lucide-react"
import { useState } from "react"
import { ModeToggle } from "@/components/ModeToggle"
import { useSelector } from "react-redux"
const Header = () => {
  const user = useSelector(state=> state?.user?.user[0])
  const [open, setOpen] = useState(false)
  type Links = {
    path: string,
    name: string
  }
  const links: Links[] = [
    {
      path: '/',
      name: 'Home'
    },
    {
      path: '/about',
      name: 'About'
    },
    {

      path: '/tools',
      name: 'Tools'
    },
    {
      path: '/favorites',
      name: 'Favorites'
    },
  ]

  return (
    <header className="container py-2">
      <div className="flex justify-between gap-5">
        <Link href={'/'}>
          <Image src={logo} alt="AI-logo" /></Link>

        <nav className={`  ${open ? 'absolute inset-0 ' : 'hidden'} md:static absolute bottom-0   bg-black/50 md:bg-transparent md:flex justify-center items-center pt-15 md:pt-0`}>
          <div className="flex md:flex-row w-[90%] md:w-auto flex-col mx-auto pt-15 md:pt-3 py-8 md:py-3 px-5 gap-5 rounded-2xl md:rounded-full font-semibold justify-end  bg-accent relative">
            <XIcon className="cursor-pointer border-b-1 md:hidden absolute top-5 end-5  hover:text-red-500 hover:rotate-5 duration-300" onClick={() => setOpen(!open)} />
            {links.map((link, i) => (
              <Link key={i} className="hover:text-blue-500 duration-300 hover:border-b-1 hover:border-blue-500" href={link.path} >{link.name}</Link>

            ))}
            {user && user?.isAdmin && <Link className="hover:text-red-500 duration-300 hover:border-b-1 hover:border-red-500" href="/admin">admin</Link>}
            
          </div>
        </nav>
        <div className="flex items-center gap-3">
          <MenuIcon className="cursor-pointer md:hidden" onClick={() => setOpen(!open)} />
          <ModeToggle />
          <AuthButton />
        </div>
      </div>
    </header>
  )
}

export default Header