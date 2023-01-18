'use client';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import{useRouter} from 'next/navigation';

export default function RootLayout({ children }) {
    const router = useRouter();
    const [user,loading] = useAuthState(auth);
    useEffect(() => {
        if(loading) return;
        if(user) router.push('/home');
    },[user,loading])
    return (
      <div>{(loading ) ? <div>Loading</div> : children}</div>
    )
  }
  