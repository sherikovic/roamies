import { useEffect, useRef } from 'react'
import createEvent from 'assets/images/create-event.png'
import findEvents from 'assets/images/find-events.png'
import filter from 'assets/images/filter.png'
import { inView, animate } from 'motion'
import { getIsMobile } from 'util/util'

export const Features = () => {
  const isMobile = getIsMobile()
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const container1ref = useRef<HTMLDivElement>(null)
  const container2ref = useRef<HTMLDivElement>(null)
  const container3ref = useRef<HTMLDivElement>(null)
  const img1ref = useRef<HTMLImageElement>(null)
  const img2ref = useRef<HTMLImageElement>(null)
  const img3ref = useRef<HTMLImageElement>(null)
  const text1ref = useRef<HTMLParagraphElement>(null)
  const text2ref = useRef<HTMLParagraphElement>(null)
  const text3ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (isMobile) return
    inView(mainContainerRef.current!, () => {
      animate(
        img1ref.current!,
        { transform: ['translateY(100%)', 'translateY(0%)'] },
        { duration: 0.5, delay: 0.3 },
      )
      animate(text1ref.current!, { opacity: 1 }, { duration: 0.5 })
      animate(
        img2ref.current!,
        { transform: ['translateY(100%)', 'translateY(0%)'] },
        { duration: 0.5 },
      )
      animate(text2ref.current!, { opacity: 1 }, { duration: 0.5 })
      animate(
        img3ref.current!,
        { transform: ['translateY(100%)', 'translateY(0%)'] },
        { duration: 0.5, delay: 0.5 },
      )
      animate(text3ref.current!, { opacity: 1 }, { duration: 0.5 })
    })
  }, [isMobile])

  useEffect(() => {
    if (!isMobile) return
    inView(container1ref.current!, () => {
      animate(
        img1ref.current!,
        { transform: ['translateX(-100%)', 'translateX(0%)'] },
        { duration: 0.5 },
      )
      animate(text1ref.current!, { opacity: 1 }, { duration: 0.5 })
    })
  }, [isMobile])

  useEffect(() => {
    if (!isMobile) return
    inView(container2ref.current!, () => {
      animate(
        img2ref.current!,
        { transform: ['translateX(100%)', 'translateX(0%)'] },
        { duration: 0.5 },
      )
      animate(text2ref.current!, { opacity: 1 }, { duration: 0.5 })
    })
  }, [isMobile])

  useEffect(() => {
    if (!isMobile) return
    inView(container3ref.current!, () => {
      animate(
        img3ref.current!,
        { transform: ['translateX(-100%)', 'translateX(0%)'] },
        { duration: 0.5 },
      )
      animate(text3ref.current!, { opacity: 1 }, { duration: 0.5 })
    })
  }, [isMobile])

  return (
    <div id="features" className="bg-[#000900] py-10 lg:px-32 px-4 gap-12 flex flex-col">
      <p className="text-offWhite  text-xl lg:text-4xl text-center">
        Discover the Features That Make Travel Better
      </p>
      <div ref={mainContainerRef} className="flex justify-center items-center flex-col lg:flex-row">
        <div
          ref={container1ref}
          className="gap-5 lg:gap-5 flex-1 lg:flex-col flex justify-center items-center flex-row-reverse lg:relative top-12 left-16"
        >
          <div
            ref={text1ref}
            className="lg:gap-2 opacity-0 flex-col flex justify-center items-center"
          >
            <p className="text-left lg:text-center text-offWhite max-w-full lg:max-w-[60%] text-xl">
              Create & Share Events
            </p>
            <p className="text-left lg:text-center text-offWhite max-w-full lg:max-w-[60%] text-md">
              Easily organize and share travel events, meetups, or group activities with the
              community.
            </p>
          </div>
          <img
            ref={img1ref}
            className="max-w-[50%] lg:max-w-full lg:w-full translate-x-[-100%] lg:translate-x-0"
            src={findEvents}
            alt="createEvent"
          />
        </div>
        <div
          ref={container2ref}
          className="gap-5 lg:gap-5 flex-1 lg:flex-col flex justify-center items-center flex-row lg:z-10"
        >
          <div
            ref={text2ref}
            className="lg:gap-2 opacity-0 flex-col flex justify-center items-center"
          >
            <p className="text-offWhite max-w-full lg:max-w-[60%] text-right lg:text-center text-xl">
              Search & Join Experiences
            </p>
            <p className="text-offWhite max-w-full lg:max-w-[60%] text-right lg:text-center text-md">
              Discover and join events that match your interests, from city tours to outdoor
              adventures.
            </p>
          </div>
          <img
            ref={img2ref}
            className="max-w-[50%] lg:max-w-full lg:w-full translate-x-[100%] lg:translate-x-0"
            src={createEvent}
            alt="findEvent"
          />
        </div>
        <div
          ref={container3ref}
          className="gap-5 lg:gap-5 flex-1 lg:flex-col flex justify-center items-center flex-row-reverse lg:relative top-12 right-16"
        >
          <div
            ref={text3ref}
            className="lg:gap-2 opacity-0 flex-col flex justify-center items-center"
          >
            <p className="text-left lg:text-center text-offWhite max-w-full lg:max-w-[60%] text-xl">
              Filter Your Search
            </p>
            <p className="text-left lg:text-center text-offWhite max-w-full lg:max-w-[60%] text-md">
              Use filters to quickly find events by location, activity, or budget that fit your
              needs.
            </p>
          </div>
          <img
            ref={img3ref}
            className="max-w-[50%] lg:max-w-full lg:w-full translate-x-[-100%] lg:translate-x-0"
            src={filter}
            alt="filter"
          />
        </div>
      </div>
    </div>
  )
}
