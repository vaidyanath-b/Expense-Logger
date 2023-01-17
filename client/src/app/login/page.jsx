"use client";
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router'

import axios from 'axios';

const Login = () => {
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
    
    const handleLogout = async () => {
        try {
        await auth.signOut();
        } catch (error) {
        setError(error.message);
        }
    };
    
    return (
        <div className="login">
        <h1>Expense Log</h1>
        {user ? (
            <>
            <button onClick={handleLogout}>Logout</button>
            <h2>Welcome {user.email}</h2>
            </>
        ) : (
            <form onSubmit={handleSubmit}>
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
            <button type="submit" disabled={loading}>
                Login
            </button>

            <input type="text"
                   placeholder="username" value={username}
                   onChange={(e) => setUsername(e.target.value)}/>
            {error && <p>{error}</p>}
            </form>
        )}
        </div>
    );
    }

export default Login;
