import { useNavigate } from "react-router-dom"

export function DisplayUser({id, firstname}){
    const navigate = useNavigate();
    const changePage = () => {
        localStorage.setItem('to', id);
        navigate("../Send");
    }
    return <div className = "flex justify-between items-center my-2 mx-4">
        <div className = "flex">
            <div className = "bg-gray-300 h-7 w-7 rounded-full flex items-center justify-center">B</div>
            <div className= "mx-2">{firstname}</div>
        </div>
        <button className="bg-gray-800 text-white font-bold py-2 px-4 border border-gray-700 rounded-lg w-2/12 hover:bg-black" onClick ={changePage}> Send Money</button>
    </div>
}