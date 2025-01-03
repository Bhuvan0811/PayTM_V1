import { Link } from "react-router-dom";

export function BottomText({label1, label2, href}){
    return <div className="text-sm p-2 pb-4">
        {label1 + " "}
        <Link to = {href} className="text-blue-500 underline">{label2}</Link>
    </div>
}