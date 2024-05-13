import type { Metadata } from "next";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import { locales } from "@/i18n.config";
import "@/styles/globals.css";
import { inter } from "@/constants/fonts";
import { Toaster } from "@/components/ui/toaster";


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
				<Toaster />
			</body>
		</html>
	);
}