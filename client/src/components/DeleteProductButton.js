import React from "react"

export default function DeleteProductButton({text, id}) {
    return (
        <button className="text-white bg-red-700  hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{text}</button>
    )
}