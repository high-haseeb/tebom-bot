import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export const metadata: Metadata = {
    title: "Insurance Bot",
    description: "made by high-haseeb",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const locale = await getLocale();
    const messages = await getMessages();
    return (
        <html lang="en">
            <body className={`${inter.variable} antialiased`} >
                <NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider>
            </body>
        </html>
    );
}
