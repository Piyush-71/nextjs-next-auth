import {connect} from '@/dbconfig/dbconfig'
import User from '@/models/userModels'
import { NextRequest, NextResponse } from 'next/server'


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody

        const user = await User.findOne(
            {
                verifyToken: token,
                verifyTokenExpiry: { $gt: Date.now() },
            })

        if(!user) {
            return NextResponse.json({error: 'Invalid or expired token'},{status: 400})
        }
        console.log(user)
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        const updateUser = await user.save()

        return NextResponse.json(
            {message: 'Email verified successfully',
            success: true,
            updateUser
        },  {status: 200})


    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}