'use client';
import {auth} from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

export default function RootLayout({ children }) {

    const [user,loading] = useAuthState(auth);
    useEffect(() => {
        if(loading) return;
        if(!user) window.location.href = "/login";
    },[user,loading])

    
    return (
      <html>
        <head />
        <body>
            <aside>
              <button 
              className='bg-blue-500'
              onClick={(e)=>{
                auth.signOut();
                window.location.href = "/login";
              }}>Logout</button>
            </aside>
            {(loading || !user) ? <h1>loading in</h1> : children}
            </body>
      </html>
    )
  }
  