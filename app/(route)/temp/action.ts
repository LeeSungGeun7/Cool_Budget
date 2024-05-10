import { date, z } from "zod";
import moment from 'moment';
import { request, gql  } from "graphql-request";







const budgetSchema = z.object({
    description: z.string().min(1),
    amount : z.number(),
    category : z.string({message:"카테고리를 골라주세요"}).min(1),
    date : z.date().optional() ,
    type : z.string()
})

const masterURL = "https://api-ap-northeast-1.hygraph.com/v2/clvj66z0n0s8608w0tjxa3o9f/master";

export async function BudgetFormSend(state : any , formData : FormData) {
    const datas = {
        email : formData.get("email"),
        description : formData.get("description"),
        amount : Number(formData.get("amount")),
        category : formData.get("category"),
        date : moment(formData.get("date")+"",'ddd MMM DD YYYY HH:mm:ss [GMT]Z [(한국 표준시)]').toDate(),
        type : formData.get("type") === "true" ? "income" : "expense"
     } 
    
    const date = moment(datas.date+"", 'ddd MMM DD YYYY HH:mm:ss [GMT]Z [(한국 표준시)]').toDate();
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
              data: {amount: ${datas.amount} , date: "2024-05-03", category: {create: {name: "${datas.category}", type: "${datas.type}"}}, clvuvyv4a0j9h070z6epbaq3r: {connect: {email: "${datas.email}"}}, description: "${datas.description}"}
            ) {
              id
            }
          }
    `;
    
     const result = await request(masterURL , query);    
    if (result) {
        console.log(result);
    }
     }

}