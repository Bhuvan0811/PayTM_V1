export function BackgroundWrapper({children}){
    return <div className = "bg-slate-300 h-screen flex items-center justify-center">
        <div className = "w-1/4 border border-gray-800 bg-gray-100 flex flex-col justify-center items-center rounded-md">
            {children}
        </div>
    </div>
}