import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export function SendMoney(){
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();
    return <div className = "bg-slate-100 h-screen flex items-center justify-center">
    <div className = "w-1/4 shadow shadow-lg shadow-slate-300 bg-white flex flex-col justify-center items-center rounded-md">
        <Heading label = {"Send Money"} />
        <div className = "flex w-full items-left px-4 py-2">
            <div className = "bg-green-500 h-7 w-7 rounded-full flex items-center justify-center ">M</div>
            <div className = "text-lg font-bold ml-2">wfsdfsd</div>
        </div>
        <div className = "text-md w-full text-left px-4">Enter Amount:</div>
        <InputBox placeholder ={"10000"} setter = {setAmount}></InputBox>
        <button className = "bg-green-500 p-2 px-3 rounded-md mb-6 w-11/12 hover:bg-green-600 text-md font-bold hover:text-white" onClick={()=>{
            axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: localStorage.getItem('to'),
                amount: amount     
            },{
                headers:{
                    authorization: localStorage.getItem('Token'),
                    'content-Type': 'application/json'
                }
            }).then((res) =>{
                navigate("../Dashboard")
            })
        }}>Initiate Transfer</button>
    </div>
</div>
}