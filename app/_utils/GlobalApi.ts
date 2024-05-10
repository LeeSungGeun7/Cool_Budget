"use server"
import { request, gql } from "graphql-request";

//const masterURL = `https://api-ap-northeast-1.hygraph.com/v2/${process.env.NEXT_PUBLIC_HY_API_KEY}/master`;

const masterURL = "https://api-ap-northeast-1.hygraph.com/v2/clvj66z0n0s8608w0tjxa3o9f/master";

interface UserModel {
    password: string;
  }
  
  interface Data {
    usermodel: UserModel ;
  }


const FormLogin = async (email: string, password: string) => {
    const query = gql`
    query Assets {
        usermodel(where: {email: "${email}"}) {
          password
        }
      }      
    `;  
    const data:Data = await request(masterURL, query);
  //  const usermodel = data?.usermodel;

     console.log(data+"<<<<<");
  
  //   if (usermodel && usermodel.password) {
  //     return usermodel.password === password;
  //   }
  
    return false;
  };
export default FormLogin;