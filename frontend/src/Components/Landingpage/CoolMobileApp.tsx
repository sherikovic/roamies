import React, { useEffect } from 'react'
import appScreenshot from 'images/app-screenshot.png'
import { inView, animate } from 'motion'

export const CoolMobileApp = () => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const imgref = React.useRef<HTMLImageElement>(null)
  const textref = React.useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    inView(containerRef.current!, () => {
      animate(
        imgref.current!,
        { transform: ['translateY(100%)', 'translateY(0%)'] },
        { duration: 0.5 },
      )
    })
  }, [])

  useEffect(() => {
    inView(textref.current!, () => {
      animate(textref.current!, { opacity: 1 }, { duration: 1 })
    })
  }, [])

  return (
    <div className="bg-[#0f1012] py-5 lg:px-32 px-4 lg:gap-24 gap-4 flex flex-col">
      <p className="text-off-white text-xl lg:text-4xl text-center">
        Get Ready to Connect, Share, and Explore
      </p>
      <div
        ref={containerRef}
        className="flex justify-center items-center lg:gap-24 gap-4 flex-col lg:flex-row"
      >
        <img
          ref={imgref}
          src={appScreenshot}
          alt="app-screenshot"
          className="lg:max-h-[600px] max-w-[80%] translate-y-full"
        />
        <p ref={textref} className="opacity-0 text-off-white text-sm lg:text-2xl max-w-[400px]">
          The ultimate travel companion is almost here! Our app is launching soon, giving you a
          platform to meet fellow travelers, share experiences, and split costs effortlessly.
          Whether you’re looking to make new friends, discover hidden gems, or make your journey
          more affordable, our app will help you do it all. Stay tuned – adventure is just a tap
          away!
        </p>
      </div>
    </div>
  )
}
