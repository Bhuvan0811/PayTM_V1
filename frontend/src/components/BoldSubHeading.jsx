import { memo } from "react";
export const BoldSubHeading = memo(function BoldSubHeading({label}){
    console.log("Bold Subheading  rerendered");
    return <div className="text-lg text-left w-full pl-4 font-bold">
        {label}
    </div>
})