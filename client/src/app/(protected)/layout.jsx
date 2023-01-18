'use client';
import {auth} from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import {useRouter} from 'next/navigation';
export default function RootLayout({ children }) {

    const router = useRouter();
  const [user,loading] = useAuthState(auth);
    useEffect(() => {
        if(loading) return;
        if(!user) router.push('/login')
      
    },[user,loading])

    
    return (
          <div>
            <aside>
              <button 
              className='bg-blue-500'
              onClick={(e)=>{
                auth.signOut();
                router.push('/login')
              }}>Logout</button>
            </aside>
            {(loading || !user) ? <h1>loading in</h1> : children}
            </div>
    )
  }
  