import { motion, AnimatePresence } from 'motion/react'
import styled from 'styled-components/macro'
import { useState } from 'react'
import { BurgerIcon } from '.'

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

const TOC_SECTIONS = [
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use-your-information', title: 'How We Use Your Information' },
  { id: 'access-and-control-over-your-data', title: 'Access and Control Over Your Data' },
  { id: 'data-security', title: 'Data Security' },
  { id: 'permissions-we-request', title: 'Permissions We Request' },
  { id: 'third-party-authentication', title: 'Third-Party Authentication' },
  { id: 'your-rights', title: 'Your Rights' },
  { id: 'changes-to-this-privacy-policy', title: 'Changes to This Privacy Policy' },
  { id: 'contact-us', title: 'Contact Us' },
]

const PrivacyPolicyModal = ({ closeModal }: { closeModal: () => void }) => {
  const [isTocOpen, setIsTocOpen] = useState(false)

  const TableOfContents = () => (
    <TOCContainer
      as={motion.div}
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
    >
      <TOCHeader className="poppins-semibold text-black mb-10">Jump to section..</TOCHeader>
      <TOCList>
        {TOC_SECTIONS.map((item, index) => (
          <TOCItem key={index}>
            <TOCLink href={`#${item.id}`} onClick={() => setIsTocOpen(false)}>
              {item.title}
            </TOCLink>
          </TOCItem>
        ))}
      </TOCList>
    </TOCContainer>
  )

  return (
    <>
      <Header>
        <CloseButton onClick={closeModal}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.onSurfaceVariant}
          >
            <path strokeWidth="2" d="M18 6L6 18M6 6l12 12" />
          </svg>
        </CloseButton>
        <BurgerIcon isOpen={isTocOpen} close={() => setIsTocOpen(!isTocOpen)} />
        <HeaderSection>
          <HeaderPrimary>Privacy Policy</HeaderPrimary>
          <HeaderSecondary>Last updated: January 23, 2025</HeaderSecondary>
        </HeaderSection>
      </Header>

      <AnimatePresence>
        {isTocOpen && (
          <>
            <TOCOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'tween', duration: 0.3 }}
              onClick={() => setIsTocOpen(false)}
            />
            <TableOfContents />
          </>
        )}
      </AnimatePresence>

      <ScrollContent data-lenis-prevent="true" id="scrollable-content">
        {/* Content Sections */}
        <ContentSection id={TOC_SECTIONS[0].id}>
          <PrimaryText>{TOC_SECTIONS[0].title}</PrimaryText>
          <SecondaryText>
            We collect basic information that you provide to us when registering on our platform.
            This includes your name, email, and any other details you provide in your profile or
            interactions with the platform. Additionally, we may collect data related to your
            activity on the platform, including events you participate in, trips you organize, and
            other content you post.
          </SecondaryText>
        </ContentSection>

        <ContentSection id={TOC_SECTIONS[1].id}>
          <PrimaryText>{TOC_SECTIONS[1].title}</PrimaryText>
          <SecondaryText>
            The information we collect is stored securely in our databases and is primarily used to
            operate and improve the platform. This data helps us enhance user experience, improve
            features, and conduct analytics. We do not sell or share your personal information with
            third parties for marketing purposes.
          </SecondaryText>
        </ContentSection>

        <ContentSection id={TOC_SECTIONS[2].id}>
          <PrimaryText>{TOC_SECTIONS[2].title}</PrimaryText>
          <SecondaryText>
            You have the right to view, edit, and delete your personal data. You can update your
            profile, events, and trips at any time. If you wish to delete your account or any other
            data, you may do so by following the instructions in the platform settings or contacting
            us directly.
          </SecondaryText>
        </ContentSection>

        <ContentSection id={TOC_SECTIONS[3].id}>
          <PrimaryText>{TOC_SECTIONS[3].title}</PrimaryText>
          <SecondaryText>
            We take the security of your personal data seriously. We use secure storage methods to
            manage your login credentials and session data. We do not share your credentials with
            any third party and ensure your data is kept private.
          </SecondaryText>
        </ContentSection>

        <ContentSection id={TOC_SECTIONS[4].id}>
          <PrimaryText>{TOC_SECTIONS[4].title}</PrimaryText>
          <SecondaryText>
            To provide a better service, we may request the following permissions from you:
            {'\n'}
            <BoldText>• Location:</BoldText> We ask for permission to track your location to enhance
            certain services and features, such as finding nearby events or trip locations.{'\n'}
            <BoldText>• Gallery:</BoldText> If you wish to upload photos, we will ask for permission
            to access your device’s gallery.{'\n'}
            <BoldText>• Calendar:</BoldText> To save event data, we request access to your calendar
            to add upcoming events.
            {'\n'}
            <BoldText>• Notifications:</BoldText> We may send you notifications related to the
            platform, such as event reminders or updates. You can choose to opt out of these
            notifications at any time.{'\n\n'}You are free to deny these permissions; however,
            opting out may limit your access to certain features of the platform.
          </SecondaryText>
        </ContentSection>

        <ContentSection id={TOC_SECTIONS[5].id}>
          <PrimaryText>{TOC_SECTIONS[5].title}</PrimaryText>
          <SecondaryText>
            We use Google Authentication to verify your identity when you log in. We do not share
            your personal data with Google or any third parties beyond the necessary authentication
            process. We do not allow third parties to access or process your personal information
            unless explicitly stated.
          </SecondaryText>
        </ContentSection>

        <ContentSection id={TOC_SECTIONS[6].id}>
          <PrimaryText>{TOC_SECTIONS[6].title}</PrimaryText>
          <SecondaryText>
            You have the right to access, modify, or delete any personal information stored by us.
            If you wish to review, change, or delete your personal data, please contact us through
            the platform or via the provided contact information.
          </SecondaryText>
        </ContentSection>

        <ContentSection id={TOC_SECTIONS[7].id}>
          <PrimaryText>{TOC_SECTIONS[7].title}</PrimaryText>
          <SecondaryText>
            We may update this Privacy Policy from time to time. If we make any significant changes,
            we will notify you through the platform or via email. Your continued use of the platform
            after such updates will be considered acceptance of the new Privacy Policy.
          </SecondaryText>
        </ContentSection>

        <ContentSection id={TOC_SECTIONS[8].id}>
          <PrimaryText>{TOC_SECTIONS[8].title}</PrimaryText>
          <SecondaryText>
            If you have any questions about this Privacy Policy or our data practices, please
            contact us at:
            <span className="font-medium">Email:</span> support@roamies.xyz.
          </SecondaryText>
        </ContentSection>
      </ScrollContent>
    </>
  )
}

const TOCContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: ${theme.background};
  padding: 0px 0px 20px;
  box-shadow: 4px 0 16px rgba(0, 0, 0, 0.1);
  z-index: 999;
`

const TOCHeader = styled.h1`
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

const TOCList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
  margin: 0;
  list-style: none;
`

const TOCOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  z-index: 998;
`

const TOCItem = styled.li`
  padding: 4px 0;
`

const TOCLink = styled.a`
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: ${theme.onSurfaceVariant};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.primary};
    text-decoration: underline;
  }
`

const Header = styled(motion.div)`
  position: relative;
  background: ${theme.background};
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

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  left: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
`

const ScrollContent = styled.div`
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
    background: ${theme.background};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.surface};
    border-radius: 4px;
    &:hover {
      background: ${theme.surfaceVariant};
    }
  }
`

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 40px 0;
`

const HeaderPrimary = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 30px;
  color: ${theme.textPrimary};
  margin: 0;
  font-weight: 600;
`

const HeaderSecondary = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: ${theme.textSecondary};
  margin: 0;
  font-weight: 500;
`

const ContentSection = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: column;
`

const PrimaryText = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: ${theme.textPrimary};
  margin: 0;
  font-weight: 600;
`

const SecondaryText = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: ${theme.textSecondary};
  line-height: 30px;
  margin: 0;
  white-space: pre-wrap;
`

const BoldText = styled.span`
  font-weight: 700;
`

export default PrivacyPolicyModal
