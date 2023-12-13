import { MouseEventHandler } from "react"

interface Props {
    gradient?: {
        backgroundImage: string,
        backgroundColor: string
    },
    onClick?: any
}

export default function History({gradient, onClick}: Props) {
    return <div onClick={onClick} className="w-16 h-16 rounded hover:border hover:border-black hover:border-1 hover:cursor-pointer" style={gradient}></div>
}