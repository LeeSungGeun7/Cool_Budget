"use server"
import { request, gql } from "graphql-request";


const masterURL = "https://api-ap-northeast-1.hygraph.com/v2/clvj66z0n0s8608w0tjxa3o9f/master";


  
  export interface Data {
    usermodel: any
  }

export const socialRegister = async (email:string,avatar:string,userType:string) => {
    const isExist = await isExistUser(email)
    console.log(isExist+"<<<존재");
    if (isExist) {
        return
    }

    const query = gql`
    mutation MyMutation {
        createUsermodel(data: {email: "${email}", avatar: "${avatar}", userType: "${userType}" , password:"none222"}){
            id
        }
    }
    `
    const responseId:any = await request(masterURL , query)


    if (responseId.createUsermodel.id) {
    const publishQuery = gql`
    mutation MyMutation {
        publishUsermodel(where: { id: "${responseId.createUsermodel.id}" }) {
            id
        }
    }
    `
    await request(masterURL, publishQuery);
    }
    

}




export const isExistUser = async (email:string) => {

    const qr = gql`
    query MyQuery {
        usermodel(where: {email: "${email}"}) {
          id
        }
      }
    ` 
   const res:Data =  await request(masterURL,qr) 
   if (res.usermodel !== null) {
        return true
   }   
   return false;
}



