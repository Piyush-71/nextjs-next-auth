'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      setButtonDisabled(true)
      const response = await axios.post('/api/user/login', user)
      console.log(response)
      console.log("login success", response.data)
      router.push('/profile')

    } catch (error:any) {
      console.log("login failed")
      toast.error(error.message)
      setButtonDisabled(true)
    }
  }

  useEffect(() => {
    if(user.email.length>0 && user.password.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  }, [user])



  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <hr />
      <label htmlFor="email">Email</label>
      <input 
      placeholder='Email'
      className='p-2 border rounded-lg mb-4 border-gray-600 focus:outline-none focus:border-gray-600 text-black'
      value={user.email}
      onChange={(e)=>setUser({...user, email:e.target.value})}
      type="text" />
      <hr />
      <label htmlFor="password">password</label>
      <input 
      placeholder='password'
      className='p-2 rounded-lg mb-4 border-gray-600 focus:outline-none focus:border-gray-600 text-black'
      value={user.password}
      onChange={(e)=>setUser({...user, password:e.target.value})}
      type="text" />
      <button
      className='p-2 border rounded-lg mb-4 border-gray-600 focus:outline-none focus:border-gray-600'
      onClick={onLogin}
      >
        {buttonDisabled ? 'No Login': 'Login'}
      </button>
      <Link href='/profile'>Visit Profile Page</Link>
    </div>
  )
}
