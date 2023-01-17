'use client'
import {auth} from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import {useState} from 'react';

export default function Login() {
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

return(
    <form className='flex flex-col w-48' >
    <input type="text" value={email} 
    placeholder="Email"
    onChange={(e)=>{
        setEmail(e.target.value);
    }} />
    <input type="password" 
            placeholder="Password"
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value);
            }
            } />
    <button onClick={(e)=>{
        handleSubmit(e);
    }}>Login</button>
    <a href='/signup'>Do not have an account?</a>
    </form>
)

}
            
