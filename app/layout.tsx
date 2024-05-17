import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RecoilRootWrapper from "@/components/RecoilWrapper";
import SideBar from "@/components/SideBar";
import type { Metadata } from "next";
import { Jua } from "next/font/google";
import "./globals.css";





const inter = Jua({ subsets: ["latin"] , weight: "400" });



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  lang="en">
      <body className={inter.className} >
        <RecoilRootWrapper>
      <Header/>
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
