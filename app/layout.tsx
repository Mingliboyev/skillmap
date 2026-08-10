import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title:{default:"SkillMap Uzbekistan",template:"%s · SkillMap Uzbekistan"},description:"Bilingual digital skills intelligence for students and education leaders." };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) { return <html lang="uz"><body>{children}</body></html> }
