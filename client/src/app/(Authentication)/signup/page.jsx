import SignupBox from "./SignupBox";
import Hero from "../Hero";

export default function Page () {
    return (
        <div className = "grid md:grid-cols-[2fr,2fr] bg-[#00172D] md:h-screen">           
            <Hero />
            <SignupBox />
            
        </div>
    );
}