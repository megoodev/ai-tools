'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import MainHeading from '@/components/MainHeading'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '@/utils/rtk/userSlice'
import axios from 'axios'
import { toast } from 'sonner';




const LoginForm = () => {
  const [emailAddress, SetEmailAddress] = useState('')
  const [password, SetPassword] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user[0])
  useEffect(()=> {
    if (user) {
      router.replace('/')
    }
  }, [user, router])
  const handleAxiosLogin = async (e: FormEvent) => {
    e.preventDefault()
      await axios.post('/api/auth/sign-in', {
        email: emailAddress,
        password: password
      }).then((res) => {
        if (res.data.error) {
          toast.error(res.data.error)
          return console.error(res.data.error)
        }
        toast.success('Welcome To Our Website')
        localStorage.setItem('user', JSON.stringify(res.data.user))
        dispatch(addUser(JSON.parse(localStorage.getItem('user'))))
        router.push('/')
      }).catch((error) => {
        console.error(error.data.error)
      })
  }
  return (
    <form onSubmit={(e) => {
      handleAxiosLogin(e)
    }} className='w-[500px] rounded-2xl bg-accent p-10 flex flex-col gap-5 -mt-15'>

      <MainHeading title={'Login'} />

      <div>
        <label htmlFor="email">Email:</label>
        <Input autoComplete='off' onChange={(e) => SetEmailAddress(e.target.value)} id='email' type="email" placeholder='Email' />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <Input autoComplete='off' onChange={(e) => SetPassword(e.target.value)} id='password' type="password" placeholder='Password' />
      </div>
      <Button className='cursor-pointer' type='submit' >Submit</Button>
      <div>
        <p className="capitalize">if you not have Email? you can create Email from <Link className='underline' href={'/signup'}>Here!</Link></p>
      </div>
    </form>
  )
}

export default LoginForm