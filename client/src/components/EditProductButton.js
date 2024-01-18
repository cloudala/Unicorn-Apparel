import React from "react"

export default function EditProductButton({text, id}) {
    return (
        <button className="text-blue-800 bg-blue-100  hover:bg-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{text}</button>
    )
}