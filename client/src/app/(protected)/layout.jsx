'use client';
import {auth} from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import {useRouter} from 'next/navigation';
import NavBar from "@/components/NavBar";
export default function RootLayout({ children }) {

    const router = useRouter();
  const [user,loading] = useAuthState(auth);
    useEffect(() => {
        if(loading) return;
        if(!user) router.push('/login')
      
    },[user,loading])

    if(loading || !user) return <h1>loading in</h1>
    return (
          <div>
            <NavBar />
            { children}
          </div>
    )
  }
  