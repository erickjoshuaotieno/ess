// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from '@/components/LoadingScreen';
import { NavigationProvider } from '@/components/NavigationContext';

// Using Inter as a clean, modern sans-serif font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Emmanuel Senior School | Learn to Love, Love to Learn",
  description: "A Christ-centered center of excellence nurturing holistic, competent, and morally upright learners who transform society through faith, knowledge, and service.",
  keywords: ["Emmanuel Senior School", "Maragua", "CDM Emmanuel Schools", "Boarding School", "Grade 10", "Kenya Education"],
  authors: [{ name: "Emmanuel Senior School" }],
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://emmanuelsenior.sc.ke",
    title: "Emmanuel Senior School",
    description: "Learn to love, love to learn",
    siteName: "Emmanuel Senior School",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#8B0000" />

        {/* Viewport for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`font-sans antialiased bg-white text-gray-900`}>
        {/* Navigation */}
        <Navbar />
        <NavigationProvider>
          <LoadingScreen>

        <main className="min-h-screen pt-16 md:pt-20">
          {children}
        </main>
        </LoadingScreen>
        </NavigationProvider>

       <Footer/>

        {/* Smooth scrolling for anchor links */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                  anchor.addEventListener('click', function (e) {
                    const href = this.getAttribute('href');
                    if (href !== '#') {
                      e.preventDefault();
                      const target = document.querySelector(href);
                      if (target) {
                        target.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }
                    }
                  });
                });
              });
            `,
          }}
        />
      </body>
    </html>
  );
}