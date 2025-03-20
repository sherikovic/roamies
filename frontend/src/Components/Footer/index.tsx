import { ModalOverlay, ModalContent, BurgerButton, LogoWrapper } from './styles'
import downloadApp from 'assets/images/download-app.svg'
import TermsOfServiceModal from './TermsOfServiceModal'
import { AnimatePresence, motion } from 'motion/react'
import PrivacyPolicyModal from './PrivacyPolicyModal'
import ContactUsModal from './ContactUsModal'
import { useEffect, useState } from 'react'
import logo from 'assets/images/icon.svg'
import { colors } from 'constants/colors'
import { lenis } from 'util/lenis'
import SVG from 'react-inlinesvg'

export default function Footer() {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState(false)
  const [isContactUsOpen, setIsContactUsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal()
    }

    if (isPrivacyModalOpen || isTermsOfServiceOpen || isContactUsOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isPrivacyModalOpen, isTermsOfServiceOpen, isContactUsOpen])

  const openModal = (modal: string) => {
    switch (modal) {
      case 'privacy':
        setIsPrivacyModalOpen(true)
        break
      case 'terms':
        setIsTermsOfServiceOpen(true)
        break
      case 'contact':
        setIsContactUsOpen(true)
        break
    }
    lenis.stop()
  }

  const closeModal = () => {
    setIsTermsOfServiceOpen(false)
    setIsPrivacyModalOpen(false)
    setIsContactUsOpen(false)
    lenis.start()
  }

  return (
    <div className="relative lg:px-16 lg:py-20 p-10 bg-black flex lg:flex-row flex-col lg:gap-0 gap-10 justify-between items-start">
      <div className="flex lg:flex-row flex-col lg:gap-40 gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center gap-5">
            <LogoWrapper>
              <SVG src={logo} />
            </LogoWrapper>
            <div className="flex flex-col items-start">
              <p className="font-drukHeavy lg:text-3xl text-background">
                Roamies <span className="lg:text-lg">&copy;</span>
              </p>
              <p className="poppins-medium lg:text-sm text-offWhite">
                Made with &hearts; from the world
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <FooterLink text="Privacy Policy" onClick={() => openModal('privacy')} />
          <FooterLink text="Terms Of Service" onClick={() => openModal('terms')} />
          <FooterLink text="Contact" onClick={() => openModal('contact')} />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="font-drukHeavy lg:text-2xl text-base text-background">Download</h2>
        <img
          src={downloadApp}
          alt="download app"
          className="z-10 w-40 cursor-pointer"
          onClick={() =>
            window.open(
              'https://apps.apple.com/us/app/roamies-adventure-together/id6740840624',
              '_blank',
            )
          }
        />
      </div>
      <AnimatePresence>
        {(isPrivacyModalOpen || isTermsOfServiceOpen || isContactUsOpen) && (
          <ModalOverlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              as={motion.div}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.4 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {isPrivacyModalOpen && <PrivacyPolicyModal closeModal={closeModal} />}
              {isTermsOfServiceOpen && <TermsOfServiceModal closeModal={closeModal} />}
              {isContactUsOpen && <ContactUsModal closeModal={closeModal} />}
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </div>
  )
}

export const BurgerIcon = ({
  color,
  isOpen,
  close,
}: {
  color?: string
  isOpen: boolean
  close: () => void
}) => {
  const topPathVariants = {
    closed: { d: 'M2 5 L22 5', rotate: 0, translateY: 0 },
    open: { d: 'M5 5 L19 19', rotate: 90, translateY: 8 },
  }

  const middlePathVariants = {
    closed: { d: 'M2 12 L22 12', opacity: 1 },
    open: { d: 'M5 12 L19 12', opacity: 0 },
  }

  const bottomPathVariants = {
    closed: { d: 'M2 19 L22 19', rotate: 0, translateY: 0 },
    open: { d: 'M5 19 L19 5', rotate: -90, translateY: -8 },
  }

  const springTransition = { type: 'spring', stiffness: 300, damping: 20 }

  return (
    <BurgerButton as={motion.button} onClick={close}>
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        whileHover={{ stroke: colors.background }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        stroke={color ? color : colors.onSurfaceVariant}
        strokeWidth="2"
      >
        <motion.path variants={topPathVariants} transition={springTransition} />
        <motion.path variants={middlePathVariants} transition={springTransition} />
        <motion.path variants={bottomPathVariants} transition={springTransition} />
      </motion.svg>
    </BurgerButton>
  )
}

const FooterLink = ({ text, onClick }: { text: string; onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      className="poppins-regular lg:text-lg cursor-pointer relative no-underline transition-colors duration-100 ease-in-out w-fit"
      initial={{ color: colors.background }}
      whileHover={{ color: colors.textSecondary }}
      transition={{ duration: 0.1 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
      <motion.span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '1px',
          backgroundColor: colors.textSecondary,
        }}
        animate={{
          scaleX: isHovered ? 1 : 0,
          transformOrigin: isHovered ? 'left' : 'right',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </motion.a>
  )
}
