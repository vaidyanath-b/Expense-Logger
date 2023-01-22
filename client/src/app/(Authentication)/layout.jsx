'use client';
import { auth } from '../firebase';
import{useRouter} from 'next/navigation';

import { useUser } from '../context/UserContext';

export default function RootLayout({ children }) {
    const {user} = useUser();
    console.log("user",user);
    const router = useRouter();
    if (user)  return router.push('/home');
    return (
      <div>{children}</div>
    )
  }
  