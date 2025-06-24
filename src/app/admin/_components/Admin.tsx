
'use client'

import Image from "next/image"
import { useSelector } from "react-redux"

const Admin = () => {
  const user = useSelector(state => state.user.user[0])

  return (
    <div> 
        <div className="w-50 h-50 relative flex mb-10">
          <Image src={user?.image?.url} fill className="rounded-sm " alt='admin-image' />
        </div>
        <ul>
          <li><label className="font-semibold text-2xl w-17 hidden sm:inline-block mr-3 ">Name:</label><span>{user?.username}</span> </li>
          <li><label className="font-semibold text-2xl w-17 hidden sm:inline-block mr-3 ">Email:</label><span>{user?.email}</span> </li>
        </ul>
    </div>
  )
}

export default Admin