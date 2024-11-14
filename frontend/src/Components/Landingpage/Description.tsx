import React, { useEffect } from 'react'
import descImg1 from 'images/About photo 1.png'
import descImg2 from 'images/About photo 2.png'
import descImg3 from 'images/About photo 3.png'
import { animate, inView } from 'motion'

export const Description = () => {
  const container1ref = React.useRef<HTMLDivElement>(null)
  const container2ref = React.useRef<HTMLDivElement>(null)
  const container3ref = React.useRef<HTMLDivElement>(null)
  const img1ref = React.useRef<HTMLImageElement>(null)
  const img2ref = React.useRef<HTMLImageElement>(null)
  const img3ref = React.useRef<HTMLImageElement>(null)
  const text1ref = React.useRef<HTMLParagraphElement>(null)
  const text2ref = React.useRef<HTMLParagraphElement>(null)
  const text3ref = React.useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    inView(container1ref.current!, () => {
      animate(
        img1ref.current!,
        { transform: ['translateX(-100%)', 'translateX(0%)'] },
        { duration: 0.5 },
      )
      animate(text1ref.current!, { opacity: 1 }, { duration: 0.5 })
    })
  }, [])

  useEffect(() => {
    inView(container2ref.current!, () => {
      animate(
        img2ref.current!,
        { transform: ['translateX(100%)', 'translateX(0%)'] },
        { duration: 0.5 },
      )
      animate(text2ref.current!, { opacity: 1 }, { duration: 0.5 })
    })
  }, [])

  useEffect(() => {
    inView(container3ref.current!, () => {
      animate(
        img3ref.current!,
        { transform: ['translateX(-100%)', 'translateX(0%)'] },
        { duration: 0.5 },
      )
      animate(text3ref.current!, { opacity: 1 }, { duration: 0.5 })
    })
  }, [])

  return (
    <div id="about" className="bg-[#000900] py-5 lg:px-32 px-4">
      <p className="text-off-white text-xl lg:text-4xl text-center">
        Join Roamies and start your next amazing journey!
      </p>
      <div className="flex flex-col justify-center items-center py-4 lg:py-16 gap-4 lg:gap-0">
        <div ref={container1ref} className="gap-4  lg:gap-20 flex justify-center items-center">
          <img
            ref={img1ref}
            src={descImg1}
            alt="descImg1"
            className="lg:w-full w-[50vw] translate-x-[-100%] rounded"
          />
          <p ref={text1ref} className="text-off-white opacity-0 text-xs lg:text-2xl">
            Roamies is designed specifically for solo travelers, allowing travelers from around the
            world to create and join travel activities or plans.{' '}
          </p>
        </div>
        <div ref={container2ref} className="gap-4  lg:gap-20 flex justify-center items-center">
          <p ref={text2ref} className="text-off-white opacity-0 text-xs lg:text-2xl">
            Here, you can not only meet new friends but also travel together to share
            transportation, accommodation, and activity costs, saving on travel expenses.{' '}
          </p>
          <img
            ref={img2ref}
            src={descImg2}
            alt="descImg2"
            className="lg:w-full w-[50vw] translate-x-full rounded"
          />
        </div>
        <div ref={container3ref} className="gap-4 lg:gap-20 flex justify-center items-center">
          <img
            ref={img3ref}
            src={descImg3}
            alt="descImg3"
            className="lg:w-full w-[50vw] translate-x-[-100%] rounded"
          />
          <p ref={text3ref} className="text-off-white opacity-0 text-xs lg:text-2xl">
            We believe that travel should not be a lonely adventure but a wonderful journey filled
            with friendships and memories.{' '}
          </p>
        </div>
      </div>
    </div>
  )
}
