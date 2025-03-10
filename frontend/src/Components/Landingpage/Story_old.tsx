import { motion, MotionValue, useTransform } from 'motion/react'
// import aloneAtDawn from 'assets/images/alone-at-dawn.png'
import Solitary from 'assets/videos/Solitary_Train_Arrival.mp4'

export default function Story({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const storyScale = useTransform(scrollProgress, [0.3, 1], [0.8, 1])
  const storyOpacity = useTransform(scrollProgress, [0.5, 0.8], [0, 1])
  const storyY = useTransform(scrollProgress, [0.3, 1], [300, 0])

  return (
    <motion.div
      style={{
        scale: storyScale,
        opacity: storyOpacity,
        y: storyY,
      }}
      className="relative w-svw h-svh flex flex-col items-start justify-start z-40"
    >
      <video
        src={Solitary}
        width="1918"
        height="1080"
        autoPlay={true}
        controls={false}
        loop
        playsInline={true}
        muted
      ></video>
      {/* <img
         src={aloneAtDawn}
         alt="Foggy train station, single backpacer silhouette"
         className="g:w-[50%] w-[40vw] aspect-auto rounded sepia-[0.25] brightness-[0.75]"
       /> */}
      {/* <motion.p
        style={{ y: textY }}
        className="font-drukMedium absolute left-[600px] top-20 text-black text-xs lg:text-4xl w-[42%] z-10"
      >
        There&apos;s a difference between choosing solitude… and feeling alone in a crowd of
        strangers.
      </motion.p> */}
    </motion.div>
  )
}
