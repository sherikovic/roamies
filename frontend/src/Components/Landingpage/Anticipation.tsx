// export default function Anticipation() {
//   return (
//     <section className="flex relative h-svh w-full bg-white">
//       <div className="flex w-[60%] mx-auto items-center justify-center">
//         <p className="font-drukMedium text-black text-xs lg:text-6xl text-center">
//           So we created something.
//           <br />
//           Something we believe makes a difference.
//         </p>
//       </div>
//     </section>
//   )
// }

// export default function Anticipation() {
//   return (
//     <section className="flex relative h-svh w-full bg-white z-50">
//       <div className="absolute inset-0 bg-gradient animate-gradient" />
//       <div className="flex w-[60%] mx-auto items-center justify-center z-50">
//         <p className="font-drukMedium text-black text-xs lg:text-6xl text-center">
//           So we created something.
//           <br />
//           Something we believe makes a difference.
//         </p>
//       </div>
//     </section>
//   )
// }

// export default function Anticipation() {
//   return (
//     <section className="anticipation-section">
//       <div className="lines-overlay"></div>
//       <div className="content-container">
//         <p className="font-drukMedium text-black text-xs lg:text-6xl text-center">
//           So we created something.
//           <br />
//           Something we believe makes a difference.
//         </p>
//       </div>
//     </section>
//   )
// }

// export default function Anticipation() {
//   return (
//     <section className="flex relative h-svh w-full bg-white items-center justify-center">
//       <motion.p
//         className="font-drukMedium text-black text-xs lg:text-6xl text-center"
//         initial={{ scale: 1, textShadow: '2px 2px 0px rgba(0,0,0,0.2)' }}
//         whileHover={{
//           scale: 1.05,
//           textShadow: '6px 6px 0px rgba(0,0,0,0.2)',
//           transition: { duration: 0.3, ease: 'easeInOut' },
//         }}
//       >
//         So we created something.
//         <br />
//         Something we believe makes a difference.
//       </motion.p>
//     </section>
//   )
// }

// export default function Anticipation() {
//   return (
//     <section className="flex relative h-svh w-full bg-white overflow-hidden">
//       {/* Animated lines pattern */}
//       <motion.div
//         animate={{
//           x: ['-100%', '100%'],
//         }}
//         transition={{
//           duration: 2,
//           repeat: Infinity,
//           repeatType: 'loop',
//         }}
//         className="absolute inset-0 opacity-15"
//       >
//         {[...Array(12)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute h-px bg-gradient-to-r from-transparent via-black to-transparent"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               width: `${Math.random() * 40 + 20}%`,
//               animation: `drift ${Math.random() * 8 + 4}s infinite linear`,
//             }}
//           />
//         ))}
//       </motion.div>

//       {/* Content */}
//       <div className="flex w-[60%] mx-auto items-center justify-center relative">
//         <p className="font-drukMedium text-black text-xs lg:text-6xl text-center">
//           So we created something.
//           <br />
//           Something we believe makes a difference.
//         </p>
//       </div>
//     </section>
//   )
// }

import { ISourceOptions } from '@tsparticles/engine'
import { loadPolygonMaskPlugin } from '@tsparticles/plugin-polygon-mask'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useEffect, useMemo, useState } from 'react'
import { tsParticles } from '@tsparticles/engine'

// const colors = ['#60A5FA', '#EC4899', '#8B5CF6'] // Blue, Pink, Purple

export default function Anticipation() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
      await loadPolygonMaskPlugin(tsParticles)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: '#fff',
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
          value: '#ffa600',
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: 0.1,
          random: true,
          animation: {
            enable: true,
            speed: 3,
            opacity_min: 0.03,
            sync: true,
          },
        },
        collisions: {
          enable: true,
          mode: 'bounce',
        },
        size: {
          value: 100,
          random: true,
          animation: {
            mode: 'random',
            enable: true,
            speed: 80,
            startValue: 'max',
          },
        },
        move: {
          enable: true,
          speed: 2,
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

  return (
    <section className="flex relative h-svh w-full bg-white overflow-hidden">
      {/* Background Particles */}
      {init && <Particles id="tsparticles" options={options} className="absolute inset-0" />}
      {/* Content */}
      <div className="flex w-[60%] mx-auto items-center justify-center relative z-10">
        <p className="font-drukMedium text-black text-xs lg:text-6xl text-center">
          So we created something.
          <br />
          Something we believe makes a difference.
        </p>
      </div>
    </section>
  )
}
