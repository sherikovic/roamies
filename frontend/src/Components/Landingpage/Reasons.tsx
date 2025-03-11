import Solitary from 'assets/videos/Solitary_Train_Arrival.mp4'
import { motion, useScroll, useTransform } from 'motion/react'
import GroupRunning from 'assets/videos/group-running.mp4'
import LonelyHike from 'assets/videos/lonely-hike.mp4'
import { useEffect, useRef } from 'react'

export default function Reasons() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end end'],
  })

  const video1Ref = useRef<HTMLVideoElement | null>(null)
  const video2Ref = useRef<HTMLVideoElement | null>(null)
  const video3Ref = useRef<HTMLVideoElement | null>(null)

  // useMotionValueEvent(scrollYProgress, 'change', (latest) => console.log(latest))

  const isVideo1Active = useTransform(scrollYProgress, [0.25, 0.5], [0, 1])
  const isVideo2Active = useTransform(scrollYProgress, [0.5, 0.75], [0, 1])
  const isVideo3Active = useTransform(scrollYProgress, [0.75, 1], [0, 1])

  useEffect(() => {
    const playPauseVideo = (video: HTMLVideoElement | null, isActive: number) => {
      if (!video) return
      if (isActive > 0.02) {
        video.play()
      } else {
        video.pause()
      }
    }

    // Sync videos with scroll position
    isVideo1Active.on('change', (val) => playPauseVideo(video1Ref.current, val))
    isVideo2Active.on('change', (val) => playPauseVideo(video2Ref.current, val))
    isVideo3Active.on('change', (val) => playPauseVideo(video3Ref.current, val))

    return () => {
      isVideo1Active.destroy()
      isVideo2Active.destroy()
      isVideo3Active.destroy()
    }
  }, [isVideo1Active, isVideo2Active, isVideo3Active])

  // First text layer (initial hero text)
  const heroTextY = useTransform(scrollYProgress, [0, 0.25], [300, 0])
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.2, 0.25], [0, 1, 0])

  // Video 1 text animation
  const video1TextY = useTransform(scrollYProgress, [0.25, 0.5], [-50, 100 - window.innerHeight])
  const video1TextOpacity = useTransform(scrollYProgress, [0.3, 0.45, 0.5], [0, 1, 0])
  const video1Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.4, 0.5], [0, 1, 1, 0])

  // Video 2 text animation
  const video2TextY = useTransform(scrollYProgress, [0.5, 0.75], [-50, 100 - window.innerHeight])
  const video2TextOpacity = useTransform(scrollYProgress, [0.5, 0.7, 0.75], [0, 1, 0])
  const video2Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.65, 0.75], [0, 1, 1, 0])

  // Video 3 text animation
  const video3TextY = useTransform(scrollYProgress, [0.75, 1], [-50, 100 - window.innerHeight])
  const video3TextOpacity = useTransform(scrollYProgress, [0.75, 0.95, 1], [0, 1, 0])
  const video3Opacity = useTransform(scrollYProgress, [0.75, 0.85, 0.9, 1], [0, 1, 1, 1])

  return (
    <div ref={containerRef} className="h-[400vh]">
      {/* Initial Hero Text */}
      <motion.div
        className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center pointer-events-none"
        style={{
          y: heroTextY,
          opacity: heroTextOpacity,
        }}
      >
        <p className="font-drukHeavy text-xl lg:text-8xl text-white">Travel Solo</p>
        <p className="font-drukMediumItalic text-lg lg:text-7xl text-white">never alone</p>
      </motion.div>

      {/* Video 1 Section */}
      <div className="fixed top-0 left-0 right-0 bottom-0 justify-center items-center pointer-events-none">
        <motion.video
          ref={video1Ref}
          className="w-full h-full brightness-50"
          // autoPlay
          muted
          loop
          src={Solitary}
          style={{ opacity: video1Opacity }}
        />
        <motion.p
          style={{
            y: video1TextY,
            opacity: video1TextOpacity,
          }}
          className="font-drukMedium lg:text-4xl text-white text-center w-[75%] mx-auto"
        >
          Sometimes, it feels like you&apos;re just passing through, a stranger everywhere you go.
        </motion.p>
      </div>

      {/* Video 2 Section */}
      <div className="fixed top-0 left-0 right-0 bottom-0 justify-center items-center pointer-events-none">
        <motion.video
          ref={video2Ref}
          className="w-full h-full brightness-50"
          // autoPlay
          muted
          loop
          src={LonelyHike}
          style={{ opacity: video2Opacity }}
        />
        <motion.p
          style={{
            y: video2TextY,
            opacity: video2TextOpacity,
          }}
          className="font-drukMedium lg:text-4xl text-white text-center w-[75%] mx-auto"
        >
          Finding a place to stay is easy.
          <br />
          But people to share the journey with?
          <br />
          That&apos;s the hard part.
        </motion.p>
      </div>

      {/* Video 3 Section */}
      <div className="sticky top-0 left-0 right-0 bottom-0 justify-center items-center pointer-events-none">
        <motion.video
          ref={video3Ref}
          className="w-svw h-svh brightness-50"
          // autoPlay
          muted
          loop
          src={GroupRunning}
          style={{ opacity: video3Opacity }}
        />
        <motion.p
          style={{
            y: video3TextY,
            opacity: video3TextOpacity,
          }}
          className="font-drukMedium lg:text-4xl text-white text-center w-[75%] mx-auto"
        >
          What if meeting like-minded travelers was effortless? Without endless chats and awkward
          silences?
        </motion.p>
      </div>
    </div>
  )
}
