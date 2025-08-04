import "./globals.css";
import { Lexend } from "next/font/google";

export const lexend = Lexend({
    weight: ["400"],
    subsets: ["latin"]
});

export default function RootLayout({ children }) {
    return (
        <>
            <html lang="en">
                <body className={lexend.className}>
                    {children}
                </body>
            </html>
        </>
    );
}