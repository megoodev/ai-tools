'use client'

import ToolItem from "@/components/ToolItem"
import { Button } from "@/components/ui/button"
import { getfavorites } from "@/lib/apiCashe/favorite"
import { setFavorite } from "@/utils/rtk/FavoriteSlice"
import { Tool } from "@prisma/client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const FavoritesCard = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state?.user?.user[0])

  const [favorites, setFavorites] = useState([])
  const _getFavorites = () => {
    getfavorites().then((res) => {
      dispatch(setFavorite(res.data.data))
      setFavorites(res.data.data)
    })
  }
  useEffect(() => {
    _getFavorites()
  }, [])


  if (!user) {
    return (<section className="flex justify-center items-center h-[91.2vh]">
      <div className="text-center ">
        <h1 className="mb-5">you can sign in for show your favorite</h1>
        <Button variant='secondary'>
          <Link href='/login'>GO TO log In</Link>

        </Button>
      </div>
    </section>)
  }
  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-5">
      {
        favorites.length < 1 ? (<h1>you not have any favorites</h1>) : (
          <>
            {favorites.map((favorite:Tool) => (
              <ToolItem  key={favorite.id} tool={favorite} />
            ))}
          </>)
      }
    </div>
  )
}

export default FavoritesCard