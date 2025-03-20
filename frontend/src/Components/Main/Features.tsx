import { motion, MotionProps, MotionValue, useScroll, useTransform } from 'motion/react'
import Dashboard from 'assets/images/screenshots/dashboard.png'
import Explore from 'assets/images/screenshots/explore.png'
import Create from 'assets/images/screenshots/create.png'
import Event from 'assets/images/screenshots/event.png'
import { useEffect, useRef, useState } from 'react'
import { getIsMobile } from 'util/util'
import chroma from 'chroma-js'

export default function Features() {
  const containerRef = useRef(null)
  const isMobile = getIsMobile()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center bg-offWhite px-[80px] pb-80"
      style={{ gap: isMobile ? '10rem' : '5rem' }}
    >
      {[
        {
          image: Explore,
          alt: 'Events on map',
          headline: 'Get straight to the action',
          text: "We designed Roamies to make joining an event as effortless as possible—whether it's a group walk, sightseeing, or grabbing a bite together. Roamies makes it easy to join local events and meet fellow solo travelers in seconds. The world is waiting, and all you have to do is <span class='poppins-semibold'>show up!</span>",
        },
        {
          image: Event,
          alt: 'Event page',
          headline: 'We made it personal, not just social',
          text: "No endless chats. No lost messages in a sea of conversations. Roamies keeps it simple; connect directly with participants, confirm plans and go! Personal, straightforward, and all about making <span class='poppins-semibold'>real-life connections.</span>",
        },
        {
          image: Dashboard,
          alt: 'Dashboard',
          headline: 'Plan Less, Do More',
          text: "All your events and trips in one place—effortlessly managed, so you can focus on the experience, not the planning. Whether you're hosting or joining, everything stays clear and simple—<span class='poppins-semibold'>no hassle, just fun!.</span>",
        },
        {
          image: Create,
          alt: 'Create page',
          headline: 'Create your own vibe',
          text: "Pick a time, set the vibe, and make it happen! We wanted Roamies to be more than just another event app—it's your way to create experiences on your terms. Whether it's sharing a ride, exploring a museum, or finding a hiking buddy, <span class='poppins-semibold'>the choice is yours.</span>",
        },
      ].map((item, index) => {
        return <Card key={index} {...item} progress={scrollYProgress} index={index} />
      })}
    </section>
  )
}

const Card = ({
  image,
  alt,
  headline,
  text,
  progress,
  index,
}: {
  image: string
  alt: string
  headline: string
  text: string
  progress: MotionValue<number>
  index: number
} & Omit<MotionProps, 'style'>) => {
  const [isMobile, setIsMobile] = useState(getIsMobile())

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getIsMobile())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const lightenedColor = chroma('#f7f1e3')
    .set('hsl.l', 0.8 + (index / (4 - 1)) * 0.15)
    .hex()
  const scale = useTransform(progress, [index * 0.25, 1], [1, 1 - (4 - index) * 0.05])
  // const background = `linear-gradient(135deg, ${lightenedColor} 0%, #ffffff 50%, #f7e9d3 100%)`
  const background = `linear-gradient(180deg, ${lightenedColor} 0%, #fcc490 35%, #ffffff 100%)`

  return (
    <div className="sticky top-0 lg:w-svw w-[90vw] lg:h-full">
      <motion.div
        className="relative flex flex-col"
        style={{ top: `calc(${isMobile ? '13vh' : '20vh'} + ${index * 25}px)`, scale }}
      >
        <motion.div
          style={{ background }}
          className="relative bg-white flex flex-col lg:flex-row gap-5 w-full lg:h-full items-center lg:justify-between max-w-6xl mx-auto p-8 lg:px-12 lg:py-10 shadow-lg rounded-2xl overflow-hidden"
        >
          <div
            className="lg:w-1/2 lg:h-full h-[40vh] flex justify-center"
            style={{
              maxWidth: isMobile
                ? index === 0
                  ? '230px'
                  : index === 1
                    ? '280px'
                    : '180px'
                : undefined,
            }}
          >
            <img loading="lazy" src={image} alt={alt} className="lg:h-[480px] rounded-xl" />
          </div>
          <div className="flex flex-col w-full lg:w-3/5 gap-4">
            <h1 className="poppins-semibold text-textPrimary text-base lg:text-4xl lg:max-w-[430px]">
              {headline}
            </h1>
            <p
              className="poppins-regular text-gray-700 text-sm lg:text-xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
