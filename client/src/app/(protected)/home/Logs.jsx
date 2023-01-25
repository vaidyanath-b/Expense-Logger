    "use client";



import { useUser } from "@/app/context/UserContext";
import { db } from "@/app/firebase";
import {addDoc, collection , doc, runTransaction, Timestamp ,} from "firebase/firestore";    
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
        const [group,setGroup] = useState([{name:user.username,amount:0}]);
        const [splitError,setSplitError] = useState(false);
        const [splitEqual,setSplitEqual] = useState(true);

    
    function checkSplit (){

        let sum = 0;
        for(let person of group){
            sum += parseInt(person.amount);
        }
        if(sum === parseInt(log.amount))
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
                <input type="checkbox" name="splitequal" id="splitequal" 
                checked={splitEqual} 
                onChange={(e) => {
                    setSplitEqual(e.target.checked);
                    if(e.target.checked){
                        let updatedGroup = [...group];
                        updatedGroup.forEach((person) => {
                            person.amount = log.amount/group.length;
                        })
                        setGroup(updatedGroup);
                    }
                }} />
                {
                    group.map((person,index) => {

                        return(
                        <div key={index} className="flex flex-row w-full">
                        <div className="w-[100px] text-center">{person.name}</div>
                        <input type="text"
                        key={person.name}
                        defaultValue={person.amount}
                        onBlur={(e) => {
                            let updatedGroup = [...group];
                            updatedGroup[index].amount = (e.target.value);
                            setGroup(updatedGroup);
                            setSplitError(!checkSplit());
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
            const userRef = doc(db,"users",user.username);
            const expenseRef = collection(db,"users",user.username,"expenses");
            const userShareAmount = group.filter((person) => person.name === user.username)[0].amount;
            
            const logId = addDoc(expenseRef,{

                paidBy : user.username,
                date : log.date,
                time : log.time,
                title : log.title,
                category : log.category,
                amount : userShareAmount,
                total_amount : parseFloat(log.amount),
                split : split,
            }
                ).then((docRef) => {
                    return docRef.id;
                })
            runTransaction(db, async (transaction) => {
                const userDoc = await transaction.get(userRef);
                if(!userDoc.exists()){
                    throw "Document does not exist!";   
                }
                const totalExpense = userDoc.data().totalExpense;
                const newTotalExpense = totalExpense + userShareAmount;
                transaction.update(userRef,{
                    totalExpense : newTotalExpense,
                })
                const owedMoney = userDoc.data().owedMoney;
                const newOwedMoney = owedMoney + parseFloat(log.amount) - userShareAmount;
                transaction.update(userRef,{
                    owedMoney : newOwedMoney,
                })
                
                //update money owed by each friend in group
                if(split){  //didnt work
                    for(let person of group){
                        if(person.name != user.username){
                            const friendRef = doc(db,"users",user.username,"friends",person.name);
                            const friendDoc = await transaction.get(friendRef);
                            const owedMoney = friendDoc.data().owedMoney;
                            const newOwedMoney = owedMoney + parseFloat(person.amount);
                            transaction.update(friendRef,{
                                owedMoney : newOwedMoney,
                            })
                            
                            const friendprofRef = doc(db,"users",person.name,"friends",user.username);
                            const userDoc = await transaction.get(friendprofRef);
                            const debt = userDoc.data().debt;
                            const newDebt = debt + parseFloat(person.amount);
                            transaction.update(friendprofRef,{
                                debt : newDebt,
                            })


                        }

                    }
                }
            })

            if(split)
                for(let person of group){
                    if(person.name != user.username){
                    addDoc(collection(db,"users",user.username,"expenses",logId,"group"),{
                        name : person.name,
                        amount : parseFloat(person.amount),
                        paid: false,

                    })
                    
                    addDoc(collection(db,"users",person.name,"debts"),{
                        paidBy : user.username,
                        logId : logId,
                    })


                }
            }
                

           
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
                                                    }}
                            className="px-1 text-[15px] " /> 
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
                                className={`${splitError ? "border-2 border-red-500" :""}`}
                                name="amount"
                                placeholder="Amount"
                                value={log.amount}
                                onChange={(e)=>{
                                    setLog({...log, amount:(e.target.value)})
                                    if(splitEqual)
                                    for(let person of group){
                                        person.amount = (e.target.value)/group.length;
                                    }
                              
                                }}
                                onBlur={(e) => {
                                    setSplitError(!checkSplit());
                                }}  
                                 />
                                
                </div>
                <div className= {`${displaySplit ? "flex flex-row" : "hidden"} gap-2 `}>
                       

                        <Select
                            className="w-40"
                            placeholder="add person"
                            options={friendsoptions}
                            value={person}
                            onChange={(e)=>{
                                setPerson(e.value)                                    
                                if(!group.some((person) => person.name === e.value)){
                                    setGroup([...group,{name:e.value,amount:0}])
                                }
                                
                            }}
                            noOptionsMessage={() => "No matching friends"}
                            
                        />
                         {group.map((person,i)=>{
                            return (
                                <button key={i} className="flex pl-1 gap-3 justify-between bg-yellow-300 text-black rounded-3xl  px-[3px] items-center"
                                        onClick={(e)=>{
                                            const newGroup = [...group];
                                            newGroup.splice(i,1);
                                            setGroup(newGroup);
                                        }
                                        }>
                                    <p>{person.name}</p>
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
            disabled={splitError || !log.title || !log.category || !log.amount} 
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
                            onClick={() => setLogs([...logs,{
                            }])}
                    > Add log +</button>
                </div>

                <button onClick={(e)=>{
                    e.preventDefault();
                }}>click for data</button>
            
            </div>
        )
    }
