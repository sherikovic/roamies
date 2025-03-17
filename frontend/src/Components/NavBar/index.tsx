import { ModalContent, ModalOverlay } from 'Components/Footer/styles'
import ContactUsModal from 'Components/Footer/ContactUsModal'
import { AnimatePresence, motion } from 'motion/react'
import { BurgerIcon } from 'Components/Footer'
import logo from 'assets/images/icon.svg'
import { colors } from 'constants/colors'
import { getIsMobile } from 'util/util'
import SVG from 'react-inlinesvg'
import { useState } from 'react'
import './styles.css'

const NavBar = () => {
  const isMobile = getIsMobile()
  const [barOpen, setBarOpen] = useState(false)
  const [isContactUsOpen, setIsContactUsOpen] = useState(false)

  return (
    <section className="nav-bar">
      <motion.nav
        className={`nav-container z-[2000] ${isMobile ? 'mobile' : ''}`}
        animate={{ height: isMobile ? (barOpen ? '200px' : '50px') : 'auto' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {isMobile ? (
          <>
            <>
              <a href="/" className="flex gap-2 items-center poppins-medium text-sm cursor-pointer">
                <SVG src={logo} className="logo" />
                {!isMobile && 'Roamies'}
              </a>
              <BurgerIcon
                color={colors.outline}
                isOpen={barOpen}
                close={() => setBarOpen(!barOpen)}
              />
            </>
            {barOpen && (
              <motion.div
                className="mobile-nav-links"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <a
                  href="#about"
                  className="poppins-medium text-sm"
                  onClick={() => setBarOpen(false)}
                >
                  About
                </a>
                <a
                  href="#features"
                  className="poppins-medium text-sm"
                  onClick={() => setBarOpen(false)}
                >
                  Features
                </a>
                <button
                  className="poppins-medium text-sm"
                  onClick={() => {
                    setBarOpen(false)
                    setIsContactUsOpen(true)
                  }}
                >
                  Contact
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <>
            <a href="/" className="flex gap-2 items-center poppins-medium text-sm cursor-pointer">
              <SVG src={logo} className="logo" />
              {!isMobile && 'Roamies'}
            </a>
            <div className="nav-links">
              <a
                className="poppins-medium text-sm"
                href="#about"
                onClick={(e) => {
                  e.preventDefault()
                  document
                    .querySelector('#about')
                    ?.scrollIntoView({ behavior: 'auto', block: 'start' })
                }}
              >
                About
              </a>
              <a
                className="poppins-medium text-sm"
                href="#features"
                onClick={(e) => {
                  e.preventDefault()
                  document
                    .querySelector('#features')
                    ?.scrollIntoView({ behavior: 'auto', block: 'start' })
                }}
              >
                Features
              </a>
              <button onClick={() => setIsContactUsOpen(true)} className="poppins-medium text-sm">
                Contact
              </button>
            </div>
          </>
        )}
      </motion.nav>
      {barOpen && (
        <ModalOverlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setBarOpen(false)}
        />
      )}
      <AnimatePresence>
        {isContactUsOpen && (
          <ModalOverlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsContactUsOpen(false)}
          >
            <ModalContent
              as={motion.div}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.4 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <ContactUsModal closeModal={() => setIsContactUsOpen(false)} />
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </section>
  )
}

export default NavBar
