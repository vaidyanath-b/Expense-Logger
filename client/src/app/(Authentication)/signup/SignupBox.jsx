"use client";
import { auth } from "../../firebase";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignupBox() {
  const [user, userLoading, erro] = useAuthState(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("http://localhost:3100/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              console.log("logged In", userCredential.user.displayName);
            })
            .catch((error) => {
              console.log("not signed", error);
            });
          setLoading(false);
        } else if (data.status === 400) {
          console.log("UserName already exists");
        } else {
          console.log("Error");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="flex sm:h-screen font-poppins  flex-col p-[12px] align-middle gap-3 bg-slate-300 justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-9 p-10 text-[22px] w-max border-2 rounded-xl border-black items-center"
      >
        <h1 className="font-bold text-[28px] tracking-wider">Create Account</h1>
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
          <label className=" font-[400] drop-shadow-lg w-[8rem] ">
            Username
          </label>
          <input
            type="name"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-md border-2 border-black px-2 py-1 w-[15rem] text-[15px] focus:outline-none focus:border-sky-500 focus:ring-1 focus-ring-sky-500 invalid:border-red-400"
          />
        </div>
        <div className="flex font-poppins gap-4 items-center">
          <label className=" font-[400] drop-shadow-lg w-[8rem] ">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border-2 border-black px-2 py-1 w-[15rem] text-[15px] focus:outline-none focus:border-sky-500 focus:ring-1 focus-ring-sky-500 invalid:border-red-400"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full  bg-[#00172d] text-white rounded-md px-4 py-2 font-[400] text-[15px] hover:bg-transparent hover:text-[#00172d] border-2 border-[#00172d]"
        >
          Signup
        </button>
        {error && <p>{error}</p>}
        <a className="text-[#00172d] text-[15px] self-start " href="/login">
          Already have an account?
        </a>
      </form>
    </div>
  );
}
