import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PRINCIPLES = [
  { title: '1-Tap Access', text: 'Instant event joining' },
  { title: 'No Group Bloat', text: 'Focus on experiences' },
  { title: 'Smart Creation', text: 'Effortless event setup' },
  { title: 'Personalized', text: 'Tailored to you' },
]

export const VerticalTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const orbsRef = useRef<(HTMLDivElement | null)[]>([])
  const connectorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate connector line
    gsap.to(connectorRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.5,
      },
      opacity: 0.5,
      height: '100%',
    })

    // Animate orbs with proper stagger
    orbsRef.current.forEach((orb) => {
      if (!orb) return

      gsap.fromTo(
        orb,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: orb,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 0.5,
            markers: true, // Remove in production
          },
        },
      )
    })
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate orbs
    orbsRef.current.forEach((orb) => {
      gsap.from(orb, {
        scrollTrigger: {
          trigger: orb,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
        opacity: 0,
        y: 50,
        duration: 1,
      })
    })

    // Animate connector line
    gsap.to(connectorRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
      opacity: 1,
    })
  }, [])

  return (
    <div ref={containerRef} className="principles-container">
      <div ref={connectorRef} className="timeline-connector" />

      <div className="orbs-container">
        {PRINCIPLES.map((principle, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) {
                orbsRef.current[i] = el
                // Temporary debug border
                el.style.border = '2px solid red'
              }
            }}
            className="principle-orb"
          >
            <div className="orb-content">
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
