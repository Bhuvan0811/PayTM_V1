import { memo } from "react"
export const SmallHeading = memo(function SmallHeading({label}){
    return <div className = "font-sans text-center p-2 text-xl"   
    >{label}</div>
})