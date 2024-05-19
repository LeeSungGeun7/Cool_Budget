import { TransactionData } from "@/type/transaction/type";
import { JsonObject, JsonValue } from "@prisma/client/runtime/library";
import { gql, request } from "graphql-request";
import moment, { Moment } from "moment";
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"

import { NextRequest, NextResponse } from "next/server";


import { GET as GetAuth } from "../auth/[...nextauth]/route"

interface Session {
    user:{
        email : string
    } 
} 

interface Props {
  type : any ;
  month?: any
  endMonth? : any
}


const masterURL = "https://api-ap-northeast-1.hygraph.com/v2/clvj66z0n0s8608w0tjxa3o9f/master"

export async function POST(req:NextRequest,res:any) {
  const session:Session | null = await getServerSession(GetAuth)
  
  const body =  await req.json();  
  
  console.log(body+"<<<<<<<<<<<<<<<<")
  
  const { type , month , endMonth }:Props  = body

  console.log(month,endMonth);  

  if (session) {
    const query = gql`  
    query MyQuery {
      usermodel(where: {email: "${session.user.email}"}) {
        transactions(
            where: {    
          date_gte: "${month}"
          date_lte: "${endMonth}"
          category: {type: "${type? type : "expense"}"}
          }
          orderBy: amount_DESC
          ) {
            category {
              name
              type
            }
            amount
            description
            date
          }
    }  
    }
    `;

  const add:TransactionData = await request(masterURL as string,query);    
  
  //return NextResponse.json({ message: `${add?.usermodel?.transactions}` })
  const res = JSON.stringify(add.usermodel.transactions);
  console.log(res);

  return NextResponse.json(add.usermodel.transactions);
  }


  if (!session) {
    return NextResponse.json({ message: `인증 되지 않은 사용자 입니다.` } )
  }
  
}



export  async function GET(res:NextApiRequest) {
    const session:Session | null = await getServerSession(GetAuth)
    if (session) {
        return NextResponse.json({ message: `인증 사용자 입니다.` } )
    }
    if (!session) {
        return NextResponse.json({ message: `인증 되지 않은 사용자 입니다.` } )
    }
      
    return res;
}









// query MyQuery {
//   usermodel(where: {email: "${session.user.email}"}) {
//     transactions(where: {category: {type: "${type? type : "expense"}"}}) {
//       category {
//         name
//         type
//       }
//       amount
//       description
//       date
//     }
//   }  
// }