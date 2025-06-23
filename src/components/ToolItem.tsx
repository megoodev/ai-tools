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
import { Heart, PenIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { addFavorites, deleteFavorites } from '@/lib/apiCashe/favorite'


const ToolItem = ({ tool }: { tool: Tool }) => {
  const [state, setState] = useState()
  const favorites = useSelector(state => state?.favorites?.favorites)
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
  useEffect(() => {
    favorites.map((favorite: Tool) => {
      if (tool.id !== favorite.id) {
        setState(true)
      } else {
        setState(false)
      }

    })
  }, [favorites])
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
            onClick={() => toggleFavorite(tool?.id)}
          >
            {!state ? < Heart /> : <PenIcon />}

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