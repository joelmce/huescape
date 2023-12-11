'use client'
import { useEffect, useState } from "react"
import { generateMeshGradient } from "../util/GradientFactory"
import { RefreshCw } from "react-feather";
import { CopyBlock, dracula } from "react-code-blocks";

const ELEMENTS = 6

export default function GradientCanvas() {
    const [history, setHistory] = useState([generateMeshGradient(ELEMENTS)])
    const [index, setIndex] = useState(0)
    const [currentGradient, updateCurrentGradient] = useState("")

    const handleNewGradient = () => {
        setIndex(history.length)
        setHistory([...history, generateMeshGradient(ELEMENTS)])
        updateCurrentGradient(history[index].backgroundImage)
    }

    useEffect(() => {
        handleNewGradient()
    }, [])

    return (
        <>
            <div
                className='absolute w-[300px] h-[500px] md:w-[800px] md:h-[700px] mt-64 opacity-[16%] backdrop-blur-3xl blur-3xl pointer-events-none rounded-[15rem]'
                style={history[index]}
            />

            <div className="flex flex-row gap-2">
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
                </div>
                
                <div className="w-46 h-46 z-10">
                    <CopyBlock
                        text={currentGradient}
                        language={"javascript"}
                        showLineNumbers={false}
                        theme={dracula}
                        codeBlock
                    />
                </div>

            </div>
            
        </>
    )
}