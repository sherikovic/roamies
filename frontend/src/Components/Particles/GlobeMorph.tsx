import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const GlobeMorph = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scene = useRef(new THREE.Scene()).current
  const camera = useRef(new THREE.PerspectiveCamera(75, 1, 0.1, 1000)).current
  const renderer = useRef<THREE.WebGLRenderer>()
  const globe = useRef<THREE.Mesh>()
  const orbs = useRef<THREE.Mesh[]>([])
  const animationId = useRef<number>()

  // Memoize positions array to prevent recreation on re-renders
  const positions = useMemo(
    () => [
      new THREE.Vector3(0, 3, 0),
      new THREE.Vector3(3, 0, 0),
      new THREE.Vector3(0, -3, 0),
      new THREE.Vector3(-3, 0, 0),
    ],
    [],
  )

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Capture current ref values for cleanup
    const container = containerRef.current
    const currentCamera = camera
    const currentScene = scene
    let currentRenderer: THREE.WebGLRenderer | undefined

    if (!container) return

    // Initialize Three.js
    const initThree = () => {
      currentRenderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      })
      renderer.current = currentRenderer
      const rendererElem = currentRenderer.domElement
      rendererElem.style.position = 'fixed'
      rendererElem.style.top = '0'
      rendererElem.style.left = '0'
      rendererElem.style.zIndex = '0'
      container.appendChild(rendererElem)

      currentCamera.position.z = 10
      currentRenderer.setSize(window.innerWidth, window.innerHeight)
      currentRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    // Create 3D objects
    const createObjects = () => {
      const globeGeometry = new THREE.SphereGeometry(2, 32, 32)
      const globeMaterial = new THREE.MeshPhongMaterial({
        color: 0x2194ce,
        transparent: true,
        opacity: 0.9,
      })
      globe.current = new THREE.Mesh(globeGeometry, globeMaterial)
      currentScene.add(globe.current)

      const orbGeometry = new THREE.SphereGeometry(0.3, 16, 16)
      const orbMaterial = new THREE.MeshPhongMaterial({ color: 0xff4081 })

      positions.forEach((pos, index) => {
        const orb = new THREE.Mesh(orbGeometry, orbMaterial)
        orb.position.copy(globe.current!.position)
        orb.visible = true
        currentScene.add(orb)
        orbs.current[index] = orb
      })
    }

    // Setup lighting
    const setupLighting = () => {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      currentScene.add(ambientLight)
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(5, 5, 5)
      currentScene.add(directionalLight)
    }

    // Animation setup
    const setupAnimation = () => {
      if (!globe.current || orbs.current.length === 0) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top center',
          end: '+=200%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      tl.to(globe.current.scale, {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        duration: 2,
      }).to(
        orbs.current,
        {
          duration: 3,
          onUpdate: function () {
            const progress = this.progress()
            orbs.current.forEach((orb, index) => {
              const start = globe.current!.position.clone()
              const end = positions[index]
              orb.position.lerpVectors(start, end, progress)
            })
          },
        },
        0,
      )
    }

    // Animation loop
    const animate = () => {
      animationId.current = requestAnimationFrame(animate)
      if (globe.current) globe.current.rotation.y += 0.005
      renderer.current?.render(currentScene, currentCamera)
    }

    // Handle resize
    const onResize = () => {
      currentCamera.aspect = window.innerWidth / window.innerHeight
      currentCamera.updateProjectionMatrix()
      renderer.current?.setSize(window.innerWidth, window.innerHeight)
    }

    // Initialization sequence
    initThree()
    createObjects()
    setupLighting()
    setupAnimation()
    animate()
    window.addEventListener('resize', onResize)

    // Cleanup function
    return () => {
      window.removeEventListener('resize', onResize)
      if (animationId.current) cancelAnimationFrame(animationId.current)

      // Use captured values for cleanup
      if (currentRenderer && container) {
        currentRenderer.dispose()
        container.removeChild(currentRenderer.domElement)
      }

      // Cleanup Three.js objects
      while (currentScene.children.length > 0) {
        const child = currentScene.children[0]
        currentScene.remove(child)
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose()
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose())
          } else {
            child.material.dispose()
          }
        }
      }
    }
  }, [camera, positions, scene]) // Proper dependencies

  return (
    <div
      ref={containerRef}
      className="globe-morph-container"
      style={{ position: 'relative', zIndex: 0 }}
    />
  )
}

export default GlobeMorph
