"use client";
import { auth } from '../../firebase';
import { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router'

import axios from 'axios';

const Signup = () => {
    const [user,userLoading,erro] = useAuthState(auth);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        await fetch("http://localhost:3100/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email , password , username }),
          })
            .then((res) => res.json())
            .then((data) => {
                if(data.status  === 200){
                     signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        console.log("logged In" ,userCredential.user.displayName)
                    })
                    .catch((error) => {console.log("not signed",error)});
                setLoading(false);
                }
                else if(data.status === 400){
                    console.log("UserName already exists");
                }
                else{
                    console.log("Error");
                }




            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };
    
    return (
        <div className="flex flex-col w-60">
        <h1>Expense Log</h1>
        
            <form onSubmit={handleSubmit}
                    className="flex flex-col">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input type="text"
                   placeholder="username" value={username}
                   onChange={(e) => setUsername(e.target.value)}/>
            <button type="submit" disabled={loading}>
                Signup
            </button>
            {error && <p>{error}</p>}
            <a className="text-blue-300" href="/login">Already have an account?</a>
            </form>
        </div>
    );
    }

export default Signup;
