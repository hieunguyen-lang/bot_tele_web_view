// app/layout.tsx hoặc app/root-layout.tsx (Next.js App Router)

import './styles/globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { AuthProvider } from './context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BillManager',
  description: 'Là hệ thống hỗ trợ quản lý, tổng hợp và tra cứu hóa đơn một cách nhanh chóng và chính xác.',
  icons: {
    icon: '/logo.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.ico" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
