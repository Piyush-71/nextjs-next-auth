import {connect} from '@/dbconfig/dbconfig'
import User from '@/models/userModels'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendMail } from '@/helpers/mailer'

connect()

export async function POST(request: NextRequest) {
    try {
      const reqBody = await request.json();
      const { username, email, password } = reqBody;
      // validation
      console.log(reqBody);
      const user = await User.findOne({ email });
      if (user) {
        NextResponse.json({ error: "user already exists" }, { status: 400 });
      }
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
  
      const newUser = await new User({
        username,
        email,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();
      console.log(savedUser);
      await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });
      return NextResponse.json({
        message: "User created successfully",
        success: true,
        savedUser,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }