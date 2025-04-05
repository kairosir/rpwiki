import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Вики Портал",
  description: "Найдите всю необходимую информацию о наших серверах и игровых функциях",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Перенаправление на главную после авторизации
    if (router.pathname === '/login-success') {
      router.push('/');
    }
  }, [router]);

  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'