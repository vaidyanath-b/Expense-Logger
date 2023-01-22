"use client"
import { useUser } from "@/app/context/UserContext";

export default function Page() {
    const { user, setUser } = useUser();
    return (
        <div>
            <h1>Home</h1>
            <h2>{user}</h2>
            <button
                onClick={() => {
                    setUser("hi");
                }}
            >HI</button>
        </div>
    )
}