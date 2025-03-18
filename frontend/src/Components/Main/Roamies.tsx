import Particles, { initParticlesEngine } from '@tsparticles/react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ISourceOptions } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'
import { colors } from 'constants/colors'
import { getIsMobile } from 'util/util'
import Features from './Features'

export default function Roamies() {
  const [init, setInit] = useState(false)
  const containerRef = useRef<HTMLElement>(null)
  const roamiesRef = useRef<HTMLParagraphElement>(null)
  const mRef = useRef<HTMLSpanElement>(null)
  const [isMobile, setIsMobile] = useState(getIsMobile())
  const [transformConfig, setTransformConfig] = useState({
    origin: '50% 50%',
    maxX: 0,
    maxScale: 75,
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getIsMobile())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const calculateTransform = () => {
      if (!roamiesRef.current || !mRef.current || !containerRef.current) return

      const roamiesRect = roamiesRef.current.getBoundingClientRect()
      const mRect = mRef.current.getBoundingClientRect()
      const containerRect = containerRef.current.getBoundingClientRect()

      // Calculate first leg position (approximately 30% into the 'm' character)
      const firstLegPosition = mRect.width * 0.156
      const mXRelative = mRect.left - roamiesRect.left + firstLegPosition

      // Convert to percentage for transform origin
      const originX = (mXRelative / roamiesRect.width) * 100

      // Calculate required movement to keep legs at screen edges
      const viewportWidth = containerRect.width
      const scaleFactor = transformConfig.maxScale
      const targetWidth = mRect.width * scaleFactor
      const requiredMovement = (viewportWidth - targetWidth) / 2 + firstLegPosition * scaleFactor

      setTransformConfig({
        origin: `${originX}% 50%`,
        maxX: requiredMovement,
        maxScale: 77,
      })
    }

    calculateTransform()
    window.addEventListener('resize', calculateTransform)
    return () => window.removeEventListener('resize', calculateTransform)
  }, [])

  const scaleA = useTransform(scrollYProgress, [0.17, 0.24], [1, transformConfig.maxScale])
  const scaleText = useTransform(scrollYProgress, [0.05, 0.17], [0.6, 1])
  const xA = useTransform(scrollYProgress, [0.17, 0.24], [0, -transformConfig.maxX])
  const textColor = useTransform(scrollYProgress, [0.22, 0.24], [colors.black, colors.offWhite])
  const opacityB = useTransform(scrollYProgress, [0.23, 0.27], [0, 1])

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
      fpsLimit: isMobile ? 60 : 120,
      interactivity: {
        detectOn: 'canvas',
        events: {
          onHover: {
            enable: false,
            mode: 'bubble',
          },
          onClick: {
            enable: !isMobile,
            mode: 'bubble',
          },
          resize: {
            enable: !isMobile,
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
        },
      },
      particles: {
        number: {
          value: isMobile ? 8 : 15,
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
          enable: !isMobile,
          mode: 'bounce',
        },
        size: {
          value: { min: isMobile ? 15 : 45, max: isMobile ? 50 : 200 },
          random: true,
          animation: {
            mode: 'random',
            enable: !isMobile,
            speed: 10,
            sync: false,
            startValue: 'random',
          },
        },
        move: {
          enable: true,
          speed: isMobile ? 1 : 3,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'in',
          bounce: true,
          attract: {
            enable: !isMobile,
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
    [isMobile],
  )

  return (
    <section
      id="solution"
      ref={containerRef}
      className="flex flex-col items-center relative w-svw overflow-x-clip overflow-y-clip"
    >
      {/* Background Particles */}
      {init && (
        <Particles
          id="tsparticles"
          options={options}
          className={`absolute inset-0 ${isMobile ? 'h-[500vh]' : ''}`}
        />
      )}

      {/* Content */}
      <div
        className="flex w-[60%] z-10 justify-center items-center"
        style={{ height: isMobile ? '100vh' : '', paddingTop: isMobile ? '' : '18rem' }}
      >
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
      {!getIsMobile() && (
        <motion.div
          style={{ scale: scaleA, x: xA, transformOrigin: transformConfig.origin }}
          className="flex py-[30rem] w-svw h-svh justify-center items-center"
        >
          <motion.p
            ref={roamiesRef}
            style={{
              scale: scaleText,
              fontSize: 'clamp(8vw, 8vw, 8vw)',
              color: textColor,
              lineHeight: 1,
            }}
            className="font-drukHeavy text-textPrimary pointer-events-none overflow-hidden"
          >
            {'Roamies'.split('').map((char, index) => (
              <span
                key={index}
                ref={char === 'm' ? mRef : undefined}
                style={{ display: 'inline-block' }}
              >
                {char}
              </span>
            ))}
          </motion.p>
        </motion.div>
      )}

      <motion.div
        style={{ opacity: isMobile ? 1 : opacityB }}
        className={`${isMobile ? 'w-svw' : 'sticky inset-0 w-svw justify-start'}`}
      >
        <Features />
      </motion.div>
    </section>
  )
}
