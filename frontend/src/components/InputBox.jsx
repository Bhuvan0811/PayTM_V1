import { memo } from "react"
export const InputBox = memo(function InputBox({placeholder, setter}){
    return <>
    <input type = "text" placeholder = {placeholder} onChange = {(e) => setter(e.target.value)} className="m-3 mt-1 w-11/12 rounded-sm p-1 border border-gray-400" ></input>
    </>
})