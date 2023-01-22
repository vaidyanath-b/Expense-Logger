'use client'
import {auth} from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import {useState} from 'react';
import { useUser } from '@/app/context/UserContext';

export default function Login() {
    const {user,setUser} = useUser();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("logged In" ,userCredential.user.displayName)
            })
            .catch((error) => {console.log("not signed",error)});
    };

    return (
        <div className="flex sm:h-screen font-poppins  flex-col p-[12px] align-middle gap-3 bg-slate-300 justify-center items-center">
            <form onSubmit={handleSubmit}
                    className="flex flex-col gap-9 p-10 text-[22px] w-max border-2 rounded-xl border-black items-center">
            <h1 className="font-bold text-[28px] tracking-wider ">LOGIN</h1>
            <div className="flex font-poppins gap-4 items-center">
                <label className=" font-[400] drop-shadow-lg w-[8rem]  ">Email</label>
                <input  
                type="email"    
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md border-2 border-black px-2 py-1 w-[15rem] text-[15px] focus:outline-none focus:border-sky-500 focus:ring-1 focus-ring-sky-500 invalid:border-red-400"
                />
            </div>
              <div className="flex font-poppins gap-4 items-center">
                <label className=" font-[400] drop-shadow-lg w-[8rem] ">Password</label>
                <input  
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md border-2 border-black px-2 py-1 w-[15rem] text-[15px] focus:outline-none focus:border-sky-500 focus:ring-1 focus-ring-sky-500 invalid:border-red-400"
                />
            </div>
            <button type="submit"
                    className="w-full  bg-[#00172d] text-white rounded-md px-4 py-2 font-[400] text-[15px] hover:bg-transparent hover:text-[#00172d] border-2 border-[#00172d]"
            >
                Login
            </button>
            <a className="text-[#00172d] text-[15px] self-end " href="/signup">Do not have an account?</a>
            </form>
        </div>
    );
}

            
