import { TransactionData } from "@/type/transaction/type";
import { gql, request } from "graphql-request";
import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server";



import { GET as GetAuth } from "../auth/[...nextauth]/route"

export interface Session {
    user:{
        email : string,
        id: any,
    } 
} 

export interface Props {
  type : any ;
  month?: any
  endMonth? : any
}


const masterURL = "https://api-ap-northeast-1.hygraph.com/v2/clvj66z0n0s8608w0tjxa3o9f/master"

export async function POST(req:NextRequest) {
  const session:Session | null = await getServerSession(GetAuth)

  const body =  await req.json();  
  
  
  const { type , month , endMonth }:Props  = body

 

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
            id
          }
    }  
    }
    `;

  const add:TransactionData = await request(masterURL as string,query);    
  
  //return NextResponse.json({ message: `${add?.usermodel?.transactions}` })
  //const res = JSON.stringify(add.usermodel.transactions);
  console.log(JSON.stringify(add)+"<<<받아온데이터");  
    
  return NextResponse.json(add.usermodel.transactions);
  }


  if (!session) {
    return
    // return NextResponse.json({ message: `인증 되지 않은 사용자 입니다.` ,ok:false} )
  }
  
}



// export  async function GET(res:NextRequest) {
//     const session:Session | null = await getServerSession(GetAuth)
//     if (session) {
//         return 
//         return NextResponse.json({ message: `인증 사용자 입니다.` } )
//     }
//     if (!session) {
//       return
//         return NextResponse.json({ message: `인증 되지 않은 사용자 입니다.` } )
//     }
      
//     return res;
// }









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