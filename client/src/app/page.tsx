'use client'

import { useState } from 'react'

export default function Home() {
    const [clickCount, setClickCount] = useState(0)
    const [color, setColor] = useState('#94a3b8')

    function randomColor(): string {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }

    const clickHandler = () => {
        setClickCount(clickCount + 1)
        setColor(randomColor())
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-10">
            <button
                className="text-8xl px-20 py-5 rounded-2xl"
                style={{ backgroundColor: color }}
            >
                {clickCount}
            </button>
            <button
                className="w-2/5 h-2/5 bg-red-400 hover:bg-red-600 rounded-2xl flex justify-center items-center font-bold text-5xl text-white"
                onClick={() => clickHandler()}
            >
                Click Me!
            </button>
        </div>
    )
}
