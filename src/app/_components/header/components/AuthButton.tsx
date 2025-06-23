'use client'
import { Button } from '@/components/ui/button'
import { DoorOpenIcon } from 'lucide-react'
import UserDialog from './UserDialog'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser } from '@/utils/rtk/userSlice';

const AuthButton = () => {
  const despatch = useDispatch()
  const user = useSelector(state => state?.user?.user[0])

  useEffect(() => {
    despatch(addUser(JSON.parse(localStorage.getItem('user'))))
  }, [user])
  const router = useRouter()
  return (
    <div>
      {
        user ? <UserDialog /> : <Button onClick={() => router.push('/login')} variant='secondary' className='cursor-pointer rounded-sm'><DoorOpenIcon /></Button>
      }
    </div>
  )
}

export default AuthButton