'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import MainHeading from "@/components/MainHeading"
import Link from "next/link"
import axios from "axios"
import { useSelector } from "react-redux"
import { toast } from "sonner"


const SignUpForm = () => {
  const user = useSelector(state => state.user.user[0])
  useEffect(() => {
    if (user) {
      router.replace('/')
    }
  }, [user])
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()



  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    axios.post('api/auth/register', {
      username,
      email,
      password
    }).then((res) => {
      toast.success(res.data.msg)
      router.push('login')
    }).catch((error) => {
      console.error(error)
    })
  }
  return (
    <form onSubmit={handleSubmit} className='w-[500px] rounded-2xl bg-accent p-10 flex flex-col gap-5 -mt-15 '>
      <MainHeading title={'Sign Up'} />
      <div>
        <label className="font-semibold mb-5" htmlFor="username">username:</label>
        <Input autoComplete='off' onChange={(e) => setUsername(e.target.value)} id='username' type="text" placeholder='username' />
      </div>
      <div>
        <label className="font-semibold mb-5" htmlFor="email">Email:</label>
        <Input autoComplete='off' onChange={(e) => setEmail(e.target.value)} id='email' type="email" placeholder='Email' />
      </div>
      <div>
        <label className="font-semibold" htmlFor="password">Password:</label>
        <Input autoComplete='off' onChange={(e) => setPassword(e.target.value)} id='password' type="password" placeholder='Password' />
      </div>
      <Button className="cursor-pointer" type='submit' >Submit</Button>
      <div>
        <p className="capitalize">already have an account? you can sign in from <Link className='underline' href={'/login'}>Here!</Link></p>
      </div>
    </form>
  )
}


export default SignUpForm