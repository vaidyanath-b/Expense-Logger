import Hey from './left.jsx'
import Home from './Right'

export default function Page() {
    return (
        <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-[2fr,3fr,2fr] ">
        <Hey className=""/>
        <Home />
        <h1 className = "h-screen">right</h1>
        </div>
    );
}
