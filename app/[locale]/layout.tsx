import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import "./globals.css";
import { locales } from "@/i18n.config";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  	title: "Kanban",
	description: "Kanban",
};

export function generateStaticParams() {
	return locales.map((locale) => ({locale}));
}
 
export default async function RootLayout({
	children,
	params: {locale}
}: {
	children: React.ReactNode;
	params: {locale: string};
}) {
	unstable_setRequestLocale(locale);
	const messages = await getMessages();
	
	return (
		<html lang={locale}>
			<body className={inter.className}>
				<NextIntlClientProvider messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}