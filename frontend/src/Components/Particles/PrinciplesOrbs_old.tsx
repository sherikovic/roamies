import { useEffect, useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

const PRINCIPLES = [
  { title: '1-Tap Access', text: 'Instant event joining' },
  { title: 'No Group Bloat', text: 'Focus on experiences' },
  { title: 'Smart Creation', text: 'Effortless event setup' },
  { title: 'Personalized', text: 'Tailored to you' },
]

const PrinciplesOrbs = ({ scrollProgress }) => {
  const orbsRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])

  const scaleOrbs = useTransform(scrollProgress, [0.5, 1], [0.8, 1])
  const opacityOrbs = useTransform(scrollProgress, [0.5, 1], [0.3, 1])

  useEffect(() => {
    orbsRefs.current.forEach((orb) => {
      if (!orb) return

      // Animate the orbs appearing smoothly
      gsap.fromTo(
        orb,
        { opacity: 0.3, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: orb,
            start: 'top center',
            end: 'top center',
            scrub: true,
          },
        },
      )
    })

    lineRefs.current.forEach((line) => {
      if (!line) return

      // Animate the lines appearing progressively between orbs
      gsap.fromTo(
        line,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: line,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        },
      )
    })
  }, [])

  return (
    <section className="principles-container">
      <div className="orbs-wrapper">
        <div className="orbs-container">
          {PRINCIPLES.map((principle, index) => (
            <div key={index} className="orb-group">
              {index > 0 && (
                <motion.div
                  ref={(el) => (lineRefs.current[index - 1] = el)}
                  className="progress-line"
                />
              )}
              <motion.div
                ref={(el) => (orbsRefs.current[index] = el)}
                style={{ scale: scaleOrbs, opacity: opacityOrbs }}
                className="orb-item"
              >
                <div className="orb">
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PrinciplesOrbs
