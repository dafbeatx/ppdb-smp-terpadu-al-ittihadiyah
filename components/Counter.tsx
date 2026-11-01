'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useTransform, animate, type MotionValue } from 'framer-motion'

interface CounterProps {
    value: number
    duration?: number
    delay?: number
    className?: string
    suffix?: string
}

export default function Counter({
    value,
    duration = 1.2,
    delay = 0,
    className = '',
    suffix = '',
}: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null)
    // Margin 0px agar langsung terpicu saat muncul di layar HP tanpa harus digulir jauh ke bawah
    const isInView = useInView(ref, { once: true, margin: '0px' })
    const count = useMotionValue(0)
    const rounded = useTransform(count, (latest) => Math.round(latest))
    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(() => {
        if (isInView && !hasAnimated) {
            const controls = animate(count, value, {
                duration,
                delay,
                ease: 'easeOut',
                onComplete: () => setHasAnimated(true),
            })
            return controls.stop
        }
    }, [isInView, hasAnimated, value, duration, delay, count])

    return (
        <span ref={ref} className={className}>
            <AnimatedText value={rounded} initial={value} hasAnimated={hasAnimated} />
            {suffix}
        </span>
    )
}

function AnimatedText({
    value,
    initial,
    hasAnimated,
}: {
    value: MotionValue<number>
    initial: number
    hasAnimated: boolean
}) {
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        return value.on('change', (latest: number) => {
            if (ref.current) {
                ref.current.textContent = latest.toString()
            }
        })
    }, [value])

    // Menampilkan nilai awal secara langsung agar tidak blank/0 di HP yang lambat memproses observer
    return <span ref={ref}>{hasAnimated ? initial : initial}</span>
}
