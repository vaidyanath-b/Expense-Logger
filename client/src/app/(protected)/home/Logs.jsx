    "use client";
    import { useState } from "react";
    function Log () {
        const [log,setLog] = useState({});
        return (
            <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between gap-3">
                    <input  name="date"
                            value={log.date}
                            onChange={(e) =>{
                                setLog({...log, date: e.target.value})  
                            }}    
                            
                            className="px-1 text-[15px] "
                            type="date" />  
                    <input name="time"
                            type="time"
                            value={log.time}
                            onChange={(e) =>{
                                setLog({...log, time: e.target.value })  
                                                    }}                        className="px-1 text-[15px] " /> 
                </div>
                <input type="text" 
                        name="title"
                        value={log.title}
                        onChange={(e)=>{
                            setLog({...log, title: e.target.value})  
                                            }}                    className="px-1 text-[15px] " />
                <div className="flex flex-row gap-2">
                        <select name="type" id="ToP" value={log.type} 
                            onChange={(e)=>{
                                setLog({...log, type: e.target.value})
                                                    }}                        >
                            <option value="paid">Paid</option>
                            <option value="borrowed">Borrowed</option>
                        </select>
                        <div className="flex flex-col">
                            <input type="text"
                                name="category"
                                value={log.category}
                                onChange={(e)=>{
                                    setLog({...log, category: e.target.value})  
                                                            }}                            className="px-1 text-[15px] " />
                        
                            <div className="flex flex-col">
                            {/* {searchCategory(log.category).map((category) => (
                                
                                    <label>{category}</label>
                            ))} */}
                            </div>
                        </div>
                        <input type="text"
                                name="amount"
                                value={log.amount}
                                onChange={(e)=>{
                                    setLog({...log, amount: e.target.value}) 
                                                            }}                            />
                </div>
                <div className="flex flex-row justify-between">
                    <button>Add Details</button>
                    <button>add Photo</button>
                    <button>split?</button>
                </div>
            </div>
        )
    }
                        

    export default function AddLog() {
        const [logs, setLogs] = useState([{}]); 
        return (
            <div className="flex flex-col p-2 order-2">

                { console.log("logs")}
                {logs.map((log,i) => (
                    <Log key={i}/>
                ))}
                <div >
                    
                    <button className="mx-2 bg-slate-700 px-1 text-green-300"
                            onClick={() => setLogs([...logs,{}])}
                    > Add log +</button>
                </div>

                <button onClick={(e)=>{
                    e.preventDefault();
                    console.log(logs);
                }}>click for data</button>
            
            </div>
        )
    }