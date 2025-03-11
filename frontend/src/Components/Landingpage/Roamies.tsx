import EventsOnMap from 'assets/images/screenshots/events_on_map.jpeg'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'

export default function Roamies() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  })
  const [isFixed, setIsFixed] = useState(true)

  const opacityA = useTransform(scrollYProgress, [0.3, 0.5, 1], [1, 1, 0])
  const scaleA = useTransform(scrollYProgress, [0.5, 1], [1, 95])
  const scaleText = useTransform(scrollYProgress, [0.1, 0.5], [0.7, 1])
  const xA = useTransform(scrollYProgress, [0.5, 1], [0, 970])
  const yA = useTransform(scrollYProgress, [0.5, 1], [0, 1100])
  const opacityB = useTransform(scrollYProgress, [0.85, 1], [0, 1])
  const yB = useTransform(scrollYProgress, [0.8, 1], [100, 0])
  scrollYProgress.on('change', (value) => {
    setIsFixed(value < 1)
  })

  // useMotionValueEvent(scrollYProgress, 'change', (latest) => console.log(latest))

  return (
    <div ref={containerRef} className="h-[200vh]">
      <motion.div
        style={{ scale: scaleA, opacity: opacityA, x: xA, y: yA }}
        className="flex h-svh w-svw justify-center items-center bg-white"
      >
        <motion.p
          style={{ scale: scaleText }}
          className="font-drukHeavy text-black text-6xl lg:text-8xl pointer-events-none z-20"
        >
          Roamies
        </motion.p>
      </motion.div>

      <motion.div
        style={{ opacity: opacityB, y: yB, position: isFixed ? 'fixed' : 'sticky' }}
        className="top-0 flex h-svh w-svw justify-between items-center bg-white pointer-events-none"
      >
        <div className="relative flex justify-between items-center">
          <div className="w-full flex justify-center">
            <img src={EventsOnMap} alt="Events on map" className="lg:h-[700px] lg:w-[320px]" />
          </div>
          <div className="flex flex-col w-full gap-5">
            <p className="poppins-semibold text-black lg:text-3xl sm:text-lg">
              Get straight to the action
            </p>
            <p className="poppins-regular text-black lg:text-xl w-[75%]">
              We designed Roamies to make joining an event as effortless as possible — no groups, no
              unnecessary steps. Just scroll through the map, find what&apos;s happening near you,
              and jump right in.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
