import ArrowDownShort from 'assets/icons/arrow-down-short.svg'
import { AnimatePresence, motion } from 'motion/react'
import QrCode from 'assets/images/qr-code.svg'
import SVG from 'react-inlinesvg'
import { useState } from 'react'

export const About = () => {
  const [showQR, setShowQR] = useState(false)

  return (
    <section className="flex flex-col items-center w-svw h-svh background">
      <div className="flex flex-col flex-1 justify-between items-center w-full h-full mt-80 px-20 lg:max-w-[80vw] max-w-vw">
        {/* Headline */}
        <div className="flex flex-col justify-center items-center gap-10">
          <p className="font-drukSuper text-lg lg:text-4xl text-[#f2eeee] z-10 text-center">
            Turn Solo Travel into Shared Adventures
          </p>
          <p className="poppins-medium text-base lg:text-xl text-[#dfdbdb] z-10 text-center">
            Discover events, meet like-minded travelers, and make plans instantly.
            <br />
            No endless chats—just real connections.
          </p>
        </div>

        {/* Button */}
        <div className="relative flex items-center z-30">
          <motion.button
            initial={{ backgroundColor: '#ffa600' }}
            whileHover={{ backgroundColor: '#cf9b3a' }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              if (window.innerWidth < 640) {
                window.location.href =
                  'https://apps.apple.com/us/app/roamies-adventure-together/id6740840624'
              } else {
                setShowQR(!showQR)
              }
            }}
            className="poppins-semibold text-black lg:text-base cursor-pointer px-11 py-4 rounded-full shadow-sm shadow-[#302e2e]"
          >
            Get the app
          </motion.button>
          {/* Overlay with QR Code */}
          <AnimatePresence>{showQR && <QrCodeOverlay />}</AnimatePresence>
        </div>

        {/* Scroll Down Arrow */}
        <a
          href="#jump-down"
          className="mb-5"
          onClick={(e) => {
            e.preventDefault()
            e.currentTarget.scrollIntoView({ behavior: 'auto', block: 'start' })
          }}
        >
          <SVG src={ArrowDownShort} className="arrow-down z-50" />
        </a>
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
      <p className="poppins-medium text-base lg:text-lg text-center text-black">
        Scan the QR code to get the app
      </p>
    </motion.div>
  )
}
