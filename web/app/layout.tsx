import type { Metadata } from "next";
import { Syne, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// Display / heading font — geometric, bold, distinctive
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
});

// Body font — clean, legible
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

// Code / mono font
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SpamSentry - AI-Powered Message Intelligence",
  description:
    "Real-time spam detection powered by machine learning. Paste a message and get an instant verdict.",
  authors: [{ name: "Utsav Jaiswal", url: "https://www.masterutsav.in" }, { name: "GitHub Repo", url: "https://github.com/Master-utsav/ML_2_Email_Spam_detection" } , { name: "LinkedIn", url: "https://www.linkedin.com/in/master-utsav" }, { name: "Twitter", url: "https://x.com/masterutsav01" },  {name: "Master Utsav", url: "https://www.masterutsav.in" }, ],

  openGraph: {
    title: "SpamSentry - AI-Powered Message Intelligence",
    description:
      "Real-time spam detection powered by machine learning.",
    url: process.env.DOMAIN! || "http://localhost:3000",
    siteName: "SpamSentry",
    images: [
      {
        url: "/images/screen_main.png", // main preview
        width: 1200,
        height: 630,
        alt: "SpamSentry App UI",
      }
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SpamSentry - AI-Powered Message Intelligence",
    description:
      "Real-time spam detection powered by machine learning.",
    images: ["/images/screen_main.png"],
  },

  metadataBase: new URL(process.env.DOMAIN! || "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
       <ThemeProvider> {children}</ThemeProvider>
      </body>
    </html>
  );
}