'use client';
import './global.css'
import { useRouter } from 'next/navigation'
import { UserProvider } from '@/app/context/UserContext';
export default function RootLayout({ children }) {

  return (
    <html>
      <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Poppins:wght@500&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap" rel="stylesheet" />

      </head>

      
      <body className="font-poppins">
        <UserProvider>
        {children}
        </UserProvider>
      </body>
    </html>
  )
}
