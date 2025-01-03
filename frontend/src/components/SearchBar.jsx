import axios from 'axios'
import { memo } from 'react';
export const SearchBar = memo(function SearchBar({placeholder, setPeople}){
    console.log("Searchbar rerendered");
    return <input type = "text" placeholder={placeholder} onChange = {(e) => {
        const filter = e.target.value || "";
        if(filter !== "") {
            axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{ 
            headers: { authorization: localStorage.getItem('Token') } }).then((res) =>{
                setPeople(res.data.users);
            })
        } else setPeople([])
        }}className = "p-2 border border-gray-300 rounded-md mx-4 w-[calc(100%-2rem)]">
    </input>
})