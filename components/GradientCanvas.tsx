'use client'
import { useState } from "react"
import { generateMeshGradient } from "../util/GradientFactory"
import { Copy, RefreshCw, Check } from "react-feather";

const ELEMENTS = 6

export default function GradientCanvas() {
    const [history, setHistory] = useState([generateMeshGradient(ELEMENTS)])
    const [index, setIndex] = useState(0)
    const [copied, setCopied] = useState(false)

    const handleNewGradient = () => {
        setIndex(history.length)
        setHistory([...history, generateMeshGradient(ELEMENTS)])
    }

    const handleCopy = () => {
        navigator.clipboard.writeText("")
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }

    return (
        <>
            <div className="flex flex-col gap-5">
                <div
                    style={history[index]}
                    className="z-10 w-96 h-96 rounded-xl"
                />
                <button
                    onMouseDownCapture={() => handleNewGradient()}
                    className='z-10 transition text-tertiary hover:text-sky-500 text-white text-sm bg-black w-fit py-2 px-2 rounded-xl'
                >
                    <RefreshCw size={15} className="inline"/> Generate
                </button>

                {copied ? <Check/> : <Copy onClick={handleCopy} className="hover:cursor-pointer hover:text-green-500"/>}
            </div>
        
            <div
                className='absolute w-[300px] h-[500px] md:w-[800px] md:h-[700px] mt-64 opacity-[16%] backdrop-blur-3xl blur-3xl pointer-events-none rounded-[15rem]'
                style={history[index]}
            />
            
        </>
    )
}