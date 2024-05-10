"use client"
import { RecoilRoot } from "recoil";
import { SessionProvider } from 'next-auth/react';

interface RecoilRootWrapperProps {
	children: React.ReactNode;
}

export default function RecoilRootWrapper({
	children,
}: RecoilRootWrapperProps) {
	return (
		<SessionProvider>
	 	<RecoilRoot>
		{children}
		</RecoilRoot>
		</SessionProvider>
	)
		;


}