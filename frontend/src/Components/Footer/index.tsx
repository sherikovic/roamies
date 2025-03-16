import downloadApp from 'assets/images/download-app.svg'
import { AnimatePresence, motion } from 'motion/react'
import PrivacyPolicyModal from './PrivacyPolicyModal'
import styled from 'styled-components/macro'
import { useEffect, useState } from 'react'
import logo from 'assets/images/icon.svg'
import { lenis } from 'util/lenis'
import SVG from 'react-inlinesvg'
import TermsOfServiceModal from './TermsOfServiceModal'
import ContactUsModal from './ContactUsModal'

const theme = {
  primary: '#004089',
  background: '#FFFFFF',
  textPrimary: '#333333',
  textSecondary: '#6C757D',
  backdrop: '#000000FF',
  surface: '#F8F9FA',
  surfaceVariant: '#D4D4D4',
  onSurface: '#6C757D',
  onSurfaceVariant: '#404040',
  outline: '#A5A4A4',
}

export default function Footer() {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState(false)
  const [isContactUsOpen, setIsContactUsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal()
    }

    if (isPrivacyModalOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isPrivacyModalOpen])

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
    setIsPrivacyModalOpen(false)
    setIsTermsOfServiceOpen(false)
    setIsContactUsOpen(false)
    lenis.start()
  }

  return (
    <div className="relative px-32 py-10 bg-offWhite flex justify-between items-start">
      <div className="flex gap-40">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center gap-5">
            <SVG src={logo} id="logo-elem" className="logo-large" />
            <p className="poppins-semibold lg:text-lg text-black">2025 Roamies &copy;</p>
          </div>
          <p className="poppins-medium lg:text-sm text-[#5a5a5a]">
            Made with &hearts; from the world
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <FooterLink onClick={() => openModal('privacy')}>Privacy Policy</FooterLink>
          <FooterLink onClick={() => openModal('terms')}>Terms Of Service</FooterLink>
          <FooterLink onClick={() => openModal('contact')}>Contact Us</FooterLink>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <img
          src={downloadApp}
          alt="download app"
          className="z-10 w-48 cursor-pointer"
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 1000;
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div`
  background: ${theme.background};
  height: 90vh;
  width: 90%;
  max-width: 1200px;
  // padding: 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const FooterLink = styled.a`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${theme.textPrimary};
  cursor: pointer;
  position: relative;
  text-decoration: none;
  transition: color 0.3s ease;
  width: fit-content;

  &:hover {
    color: ${theme.textSecondary};
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 1px;
    background-color: ${theme.textSecondary};
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }
`
