import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import redis from '../../../lib/redis';

export async function POST(request:NextRequest) {
  const { email } = await request.json();

  // 인증 코드 생성
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  // 인증 코드를 Redis에 저장 (유효기간 5분)
  await redis.set(email, verificationCode, 'EX', 300);
  
  const res = await redis.get(email) 
  if (res ) {
    console.log(res+"<<<<인증코드");
  }
  
  // 이메일 발송
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "sungkeno3o@gmail.com",
      pass: "bxjc kjjg uxmy jmhk",
    },
  });

  const mailOptions = {
    from: "sungkeno3o@gmail.com",
    to:  email ,
    subject: 'Email Verification Code',
    text: `인증 코드 : ${verificationCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Verification code sent' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Error sending verification code' }), {
      status: 500,
    });
  }
}