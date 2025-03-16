import styled from 'styled-components/macro'
import { colors } from 'constants/colors'
import { motion } from 'motion/react'

export const BurgerButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  z-index: 999;
`

export const ModalOverlay = styled.div`
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

export const ModalContent = styled.div`
  background: ${colors.background};
  height: 90vh;
  width: 90%;
  max-width: 1200px;
  // padding: 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const FooterLink = styled.a`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${colors.textPrimary};
  cursor: pointer;
  position: relative;
  text-decoration: none;
  transition: color 0.3s ease;
  width: fit-content;

  &:hover {
    color: ${colors.textSecondary};
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 1px;
    background-color: ${colors.textSecondary};
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }
`

export const TOCContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: ${colors.background};
  padding: 0px 0px 20px;
  box-shadow: 4px 0 16px rgba(0, 0, 0, 0.1);
  z-index: 999;
`

export const TOCHeader = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 600;
  padding: 120px 20px 80px;
  margin: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 147, 0, 1) 0%,
    rgba(247, 186, 67, 1) 35%,
    rgba(254, 254, 254, 1) 100%
  );
`

export const TOCList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
  margin: 0;
  list-style: none;
`

export const TOCOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  z-index: 998;
`

export const TOCItem = styled.li`
  padding: 4px 0;
`

export const TOCLink = styled.a`
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: ${colors.onSurfaceVariant};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.primary};
    text-decoration: underline;
  }
`

export const Header = styled(motion.div)`
  position: relative;
  background: ${colors.background};
  padding: 12px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background: linear-gradient(
    180deg,
    rgba(255, 147, 0, 1) 0%,
    rgba(247, 186, 67, 1) 35%,
    rgba(254, 254, 254, 1) 100%
  );
`

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  left: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
`

export const ScrollContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 100px 32px;
  gap: 30px;
  overflow-y: auto;
  &[data-lenis-prevent] {
    overscroll-behavior: contain;
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: ${colors.background};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.surface};
    border-radius: 4px;
    &:hover {
      background: ${colors.surfaceVariant};
    }
  }
`

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 40px 0;
`

export const HeaderPrimary = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 30px;
  color: ${colors.textPrimary};
  margin: 0;
  font-weight: 600;
`

export const HeaderSecondary = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: ${colors.textSecondary};
  margin: 0;
  font-weight: 500;
`

export const ContentSection = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: column;
`

export const PrimaryText = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: ${colors.textPrimary};
  margin: 0;
  font-weight: 600;
`

export const SecondaryText = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: ${colors.textSecondary};
  line-height: 30px;
  margin: 0;
  white-space: pre-wrap;
`

export const BoldText = styled.span`
  font-weight: 600;
`

export const Separator = styled.hr`
  width: 80vw;
  border: 0;
  border-top: 1px solid ${colors.outline};
  margin: 12px 0;
  margin-bottom: 0;
`
