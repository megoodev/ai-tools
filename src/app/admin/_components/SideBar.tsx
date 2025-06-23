'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'


const SideBar = () => {
  const adminLinks = [
    {
      path: 'users',
      name: 'Users',
    },
    {
      path: 'category',
      name: 'Category',
    },
    {
      path: 'tools',
      name: 'Tools',
    },

  ]
  const user = useSelector(state => state?.user?.user[0])
  const router = useRouter()
  useEffect(() => {
    
    if (user !== undefined) {
      if (!user.isAdmin) {
        router.push('/')
      }
    }
  }, [user, router])

  return (
    <div className='w-[20%] h-[91vh] sticky left-0 top-16  '>
      <ul>
        <li className="bg-secondary rounded-sm m-5 p-2"><Link href={`/admin`}>admin</Link></li>

        {adminLinks.map((link, i) => (
          <li key={i} className="bg-secondary rounded-sm m-5 p-2"><Link href={`/admin/${link.path}`}>{link.name}</Link></li>
        ))}

      </ul>
    </div>
  )
}

export default SideBar