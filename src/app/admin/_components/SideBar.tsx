'use client'
import { GroupIcon, User, Users, Wrench } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'


const SideBar = () => {
  const adminLinks = [
    {
      icon: <Users/>,
      path: 'users',
      name: 'Users',
    },
    {
      icon: <GroupIcon />,
      path: 'category',
      name: 'Category',
    },
    {
      icon: <Wrench />,
      path: 'tools',
      name: 'Tools',
    },

  ]
  const user = useSelector(state => state?.user?.user[0])
  const router = useRouter()
  
  useEffect(() => {
      if (user === undefined || user === null) {
        router.push('/')
      }
  }, [user])

  return (
    <div className='w-fit sm:w-[23%] h-[91vh] sticky left-0 top-16 z-0  bg-secondary md:bg-transparent '>
      <ul>
        <li className="bg-background sm:bg-secondary hover:text-primary duration-300 rounded-sm m-5 p-2"><Link href={`/admin`} className='flex gap-2'><User /> <span className='hidden sm:block'>admin</span></Link></li>

        {adminLinks.map((link, i) => (
          <li key={i} className="bg-background sm:bg-secondary hover:text-primary duration-300 rounded-sm m-5 p-2"><Link href={`/admin/${link.path}`} className='flex gap-2'>{link.icon}<span className='hidden sm:block'>{link.name}</span></Link></li>
        ))}

      </ul>
    </div>
  )
}

export default SideBar