import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ISourceOptions } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'
import Features from './Features'
import { getIsMobile } from 'util/util'

export default function Anticipation() {
  const [init, setInit] = useState(false)
  const containerRef = useRef(null)
  const isMobile = getIsMobile()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  // mobile 1157, 534
  // air 832, 1163 --> 832/0.17

  const scaleA = useTransform(scrollYProgress, [0.17, 0.265], [1, 75])
  const scaleText = useTransform(scrollYProgress, [0.05, 0.17], [0.6, 1])
  const xA = useTransform(scrollYProgress, [0.17, 0.265], [0, 765])
  const yA = useTransform(scrollYProgress, [0.17, 0.265], [0, 100])
  const textColor = useTransform(scrollYProgress, [0.25, 0.3], ['#000000', '#f0f8ff'])
  const opacityB = useTransform(
    scrollYProgress,
    [isMobile ? 0.17 : 0.27, isMobile ? 0.3 : 0.4],
    [0, 1],
  )

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: '#d9a13b',
        },
      },
      fpsLimit: 120,
      interactivity: {
        detectOn: 'canvas',
        events: {
          onHover: {
            enable: false,
            mode: 'bubble',
          },
          onClick: {
            enable: true,
            mode: 'bubble',
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          grab: {
            distance: 400,
            links: {
              opacity: 0.5,
            },
          },
          repulse: {
            distance: 56.84,
            duration: 0.4,
          },
          push: {
            quantity: 4,
          },
          remove: {
            quantity: 2,
          },
        },
      },
      particles: {
        number: {
          value: 15,
          density: {
            enable: true,
          },
        },
        color: {
          value: ['#fff', '#f07443', '#ff4800'],
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: { min: 0.05, max: 0.15 },
          random: true,
        },
        collisions: {
          enable: true,
          mode: 'bounce',
        },
        size: {
          value: { min: 45, max: 200 },
          random: true,
          animation: {
            mode: 'random',
            enable: true,
            speed: 10,
            sync: false,
            startValue: 'random',
          },
        },
        move: {
          enable: true,
          speed: 3,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'in',
          bounce: true,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200,
          },
        },
        reduceDuplicates: true,
      },
      fullScreen: {
        enable: false,
        zIndex: 1,
      },
      detectRetina: true,
      pauseOnOutsideViewport: true,
    }),
    [],
  )

  useMotionValueEvent(scrollYProgress, 'change', (latest) => console.log(latest))

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center relative w-svw overflow-x-clip overflow-y-clip"
    >
      {/* Background Particles */}
      {init && <Particles id="tsparticles" options={options} className="absolute inset-0" />}
      {/* Content */}
      <div className="flex pt-72 w-[60%] z-10 justify-center">
        <p
          style={{
            WebkitTextFillColor: 'transparent',
            WebkitTextStrokeWidth: '1.5px',
            WebkitTextStrokeColor: '#242323',
            lineHeight: '5.75rem',
            letterSpacing: '-0.05em',
            fontSize: 'clamp(3rem, 5vw, 5.5rem)',
          }}
          className="font-drukMedium text-center"
        >
          So we created{' '}
          <span
            style={{
              WebkitTextFillColor: '#1f1f1f',
              WebkitTextStrokeWidth: '0px',
            }}
          >
            something
          </span>{' '}
          <span>
            we believe makes a{' '}
            <span
              style={{
                WebkitTextFillColor: '#1f1f1f',
                WebkitTextStrokeWidth: '0px',
              }}
            >
              difference.
            </span>
          </span>
        </p>
      </div>
      {!isMobile && (
        <motion.div
          style={{ scale: scaleA, x: xA, y: yA }}
          className="flex py-[30rem] w-svw h-svh justify-center items-center"
        >
          <motion.p
            style={{ scale: scaleText, fontSize: 'clamp(3rem, 8vw, 6rem)', color: textColor }}
            className="font-drukHeavy text-textPrimary pointer-events-none"
          >
            Roamies
          </motion.p>
        </motion.div>
      )}
      {/* {isMobile ? (
        <div className="flex py-[30rem] w-svw h-svh justify-center items-center z-10">
          <p
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              color: colors.textPrimary,
            }}
            className="font-drukHeavy text-textPrimary pointer-events-none"
          >
            Roamies
          </p>
        </div>
      ) : (
        <motion.div
          style={{ scale: scaleA, x: xA, y: yA }}
          className="flex py-[30rem] w-svw h-svh justify-center items-center"
        >
          <motion.p
            style={{ scale: scaleText, fontSize: 'clamp(3rem, 8vw, 6rem)', color: textColor }}
            className="font-drukHeavy text-textPrimary pointer-events-none"
          >
            Roamies
          </motion.p>
        </motion.div>
      )} */}
      <motion.div style={{ opacity: opacityB }} className="sticky inset-0 w-svw">
        <Features />
      </motion.div>
    </section>
  )
}
