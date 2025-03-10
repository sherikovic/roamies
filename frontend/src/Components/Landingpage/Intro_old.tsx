import Solitary from 'assets/videos/Solitary_Train_Arrival.mp4'
import Checkin from 'assets/videos/checkin.mp4'
import Goingout from 'assets/videos/goingout.mp4'
import { useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

const videos = [
  { src: Solitary, id: 'video1' },
  { src: Checkin, id: 'video2' },
  { src: Goingout, id: 'video3' },
]

const Intro = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const overlayOpacity1 = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.5, 0])

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      {/* bg container */}
      <div className="grid h-svh w-full left-0 top-0 sticky">
        {videos.map((video, index) => {
          // Determine z-index dynamically (higher for the active video)
          const zIndex = scrollYProgress.get() < (index + 1) / videos.length ? 1 : 0
          return (
            <div
              key={video.id}
              className="video-container"
              style={{ zIndex, ['--overlay-opacity' as any]: overlayOpacity1 }}
            >
              <video src={video.src} autoPlay muted loop width="1920" height="1080" />
            </div>
          )
        })}
        {/* video 1
        <div className="video-container">
          <video src={Solitary} autoPlay muted loop width="1920" height="1080" />
        </div>
        <div className="video-container">
          <video src={Checkin} autoPlay muted loop width="1920" height="1080" />
        </div>
        <div className="video-container">
          <video src={Goingout} autoPlay muted loop width="1920" height="1080" />
        </div> */}
      </div>
      {/* titles container */}
      <div className=""></div>
    </section>
  )
}

export default Intro
