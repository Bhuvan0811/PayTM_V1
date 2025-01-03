import { memo } from "react"
export const Heading = memo(function Heading({label}){
    return <>
    <div className="font-sans text-5xl font-bold p-4">{label}</div>
    </>
})