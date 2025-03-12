import EventsOnMap from 'assets/images/screenshots/events_on_map.jpeg'
import EventPage from 'assets/images/screenshots/event_page.jpeg'
// import Dashboard from 'assets/images/screenshots/dashboard.jpeg'
// import Comments from 'assets/images/screenshots/comments.jpeg'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'

export default function Roamies() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const [isFixed, setIsFixed] = useState(true)

  const opacityB = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const yB = useTransform(scrollYProgress, [0, 0.1], [100, 0])
  scrollYProgress.on('change', (value) => {
    setIsFixed(value < 0.1)
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => console.log(latest))

  return (
    <section ref={containerRef} className="flex flex-col">
      {/* <div className="sticky top-0"> */}
      <motion.div
        // style={{ opacity: opacityB, y: yB }}
        className="flex py-40 w-svw justify-between items-center bg-white pointer-events-none"
      >
        <div className="w-full flex justify-center">
          <img src={EventsOnMap} alt="Events on map" className="lg:h-[700px] lg:w-[320px]" />
        </div>
        <div className="flex flex-col w-full gap-5">
          <p className="poppins-semibold text-black lg:text-3xl sm:text-lg">
            Get straight to the action
          </p>
          <p className="poppins-regular text-black lg:text-xl w-[75%]">
            We designed Roamies to make joining an event as effortless as possible — no groups, no
            unnecessary steps. Just scroll through the map, find what&apos;s happening near you, and
            jump right in.
          </p>
        </div>
      </motion.div>
      {/* </div> */}
      <div className="flex justify-between items-center">
        <div className="w-full flex justify-center">
          <img src={EventPage} alt="Event page" className="lg:h-[700px] lg:w-[320px]" />
          {/* <img src={Comments} alt="Event page" className="lg:h-[700px] lg:w-[320px]" /> */}
        </div>
        <div className="flex flex-col w-full gap-5">
          <p className="poppins-semibold text-black lg:text-3xl sm:text-lg">
            We made it personal, not just social
          </p>
          <p className="poppins-regular text-black lg:text-xl w-[75%]">
            No endless chats. No lost messages in a sea of conversations. Just direct, personal
            connections. Pick an event, join instantly, and meet people in real life—without the
            small talk holding you back.
          </p>
        </div>
      </div>
    </section>
  )
}
