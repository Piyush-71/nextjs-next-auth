import {connect} from '@/dbconfig/dbconfig'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function GET(request: NextRequest) {
    try {
      const response = NextResponse.json({
        message: "Logout successfully",
        success: true,
      });
      response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      console.log(response.cookies)
      return response;
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }