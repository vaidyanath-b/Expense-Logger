    "use client";



import { useUser } from "@/app/context/UserContext";
import { db } from "@/app/firebase";
import {collection , doc ,} from "firebase/firestore";    
    const categories = ["food","transport","entertainment","shopping","bills","other"];
    const friends = ["Adrian","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    const friendsoptions = friends.map((friend) => {
        return {
            value: friend,
            label: friend,
        }
    })
    


    import { useState } from "react";
    import Select from "react-select";
    function Log () {
        const {user} = useUser();
        const [log,setLog] = useState({});
        const [split,setSplit] = useState(false);
        const [displaySplit,setDisplaySplit] = useState(false);
        const [displayCategory,setDisplayCategory] = useState(false);
        const [group,setGroup] = useState([[user.username,0]]);

    
    function checkSplit (){

        let sum = 0;
        for(let person of group){
            sum += person[1];
        }
        if(sum === log.amount)
            return true;
        else return false;

    }
    // const searchCategory = (category) => {
    //     const categories = ["food","transport","entertainment","shopping","bills","other"];
    //     return categories.filter((cat) => {
    //         const regex = new RegExp(`^${category}`,"gi");
    //         return cat.match(regex) 
            
    //     })
    // }
        const Owe = () => {

            return (
                <div className="flex flex-col gap-2 w-full">
                {
                    group.map((person,index) => {

                        let peramount = person[1];
                        return(
                        <div className="flex flex-row w-full">
                        <div className="w-[100px] text-center">{person[0]}</div>
                        <input type="text"
                                value={person[1]}
                                onChange={(e) => {

                                    setGroup([...group.slice(0,index),[person[0],e.target.value],...group.slice(index+1)]);
                                }}


                                
                        />
                        </div>
                        )
                }
            )}
                </div>
            )
        }
                
        const [person,setPerson] = useState();
  
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(log,group);
        }
        return (
            <div className="flex flex-col gap-2 pt-5 pb-10">
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
                        placeholder="Title"
                        value={log.title}
                        onChange={(e)=>{
                            setLog({...log, title: e.target.value})  
                                            }}                    className="px-1 text-[15px] " />
                <div className="flex flex-row gap-2 ">
                        <select name="type" id="ToP" value={log.type} 
                            onChange={(e)=>{
                                setLog({...log, type: e.target.value})
                                                    }}                        >
                            <option value="paid">Paid</option>
                            <option value="borrowed">Borrowed</option>
                        </select>
                        <div className="flex flex-col">
                            <input list="data"
                                name="category"
                                placeholder="Category"
                                value={log.category}
                                onChange={(e)=>{
                                    setLog({...log, category: e.target.value}) 
                                                            }}                            
                                className="px-1 text-[15px] " />
                            <datalist id="data">
                                {categories.map((cat,i)=>{
                                    return <option key={i} value={cat} />
                                }
                                )}
                            </datalist>

                   
                        </div>
                        <input type="text"
                                name="amount"
                                placeholder="Amount"
                                value={log.amount}
                                onChange={(e)=>{
                                    setLog({...log, amount: e.target.value})
                                    for(let person of group){
                                        person[1] = e.target.value/group.length;
                                    }
                                }} />
                </div>
                <div className= {`${displaySplit ? "flex flex-row" : "hidden"} gap-2 `}>
                       

                        <Select
                            className="w-40"
                            placeholder="add person"
                            options={friendsoptions}
                            value={person}
                            onChange={(e)=>{
                                setPerson(e.value)                                    
                                if(!group.includes(e.value)){
                                    const newItem = [e.value,0];
                                    setGroup([...group,newItem])
                                    setPerson("");         
                                }
                                
                            }}
                            noOptionsMessage={() => "No matching friends"}
                            
                        />
                         {group.map((person,i)=>{
                            return (
                                <button key={i} className="flex pl-1 gap-3 justify-between bg-yellow-300 text-black rounded-3xl  px-[3px] items-center"
                                        onClick={(e)=>{
                                            const newGroup = group.filter((item) => {
                                                return item[0] !== person[0]
                                            })
                                            setGroup(newGroup);
                                        }
                                        }>
                                    <p>{person[0]}</p>
                                    <p className=" px-[3px]" >x</p>
                                </button>
                            )
                        })}

                       
     
                        {/* <input  placeholder="add person"
                                list="friends"
                                value={person}
                                onChange={(e)=>{{setPerson(e.target.value)}
                                }}
                                onClick ={(e)=>{
                                    if(!group.includes(person) && friends.includes(person)){
                                        setGroup([...group,e.target.value])
                                        setPerson("");
                                    }
                                }}
                                
                        /> */}
                        {/* <datalist id="friends">
                            {friends.map((friend,i)=>{
                                return <option 
                                        key={i}
                                        value={friend}
                                    
                                 />
                            }
                            )}
                        </datalist> */}
                         </div>
                         <div className= {`${displaySplit ? "flex flex-col" : "hidden"} gap-2`}>
                        <Owe />
                        </div>
                <div className="flex flex-row gap-4 gap-y-8 px-2">
                    <button>Add Details</button>
                    <button>add Photo</button>
                    <div className="flex flex-col"><button onClick={(e)=>setDisplaySplit(true)}>split?</button>

                    </div>
                <button 

            className="bg-slate-700 px-1 text-green-300 ml-auto "
            onClick={handleSubmit}
                >
                    Submit
                </button>
                </div>
            </div>
        )
    }
                        

    export default function AddLog() {
        const [logs, setLogs] = useState([]); 
        return (
            <div className="flex flex-col p-2 order-2">
                {logs && logs.map((log,i) => (
                    <Log key={i}/>
                ))}
                <div >
                    
                    <button className="mx-2 bg-slate-700 text-green-300"
                            onClick={() => setLogs([...logs,{}])}
                    > Add log +</button>
                </div>

                <button onClick={(e)=>{
                    e.preventDefault();
                }}>click for data</button>
            
            </div>
        )
    }