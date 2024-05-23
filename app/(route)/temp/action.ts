"use server"
import {  z } from "zod";
import { request, gql  } from "graphql-request";
import { revalidateTag } from "next/cache";




const budgetSchema = z.object({
    description: z.string().min(1),
    amount : z.number(),
    category : z.string({message:"카테고리를 골라주세요"}).min(1),
    date : z.string().optional() ,
    type : z.string()
})



 const masterURL = "https://api-ap-northeast-1.hygraph.com/v2/clvj66z0n0s8608w0tjxa3o9f/master";

//const masterURL = "https://ap-northeast-1.cdn.hygraph.com/content/clvj66z0n0s8608w0tjxa3o9f/master";

export async function BudgetFormSend(state : any , formData : FormData) {
    const datas = {
        email : formData.get("email"),
        description : formData.get("description"),
        amount : Number(formData.get("amount")),
        category : formData.get("category"),
        date : formData.get("date") || {},
        type : formData.get("type") === "true" ? "income" : "expense"
    } 

    const date = datas.date;


    console.log (date);
    console.log(datas);
    console.log(datas.email);
     const result = budgetSchema.safeParse(datas)
     
     if(!result.success) {
        console.log(result.error.flatten());
        return result.error.flatten();
        
     } else {
        
     const query =  gql`
        mutation MyMutation {
            createTransaction(
              data: {amount: ${datas.amount} , date: "${date}", category: {create: {name: "${datas.category}", type: "${datas.type}"}}, clvuvyv4a0j9h070z6epbaq3r: {connect: {email: "${datas.email}"}}, description: "${datas.description}"}
            ) {
              id,
              category {
                id
              }
            }
          }
    `;


    
     const result:any = await request(masterURL , query);    
    if (result) {
        console.log(result);
        const publishQuery = gql`
        mutation MyMutation {
          publishTransaction(where: {id: "${result.createTransaction.id}"}) {
            id
          }
          publishCategory(where: {id: "${result.createTransaction.category.id}"}) {
            id
          }
        }
      `;
        request(masterURL, publishQuery);


    }
     }
    //  revalidateTag("transaction");

}


export async function DeleteItems(ids:any) {
  for (let i of ids) {
    let s = i.replace(/'/g, "");

    const query = gql`
    mutation MyMutation {
      deleteTransaction(where: {id: "${s}"}) {
        category {
          id
        }
      }
    }
    `;
   const categoryId:{deleteTransaction: {category:{id:string}} } = await request(masterURL,query);
   const cateId = categoryId.deleteTransaction.category.id.replace(/'/g, "");

   if (categoryId) {

   const qr = gql`
   mutation MyMutation {
    deleteCategory(where: {id: "${cateId}"}) {
      id
    }
  }`;
  const res:any = await request(masterURL,qr);

   }
     
  } 
  revalidateTag("transaction");
  return "삭제완료";
}


// 수정 , 갤러리 기능(추가), 
// react - java spring boot 재배포 
// 