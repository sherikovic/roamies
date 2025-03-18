import ArrowDownShort from 'assets/icons/arrow-down-short.svg'
import { AnimatePresence, motion } from 'motion/react'
import QrCode from 'assets/images/qr-code.svg'
import { useEffect, useState } from 'react'
import { colors } from 'constants/colors'
import SVG from 'react-inlinesvg'
import { getIsMobile } from 'util/util'

export const About = () => {
  const [showQR, setShowQR] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (showQR) setShowQR(false)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [showQR])

  return (
    <section className="flex flex-col items-center w-svw h-svh background">
      <div className="flex flex-col flex-1 justify-between items-center w-full h-full mt-80 px-12 lg:max-w-[80vw] max-w-vw">
        {/* Headline */}
        <div className="flex flex-col justify-center items-center gap-10">
          <p
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            className="font-drukSuper text-offWhite z-10 text-center"
          >
            Turn Solo Travel into Shared Adventures
          </p>
          <p
            style={{ fontSize: 'clamp(1rem, 1.3vw, 2.5rem)' }}
            className="poppins-medium text-[#dfdbdb] z-10 text-center"
          >
            Discover events, meet like-minded travelers, and make plans instantly.
            <br />
            No endless chats—just real connections.
          </p>
        </div>

        {/* Button */}
        <div
          className="relative flex items-center z-30"
          style={{
            perspective: 1000,
          }}
        >
          <motion.button
            initial={{
              background: `linear-gradient(180deg, 
                          ${colors.orangeLight} 0%, 
                          ${colors.surfaceVariant} 30%, 
                          ${colors.orangeDark} 100%)`,
              backgroundSize: '200% 200%',
              backgroundPosition: '100% 100%',
              boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.2), 
                          0px -2px 4px rgba(255, 255, 255, 0.1)`,
              transformStyle: 'preserve-3d',
              transformPerspective: 2000,
              rotateX: 0,
              rotateY: 0,
              scale: 1,
            }}
            whileHover={{
              backgroundPosition: '115% 85%',
              scale: 1.01,
              boxShadow: `0px 23px 6px 0px rgba(255, 255, 255, 0.00),
                          0px 15px 6px 0px rgba(255, 255, 255, 0.01),
                          0px 8px 5px 0px rgba(255, 255, 255, 0.05),
                          0px 4px 4px 0px rgba(255, 255, 255, 0.09),
                          0px 1px 2px 0px rgba(255, 255, 255, 0.10)`,
              transition: {
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
              },
            }}
            onClick={() => {
              if (window.innerWidth < 640) {
                window.location.href =
                  'https://apps.apple.com/us/app/roamies-adventure-together/id6740840624'
              } else {
                setShowQR(!showQR)
              }
            }}
            className="poppins-semibold text-textPrimary lg:text-base cursor-pointer px-11 py-4 rounded-full"
          >
            Get the app
          </motion.button>

          {/* Overlay with QR Code */}
          <AnimatePresence>{showQR && <QrCodeOverlay />}</AnimatePresence>
        </div>

        {/* Scroll Down Arrow */}
        {!getIsMobile() && (
          <a
            href="#reasons"
            className="mb-5"
            onClick={(e) => {
              e.preventDefault()
              e.currentTarget.scrollIntoView({ behavior: 'auto', block: 'start' })
            }}
          >
            <SVG src={ArrowDownShort} className="arrow-down z-50" />
          </a>
        )}
      </div>
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-black/50 w-svw h-svh fixed inset-0 z-20"
            onClick={() => setShowQR(false)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

const QrCodeOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="qr-code-container"
    >
      <SVG src={QrCode} className="lg:w-44 lg:h-44 w-20 h-20" />
      <p className="poppins-medium text-base lg:text-lg text-center text-textPrimary">
        Scan the QR code to get the app
      </p>
    </motion.div>
  )
}
