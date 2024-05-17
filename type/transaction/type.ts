export interface Transaction {
    category: {
      name: string;
      type: string;
    };
    amount: number;
    description: string;
    date: string; // 날짜 형식에 따라 Date 타입으로 변경 가능
  }
  
export interface UserModel {
    transactions: Transaction[];
  }
  
export  interface TransactionData {
    usermodel: UserModel;
}