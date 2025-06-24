'use client'
import { Tool } from '@prisma/client'
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import DialogDemo from '../app/tools/_components/DialogDemo'
import { BanIcon, Heart, HeartMinus, HeartPlus, PenIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useSelector } from 'react-redux';
import { addFavorites, deleteFavorites } from '@/lib/apiCashe/favorite'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'


const ToolItem = ({ tool }: { tool: Tool }) => {
  const favorites = useSelector(state => state?.favorites?.favorites)
  const user = useSelector(state => state.user.user[0])
  const [isFavorite , setIsVaforite] = useState(false)
  const router = useRouter()
  const toggleFavorite = (id: string) => {
    if (favorites !== undefined) {
      if (favorites.length < 1) {
        return addFavorites(tool.id)
      } else {
        favorites.map((favorite: Tool) => {
          if (id !== favorite.id) {
            return addFavorites(tool.id)
          }
          if (id === favorite.id) {
            return deleteFavorites(tool.id)
          }

        })
      }

    }

  }
  useEffect(()=> {
    favorites.map((favorite:Tool)=> {
      favorite.id === tool.id && setIsVaforite(true)
    })
  },[isFavorite])
  return (
    <Card>
      <CardHeader className='w-full h-50 relative'>

        <Image src={tool.imageTool} fill alt='toolimage' />
      </CardHeader>
      <CardContent className='flex justify-between items-center'>
        <CardTitle>{tool?.name}</CardTitle>
        <CardAction className='flex gap-2 items-center'>
          <Link target='_blank' href={tool?.link}>visit</Link>

          <Button className=' rounded-full cursor-pointer' variant='secondary'
            onClick={() => user ? toggleFavorite(tool?.id) : router.push('/login')}
          >

            {isFavorite? <HeartMinus/> : <HeartPlus />}

          </Button>
        </CardAction>
      </CardContent>
      <CardFooter className='flex flex-col'>
        <p className='line-clamp-3 mb-5'>{tool?.description}</p>
        <DialogDemo tool={tool} />
      </CardFooter>
    </Card>
  )
}



export default ToolItem