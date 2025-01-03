import {memo} from 'react'
export const Button = memo(function Button({label, sendRequest}){
    return <button className="bg-gray-800 text-white font-bold py-2 px-4 border border-gray-700 rounded w-11/12 mb-3" onClick={sendRequest}> {label}
  </button>
})