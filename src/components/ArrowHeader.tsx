'use client'
import {  ArrowUp,  HeartIcon, Home, PenIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"


const ArrowHeader = () => {
  const [scroll ,setScroll] = useState(0)
  useEffect(()=> {
    window.addEventListener('scroll', ()=> {
      setScroll(window.scrollY)
    })
  },[])
  const toTop = ()=> {
    if (scroll >= 75 ) {
      window.scrollTo(0,0)
    }
  }
  return (
    <div className={`w-fit ${scroll >= 75 ? "block" : "hidden"} md:w-[50px] bg-background md:bg-transparent w-full  p-5 right-[50%]  fixed bottom-0 md:right-[30px] delay-200 md:bottom-[50%]  translate-x-[50%] flex flex-row md:flex-col justify-center items-center gap-5`}>
      <div className="bg-accent p-3 rounded-xl cursor-pointer">
        <ArrowUp className="opacity-75 hover:opacity-100" onClick={toTop}/>
      </div>
      <ul className="flex justify-between items-center gap-5 md:flex-col  p-3 border-1 border- bg-accent rounded-xl">
        <li>
          <Link href='/' >
            <Home className="opacity-75 hover:opacity-100"/>
          </Link>
        </li>
        <li>
          <Link href='/about'>
            <PenIcon className="opacity-75 hover:opacity-100" />
          </Link>
        </li>
        <li>
          <Link href='/favorites'>
            <HeartIcon className="text-red-400 hover:text-red-600 " />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default ArrowHeader