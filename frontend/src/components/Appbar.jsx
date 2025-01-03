import { memo } from "react"
export const Appbar = memo(function Appbar(){
    console.log("appbar rerendered");
    return <div className = "border border-gray-300 flex rounded-md shadow-sm shadow-gray-200 m-1 items-center justify-between">
        <div className = "p-2 ">
            PayTM
        </div>
        <div className = "p-2 flex">
        <p>Hello</p>
        <div className = "bg-gray-300 h-7 w-7 rounded-full ml-3 flex items-center justify-center">U</div>
        </div>
    </div>
})