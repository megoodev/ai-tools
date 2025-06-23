'use client'
import Image from "next/image"
import { usersWithRelation } from "@/utils/type"
import { useEffect, useState } from "react"
import AlertWrong from "./AlertWrong"
import IsAdmin from "./IsAdmin"
import { useSelector } from "react-redux"
import { getUsers } from "@/lib/apiCashe/users"

const GetUsers = () => {
  const [admin, setAdmin] = useState()
    const [deleteItem, setDeleteItem] = useState(null)
  const userState = useSelector(state => state.user.user[0])
  const [users, setUsers] = useState([])
  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res.data.data)

    })
  }, [ admin, deleteItem])

  
  return (
    <>
      <ul className="w-[100%] mt-5">
        {users.map((user: usersWithRelation) => (
          userState.id === user.id ? '' : (
            <li className="p-3 bg-secondary mb-5 rounded-sm w-[75vw] flex gap-2  items-center" key={user.id}>
              <div className="">
                <Image src={user.image?.url} width={80} height={80} className="rounded-full" alt="user-image" />
              </div>
              <div className="w-full flex justify-between items-center" >
                <div>
                  <h1 className="font-semibold">username: {user?.username} </h1>
                  <h1 className="font-semibold">emailAddress: {user?.email} </h1>
                </div>
                <div className="flex justify-between gap-5 items-center">
                  <IsAdmin setAdmin={setAdmin}  id={user.id} isAdmin={user.isAdmin} />
                  {!user.isAdmin && <AlertWrong setDeleteItem={setDeleteItem} id={user.id} />}
                </div>
              </div>
            </li>
          )

        ))}
      </ul>
    </>
  )
}

export default GetUsers


