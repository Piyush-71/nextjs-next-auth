'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'




export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      setButtonDisabled(true)
      const response = await axios.post('/api/user/signup', user)
      console.log(response)
      console.log("signup success", response.data)
      router.push('/login')

    } catch (error:any) {
      console.log("signup failed")
      toast.error(error.message)
      setButtonDisabled(true)
    }
  }

  useEffect(() => {
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  }, [user])



  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1>{loading ? 'processing...' : 'Signup'}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input 
      placeholder='username'
      className='p-2 rounded-lg mb-4 border-gray-600 focus:outline-none focus:border-gray-600 text-black'
      value={user.username}
      onChange={(e)=>setUser({...user, username:e.target.value})}
      type="text" />
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
      onClick={onSignup}
      >
        {buttonDisabled ? 'No Signup': 'Signup'}
      </button>
      <Link href='/login'>Visit Login Page</Link>
    </div>
  )
}
