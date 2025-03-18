import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Particle } from './Particle'
import './styles.css'

// Define your principles data array
const PRINCIPLES = [
  { title: '1-Tap Access', text: 'Instant event joining' },
  { title: 'No Group Bloat', text: 'Focus on experiences' },
  { title: 'Smart Creation', text: 'Effortless event setup' },
  { title: 'Personalized', text: 'Tailored to you' },
]

const PrinciplesOrbs = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const orbsRef = useRef<SVGSVGElement[]>([])

  // Initialize GSAP plugins
  gsap.registerPlugin(ScrollTrigger)

  // gsap.from('.principle-orb', {
  //   opacity: 0,
  //   scale: 0.8,
  //   stagger: 0.2,
  //   duration: 1,
  //   ease: 'power2.out',
  //   scrollTrigger: {
  //     trigger: '.orbs-container',
  //     start: 'top 80%',
  //     once: true,
  //   },
  // })

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = containerRef.current!.offsetWidth
      canvas.height = containerRef.current!.offsetHeight
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = window.innerWidth < 768 ? 30 : 100

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle(canvas, ctx))
      }
    }

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current.forEach((particle) => {
        particle.update()
        particle.draw()
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    // Initial setup
    updateCanvasSize()
    initParticles()
    animate()

    // Handle resize
    const handleResize = () => {
      updateCanvasSize()
      initParticles()
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Add shooting stars effect
  //   useEffect(() => {
  //     const container = containerRef.current
  //     if (!container) return

  //     const createStar = () => {
  //       const star = document.createElement('div')
  //       star.className = 'shooting-star'
  //       star.style.top = `${Math.random() * 100}%`
  //       star.style.left = `${Math.random() * 100}%`
  //       container.appendChild(star)

  //       star.addEventListener('animationend', () => {
  //         star.remove()
  //       })
  //     }

  //     const starInterval = setInterval(createStar, 3000)
  //     return () => clearInterval(starInterval)
  //   }, [])

  // Add morph animation
  useEffect(() => {
    orbsRef.current.forEach((orb) => {
      const circle = orb.querySelector('.orb-base')
      gsap.to(circle, {
        duration: 2,
        repeat: -1,
        yoyo: true,
        morphSVG: {
          shape: 'M 20,100 Q 100,20 180,100 Q 100,180 20,100',
          type: 'rotational',
        },
        ease: 'power1.inOut',
      })
    })
  }, [])

  return (
    <section ref={containerRef} className="principles-container mt-52">
      <canvas ref={canvasRef} className="particles-canvas" />

      <div className="orbs-wrapper">
        <div className="orbs-container">
          {PRINCIPLES.map((principle, index) => (
            <svg
              key={principle.title}
              ref={(el) => {
                if (el) orbsRef.current[index] = el
              }}
              className="principle-orb"
              viewBox="0 0 200 200"
            >
              <circle className="orb-base" cx="100" cy="100" r="80" />
              <foreignObject x="20" y="20" width="160" height="160">
                <div className="orb-content">
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </div>
              </foreignObject>
            </svg>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PrinciplesOrbs
