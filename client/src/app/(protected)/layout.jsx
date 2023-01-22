'use client';

import { useUser } from '../context/UserContext';
import {useRouter} from 'next/navigation';
import NavBar from "@/components/NavBar";
export default function RootLayout({ children }) {

    const router = useRouter();
    const {user} = useUser();
    if(!user) return router.push('/login');
    return (
          <div>
            <NavBar />
            { children}
          </div>
    )
  }
  