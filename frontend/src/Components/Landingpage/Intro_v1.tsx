import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Story from './Story_old'

export default function Intro() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end end'],
  })

  // Text entrance animation (first 30% of scroll)
  const entranceY = useTransform(scrollYProgress, [0, 0.3], [100, 0])
  const entranceOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  // Diving animation (30-100% of scroll)
  const scale = useTransform(scrollYProgress, [0.3, 1], [1, 50])
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.7], [1, 0])
  const blur = useTransform(scrollYProgress, [0.3, 1], [0, 20])

  return (
    <div ref={containerRef} className="h-[200vh]">
      <div className="sticky top-0 h-svh overflow-hidden bg-white">
        {/* Story component integrated within the same scroll context */}
        <Story scrollProgress={scrollYProgress} />

        {/* Gradient overlay */}
        <div className="w-full h-svh bg-gradient-to-t from-white to-transparent z-30" />

        {/* Animated text container */}
        <motion.div
          style={{
            y: entranceY,
            opacity: entranceOpacity,
            scale,
            filter: `blur(${blur}px)`,
            transformPerspective: 1000,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center z-20"
        >
          <motion.p
            style={{ opacity: textOpacity }}
            className="font-drukHeavy text-xl lg:text-8xl text-center text-black"
          >
            Travel Solo
          </motion.p>
          <motion.p
            style={{ opacity: textOpacity }}
            className="font-drukMediumItalic text-lg lg:text-7xl text-black"
          >
            never alone
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
