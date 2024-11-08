'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { MouseEvent } from 'react'
import { useEffect } from 'react'

export default function Home() {
    const [clickCount, setClickCount] = useState(0)
    const [mouseState, setMouseState] = useState(false) // false: up, true: down
    const audioPop = useRef<HTMLAudioElement | null>(null)
    const audioImposter = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Client-side only code
            audioPop.current = new Audio('/pop.mp3')
            audioImposter.current = new Audio('/imposter.mp3')
        }
    }, [])

    const mouseDownHandler = (e: MouseEvent) => {
        if (e.button !== 0) return

        setMouseState(true)

        // interrupt the audio if it's playing
        if (audioPop.current) {
            audioPop.current.pause()
            audioPop.current.currentTime = 0
        }
    }

    const mouseUpHandler = (e: MouseEvent) => {
        if (e.button !== 0) return

        if (mouseState) {
            setClickCount(clickCount + 1)
        }

        if (clickCount % 100 === 0) {
            audioImposter.current?.play()
        } else {
            audioPop.current?.play()
        }

        setMouseState(false)
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-5">
            <h1 className="text-8xl font-semibold px-12 py-3 bg-cyan-600 text-white rounded-3xl shadow-lg">
                {clickCount}
            </h1>
            <Image
                src={clickCount % 2 === 0 ? '/amongus-pop-s0.png' : '/amongus-pop-s1.png'}
                width={512}
                height={512}
                alt="amongus-pop-s0"
                className="sm:w-3/4 md:w-2/5 cursor-pointer ease-in transition-scale duration-75"
                onMouseDown={e => mouseDownHandler(e)}
                onMouseUp={e => mouseUpHandler(e)}
                onDragStart={e => e.preventDefault()} // Disable dragging
                style={{ scale: mouseState ? 0.9 : 1 }}
            />
        </div>
    )
}
