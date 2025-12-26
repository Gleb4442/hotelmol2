import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-poppins"
});

export const metadata: Metadata = {
    title: "Hotelmol - AI Solutions for Hotels",
    description: "Advanced AI solutions for the hospitality industry.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
