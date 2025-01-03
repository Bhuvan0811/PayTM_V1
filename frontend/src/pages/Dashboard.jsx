import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { BoldSubHeading } from "../components/BoldSubHeading";
import { DisplayUser } from "../components/DisplayUser";
import { SearchBar } from "../components/SearchBar";
import axios from 'axios'
export function Dashboard(){
    const [people, setPeople] = useState([]);
    const [balance, setBalance] = useState(0);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers :{
                Authorization: localStorage.getItem('Token')
            }
        }).then((response)=>{
            setBalance(response.data.balance.toFixed(2))
            console.log(balance)
        })
    }, [])
    return <>
    <Appbar></Appbar>
    <BoldSubHeading label = {`Your Balance ${balance}`}></BoldSubHeading>
    <div className = "h-3"></div>
    <BoldSubHeading label = {"Users"}></BoldSubHeading>
    <SearchBar placeholder = {"Search Users..."} setPeople = {setPeople}></SearchBar>
    {people.map((p) => <DisplayUser key = {p._id}  id = {p._id} firstname={p.firstname}></DisplayUser>)}
    </>
}