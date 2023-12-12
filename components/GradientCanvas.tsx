'use client'
import { useEffect, useState } from "react"
import { generateMeshGradient } from "../util/GradientFactory"
import { RefreshCw, Clipboard } from "react-feather";
import { CopyBlock, dracula } from "react-code-blocks";

const ELEMENTS = 6

export default function GradientCanvas() {
    const [history, setHistory] = useState([generateMeshGradient(ELEMENTS)])
    const [index, setIndex] = useState(0)
    const [currentGradient, updateCurrentGradient] = useState("")
    const [showCode, setShowCode] = useState(false)

    const handleNewGradient = () => {
        setIndex(history.length)
        setHistory([...history, generateMeshGradient(ELEMENTS)])
        updateCurrentGradient(history[index].backgroundImage)
    }

    const handleCopy = (e: React.MouseEvent) => {
        setShowCode(!showCode)
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
                <div className="flex flex-col gap-5 w-96 h-96">
                    {!showCode ? 
                        <div
                            style={history[index]}
                            className="z-10 w-full h-full rounded-xl"/> : 
                        <CopyBlock
                            text={"canvas {\n" + currentGradient + " \n} "}
                            language={"css"}
                            showLineNumbers={false}
                            theme={dracula}
                            codeBlock
                        />

                        }
                        <Clipboard onClick={handleCopy} className="absolute z-20"/>
                    <button
                        onMouseDownCapture={() => handleNewGradient()}
                        className='z-10 transition text-tertiary hover:text-sky-500 text-white text-sm bg-black w-fit py-2 px-2 rounded-xl'
                    >
                        <RefreshCw size={15} className="inline"/> Generate
                    </button>
                </div>

            </div>
            
        </>
    )
}