import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const MoleculeExplosion = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scene = useRef(new THREE.Scene()).current
  const camera = useRef(new THREE.PerspectiveCamera(75, 1, 0.1, 1000)).current
  const renderer = useRef<THREE.WebGLRenderer>()
  const molecule = useRef<THREE.Group>()
  const particles = useRef<THREE.Points>()
  const animationId = useRef<number>()

  // Memoized configuration
  const config = useMemo(
    () => ({
      atomColors: [0x3f51b5, 0xff4081, 0x4caf50, 0xffc107],
      atomPositions: [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(2, 2, 0),
        new THREE.Vector3(-2, 2, 0),
        new THREE.Vector3(0, -2, 0),
      ],
      explodePositions: [
        new THREE.Vector3(-4, 3, 0), // Principle 1
        new THREE.Vector3(4, 3, 0), // Principle 2
        new THREE.Vector3(-4, -3, 0), // Principle 3
        new THREE.Vector3(4, -3, 0), // Principle 4
      ],
      particleCount: 1000,
    }),
    [],
  )

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!containerRef.current) return

    // Setup Three.js
    const setupThree = () => {
      renderer.current = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      })
      renderer.current.setSize(window.innerWidth, window.innerHeight)
      renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      containerRef.current?.appendChild(renderer.current.domElement)

      camera.position.z = 15
      camera.lookAt(0, 0, 0)
    }

    // Create molecular structure
    const createMolecule = () => {
      molecule.current = new THREE.Group()

      // Create atoms
      config.atomPositions.forEach((pos, i) => {
        const geometry = new THREE.SphereGeometry(0.5, 32, 32)
        const material = new THREE.MeshPhongMaterial({
          color: config.atomColors[i],
          shininess: 100,
        })
        const atom = new THREE.Mesh(geometry, material)
        atom.position.copy(pos)
        molecule.current?.add(atom)
      })

      // Create bonds
      const bondGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1)
      const bondMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })

      // Central bonds
      for (let i = 1; i < config.atomPositions.length; i++) {
        const bond = new THREE.Mesh(bondGeometry, bondMaterial)
        const direction = new THREE.Vector3()
          .subVectors(config.atomPositions[i], config.atomPositions[0])
          .normalize()
        bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction)
        bond.position.copy(config.atomPositions[0])
        bond.scale.y = config.atomPositions[0].distanceTo(config.atomPositions[i])
        molecule.current.add(bond)
      }

      scene.add(molecule.current)
    }

    // Create particle field
    const createParticles = () => {
      const positions = new Float32Array(config.particleCount * 3)
      for (let i = 0; i < config.particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10
        positions[i + 1] = (Math.random() - 0.5) * 10
        positions[i + 2] = (Math.random() - 0.5) * 10
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      const material = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x888888,
        transparent: true,
        opacity: 0.5,
      })

      particles.current = new THREE.Points(geometry, material)
      scene.add(particles.current)
    }

    // Setup lighting
    const setupLighting = () => {
      const ambient = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambient)

      const directional = new THREE.DirectionalLight(0xffffff, 1)
      directional.position.set(5, 5, 5)
      scene.add(directional)
    }

    // Animation setup
    const setupAnimation = () => {
      if (!molecule.current) return

      const atoms = molecule.current.children.filter((child) => child instanceof THREE.Mesh)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: '+=200%',
          scrub: 1,
          pin: true,
        },
      })

      // Molecule rotation
      tl.to(
        molecule.current.rotation,
        {
          y: Math.PI * 2,
          duration: 10,
        },
        0,
      )

      // Explosion animation
      atoms.forEach((atom, i) => {
        tl.to(
          atom.position,
          {
            x: config.explodePositions[i].x,
            y: config.explodePositions[i].y,
            z: 0,
            duration: 3,
          },
          0,
        )
      })

      // Particle animation
      tl.to(
        particles.current ? particles.current.rotation : { x: 0, y: 0, z: 0 },
        {
          x: Math.PI * 2,
          y: Math.PI * 2,
          duration: 10,
        },
        0,
      )
    }

    // Animation loop
    const animate = () => {
      animationId.current = requestAnimationFrame(animate)
      if (particles.current && particles.current.rotation) {
        particles.current.rotation.y += 0.001
      }
      renderer.current?.render(scene, camera)
    }

    // Initialization
    setupThree()
    createMolecule()
    createParticles()
    setupLighting()
    setupAnimation()
    animate()

    // Cleanup
    return () => {
      if (animationId.current) cancelAnimationFrame(animationId.current)
      if (renderer.current) {
        renderer.current.dispose()
        containerRef.current?.removeChild(renderer.current.domElement)
      }
      scene.clear()
    }
  }, [config, scene, camera])

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />
}

export default MoleculeExplosion
