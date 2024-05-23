import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RecoilRootWrapper from "@/components/RecoilWrapper";
import SideBar from "@/components/SideBar";

import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Jua } from "next/font/google";
import { getUserData, userData } from "./(route)/MyPage/action";
import {GET as authOptions } from "./api/auth/[...nextauth]/route";

import "./globals.css";





const inter = Jua({ subsets: ["latin"] , weight: "400" });



export const metadata: Metadata = {
  title: "심플한 가계부",
  description: "개인적인 생활 지출과 수익을 관리하세요. 심플한 기능과 UI",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const getSessionAndProps = async () => {
    const session = await getServerSession(authOptions);
    return {
      props: {
        session,
      },
    };
  };

  const avatar:userData | any = await getUserData();

  const { props } = await getSessionAndProps();
  return (
    <html  lang="en">
      <body className={inter.className} >
        <RecoilRootWrapper>
      
      <Header avatar={avatar && avatar.usermodel?.avatar} session={props.session}/>
        <div className="flex w-screen h-auto">
          <SideBar/>
            {children}
          </div>
          <Footer/>
          </RecoilRootWrapper>
        </body>

    </html>
  );
}
