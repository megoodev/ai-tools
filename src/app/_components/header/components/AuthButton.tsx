'use client'
import { Button } from '@/components/ui/button'
import { DoorOpenIcon } from 'lucide-react'
import UserDialog from './UserDialog'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addUser } from '@/utils/rtk/userSlice';

const AuthButton = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user?.user[0]);
  const [isUser, setIsUser] = useState<boolean>(false);
  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    dispatch(addUser(userData));
  }, [dispatch]);

  useEffect(() => {
    setIsUser(!!user);
  }, [user]);

  const router = useRouter();

  return (
    <div>
      {isUser ? (
        <UserDialog />
      ) : (
        <Button 
          onClick={() => router.push('/login')} 
          variant='secondary' 
          className='cursor-pointer rounded-sm'
        >
          <DoorOpenIcon />
        </Button>
      )}
    </div>
  );
};

export default AuthButton;
