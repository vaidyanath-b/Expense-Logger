'use client';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

export default function RootLayout({ children }) {

    const [user,loading] = useAuthState(auth);
    useEffect(() => {
        if(loading) return;
        if(user) window.location.href = "/home";
    },[user,loading])
    return (
      <html>
        <head />
        <body>{(loading ) ? <div>Loading</div> : children}</body>
      </html>
    )
  }
  