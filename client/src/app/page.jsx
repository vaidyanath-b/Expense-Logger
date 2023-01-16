import Hey from './left.jsx'

export default function Page() {
    return (
        <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-[2fr,3fr,2fr] ">
        <Hey className=""/>
        <h1 className="h-screen">Page</h1>
        <h1 className = "h-screen">right</h1>
        </div>
    );
}
