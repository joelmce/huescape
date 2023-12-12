'use client'
import { useEffect, useState } from "react"
import { generateMeshGradient } from "../util/GradientFactory"
import { RefreshCw, Eye, EyeOff, Code } from "react-feather";
import { CopyBlock, dracula } from "react-code-blocks";
import History from "./History";

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

    console.log(history[index])

    const handleCopy = () => {
        setShowCode(!showCode)
        
    }

    return (
        <>
            <div
                className='absolute w-[300px] h-[500px] md:w-[800px] md:h-[700px] mt-64 opacity-[16%] backdrop-blur-3xl blur-3xl pointer-events-none rounded-[15rem]'
                style={history[index]}
            />
            
            <div className="flex flex-col gap-2">
                
                <div className="flex flex-col gap-5 w-96 h-96">
                    {!showCode ? 
                        <div
                            style={history[index]}
                            className="z-10 w-full h-full rounded-xl"/> : 
                        <CopyBlock
                            text={"canvas {\n" + currentGradient + " \n} "}
                            language={"css"}
                            showLineNumbers={false}
                            wrapLongLines
                            theme={dracula}
                            customStyle={{height: '100%', width: '100%', overflowY: 'scroll'}}
                        />

                        }
                    <div className="flex justify-between">
                        <button
                            onClick={() => handleNewGradient()}
                            className='z-10 transition text-tertiary hover:text-sky-500 text-blue-600 text-sm w-fit rounded-xl'
                            disabled={showCode ? true : false}
                        >
                            <RefreshCw size={15} className="inline"/> Generate
                        </button>
                        <Code size={15} className={`cursor-pointer ${showCode ? 'text-green-500' : ''}`} onClick={handleCopy}> Show Code </Code>
                    </div>
                </div>

                <section className="block mt-10 grid grid-cols-5 gap-2 w-full grid-wrap justify-center">
                    {history.map(() => {
                        return <History gradient={history[index]}/>
                    })}
                </section>

            </div>
            
        </>
    )
}