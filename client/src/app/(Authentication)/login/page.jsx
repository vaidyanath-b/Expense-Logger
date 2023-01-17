import Hero from "../Hero";
import LoginBox from "./LoginBox";

export default function Page () {
    return (
        <div className = "grid md:grid-cols-[2fr,2fr] bg-[#36454F] md:h-screen">           
            <Hero />
            <LoginBox />
            
        </div>
    );
}