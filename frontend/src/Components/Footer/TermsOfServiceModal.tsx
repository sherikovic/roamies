import { motion, AnimatePresence } from 'motion/react'
import styled from 'styled-components/macro'
import { useState } from 'react'

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

const topPathVariants = {
  closed: {
    d: 'M2 5 L22 5',
    rotate: 0,
  },
  open: {
    d: 'M5 5 L19 19',
    rotate: 90,
  },
}

const middlePathVariants = {
  closed: {
    d: 'M2 12 L22 12',
    opacity: 1,
  },
  open: {
    d: 'M5 12 L19 12',
    opacity: 0,
  },
}

const bottomPathVariants = {
  closed: {
    d: 'M2 19 L22 19',
    rotate: 0,
  },
  open: {
    d: 'M5 19 L19 5',
    rotate: -90,
  },
}

// const springTransition = {
//   type: 'spring',
//   stiffness: 300,
//   damping: 20,
// }

const TermsOfServiceModal = ({ closeModal }: { closeModal: () => void }) => {
  const [isTocOpen, setIsTocOpen] = useState(false)

  const BurgerIcon = () => (
    <BurgerButton
      as={motion.button}
      onClick={() => setIsTocOpen(!isTocOpen)}
      whileHover={{ scale: 1.05 }}
    >
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        initial={false}
        animate={isTocOpen ? 'open' : 'closed'}
      >
        {/* All paths */}
        <motion.path
          stroke={theme.onSurfaceVariant}
          strokeWidth="2"
          variants={topPathVariants}
          // transition={springTransition}
          // whileHover={{
          //   stroke: theme.back,
          //   transition: { duration: 0.2 },
          // }}
        />
        <motion.path
          stroke={theme.onSurfaceVariant}
          strokeWidth="2"
          variants={middlePathVariants}
          // transition={springTransition}
          // whileHover={{
          //   stroke: theme.primary,
          //   transition: { duration: 0.2 },
          // }}
        />
        <motion.path
          stroke={theme.onSurfaceVariant}
          strokeWidth="2"
          variants={bottomPathVariants}
          // transition={springTransition}
          // whileHover={{
          //   stroke: theme.primary,
          //   transition: { duration: 0.2 },
          // }}
        />
      </motion.svg>
    </BurgerButton>
  )

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
        {[
          'Agreement to Our Legal Terms',
          'Our Services',
          'Intellectual Property Rights',
          'User Presentations',
          'User Registration',
          'Prohibited Activities',
          'User Generated Contributions',
          'Contribution License',
          'Mobile Application License',
          'Third-Party Websites and Content',
          'Service Management',
          'Privacy Policy',
          'Digital Millenium Copyright Act (DMCA) Notice And Policy',
          'Term and Termination',
          'Modifications and Interruptions',
          'Governing Law',
          'Dispute resolution',
          'Corrections',
          'Disclaimer',
          'Limitations of Liability',
          'Indemnification',
          'User Data',
          'Electronic Communications, Transactions and Signatures',
          'California Users and Residents',
          'Miscellaneous',
          'User Content and Behavior',
          'Events Liability',
          'Termination for Violations',
          'Changes to Terms',
          'Data Privacy',
          'Contact Us',
        ].map((item, index) => (
          <TOCItem key={index}>
            <TOCLink
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              onClick={() => setIsTocOpen(false)}
            >
              {item}
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
        <BurgerIcon />
        <HeaderSection>
          <HeaderPrimary>Terms Of Service</HeaderPrimary>
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
        <ContentSection id="information-we-collect">
          <PrimaryText>Agreement to Our Legal Terms</PrimaryText>
          <SecondaryText>
            Thank you for using Roamies.{'\n'}By accessing or using the Roamies mobile application,
            website, or any related services (collectively, the{' '}
            <span className="poppins-semibold">“Platform”</span>), you agree that you have read,
            understood, and agree to be bound by these Terms and Conditions (the{' '}
            <span className="poppins-semibold">“Terms”</span>). If you do not agree with these
            Terms, you are prohibited from using the Platform and must discontinue use immediately.
            {'\n\n'}
            These Terms use the following definitions:{'\n'}•{' '}
            <span className="poppins-semibold">“We,”</span>{' '}
            <span className="poppins-semibold">“us,”</span> and{' '}
            <span className="poppins-semibold">“our”</span> refer to Roamies, its owners, operators,
            employees, and affiliates.{'\n'}• <span className="poppins-semibold">“You”</span> and
            <span className="poppins-semibold">“your”</span> refer to you, the individual accessing
            or using our Platform, as well as any organization or entity you. represent.
            {'\n\n'}We may update these Terms from time to time, and the updated version will be
            indicated by an updated “Last Updated” date. Your continued use of the Platform after
            any such changes constitutes your acceptance of the new Terms. These Terms constitute a
            legally binding agreement between you and Roamies regarding your use of the Platform. If
            you have any questions about these Terms, please contact us at support@roamies.xyz.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="how-we-use-your-information">
          <PrimaryText>Our Services</PrimaryText>
          <SecondaryText>
            Roamies is a social platform designed to connect individuals, particularly solo
            travelers, by enabling them to create and join events and trips. The platform allows
            users to organize activities, share experiences, and connect with like-minded
            individuals.{'\n\n'}The Services provided by Roamies are intended for general use and
            are not designed for distribution to or use by individuals or entities in jurisdictions
            or countries where such activities would conflict with applicable laws or regulations.
            By choosing to access the Services from a location outside our primary jurisdiction, you
            acknowledge and accept that you are doing so at your own initiative and are solely
            responsible for complying with all applicable local laws.{'\n\n'}Please note that the
            Services are not designed to comply with industry-specific regulations, such as the
            Health Insurance Portability and Accountability Act (HIPAA) or the Federal Information
            Security Management Act (FISMA). If your use of the Services would be subject to such
            laws, you are not permitted to use them. Furthermore, you are prohibited from using the
            Services in any manner that would violate the Gramm-Leach-Bliley Act (GLBA) or any
            similar legal frameworks.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="access-and-control-over-your-data">
          <PrimaryText>Intellectual Property Rights</PrimaryText>
          <SecondaryText>
            All content, including source code, databases, functionality, software, website designs,
            audio, video, text, photographs, graphics, trademarks, service marks, and logos
            (collectively, the <span className="poppins-semibold">“Content”</span>) displayedpoppins
            the platform is owned by Roamies or licensed to it. This Content and the Marks are
            protected by copyright, trademark laws, and other intellectual property rights
            worldwide.{'\n\n'}
            Users are granted a limited, non-exclusive, non-transferable license to access and use
            the Services and download or print content solely for personal, non-commercial purposes.
            Any commercial use, reproduction, or distribution of the Content or Marks requires
            express prior written consent from Roamies.{'\n\n'}If permission is granted to reproduce
            or display any part of the Content, users must properly attribute Roamies as the owner
            or licensor, including any relevant copyright notices.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="data-security">
          <PrimaryText>User Presentations</PrimaryText>
          <SecondaryText>
            By using Roamies, you confirm that:{'\n'}(1) you are at least 18 years old or the age of
            majority in your jurisdiction;{'\n'}(2) you have the legal capacity to agree to and
            comply with these Legal Terms;{'\n'}(3) all registration details you provide are
            accurate, complete, and up-to-date, and you will keep them current;{'\n'}(4) you will
            not access the Services using automated or non-human means, such as bots, scripts, or
            other tools;{'\n'}(5) you will not use the Services for any unlawful or unauthorized
            activities;{'\n'}(6) your use of the Services will comply with all applicable laws and
            regulations; and{'\n'}(7) you will not copy, distribute, or use any content—such as
            source code, software, trademarks, graphics, or other intellectual property—without
            obtaining prior written consent from Roamies. If any of the information you provide is
            false, inaccurate, incomplete, or outdated, Roamies reserves the right to suspend or
            terminate your account and deny you access to the Services, either temporarily or
            permanently.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="permissions-we-request">
          <PrimaryText>User Registration</PrimaryText>
          <SecondaryText>
            To use certain features, you may need to create an account. You are responsible for
            maintaining the confidentiality of your login credentials and all activities under your
            account. You agree to provide accurate and up-to-date information.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="third-party-authentication">
          <PrimaryText>Prohibited Activities</PrimaryText>
          <SecondaryText>
            You agree not to use the Services for any purpose other than as intended. Commercial use
            is prohibited unless authorized. Specifically, you may not:
            {'\n'}• Collect data, create databases, or engage in unauthorized use, including
            impersonation or use of automated tools (bots, scrapers).
            {'\n'}• Mislead, harass, or harm others, or violate security features or privacy.
            {'\n'}• Disrupt the Services by uploading harmful content (viruses, spam) or bypassing
            access restrictions.
            {'\n'}• Engage in activities that damage Roamies&apos; reputation, such as impersonating
            others or violating laws.
            {'\n'}• Use the Services for unauthorized commercial purposes or collect user
            information for unsolicited communication.
            {'\n'}• Transfer or sell your profile without permission.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="your-rights">
          <PrimaryText>User Generated Contributions</PrimaryText>
          <SecondaryText>
            Our Services may allow you to contribute content, such as posts, comments, photos,
            graphics, suggestions, events, or other materials (collectively, “Contributions”). These
            Contributions may be shared publicly, visible to other users, and potentially accessible
            via third-party platforms. By submitting Contributions, you acknowledge and agree that
            they are non-confidential and non-proprietary.{'\n\n'}When you create or share
            Contributions, you represent and warrant the following:
            {'\n'}
            <span className="poppins-semibold">• Ownership and Rights:</span> You affirm that you
            own the content or possess all necessary rights, licenses, permissions, and consents to
            share it. Your Contributions do not infringe upon any copyrights, trademarks, patents,
            trade secrets, moral rights, or any other proprietary rights of any third party.
            {'\n'}
            <span className="poppins-semibold">• Consents for Identifiable Individuals: </span>You
            must obtain explicit written consent or release from any individuals appearing in your
            Contributions (e.g., photos, videos) to use their name, image, or likeness as required
            under these terms.{'\n'}
            <span className="poppins-semibold">• By joining or participating in events</span>{' '}
            through the Services, individuals automatically grant consent for their name, image, or
            likeness to be included in Contributions associated with the event, provided such use
            complies with these Terms and and does not violate these Terms in any way.
            {'\n'}
            <span className="poppins-semibold">• Accuracy and Legitimacy:</span> You warrant that
            your Contributions are truthful, accurate, and do not contain false, misleading, or
            unauthorized material, including spam, promotional content, pyramid schemes, or mass
            mailings.
            {'\n'}
            <span className="poppins-semibold">• Appropriateness:</span> our Contributions must not
            be obscene, violent, harassing, defamatory, discriminatory, or otherwise objectionable.
            They must not include offensive comments related to race, nationality, gender, sexual
            orientation, or disabilities. Pornographic material, explicit content, or any form of
            adult material is strictly prohibited.
            {'\n'}
            <span className="poppins-semibold">• Legal Compliance:</span> Your Contributions must
            comply with all applicable laws, including those protecting minors, privacy, and
            publicity rights. Contributions must not promote violence, child exploitation, or
            illegal activities.
            {'\n'}
            <span className="poppins-semibold">• Non-Harmful Intent:</span> Your Contributions,
            including events, must not be intended to harm, endanger, or exploit others, incite
            violence, or promote behavior that is unlawful or otherwise harmful to individuals or
            groups.{'\n\n'}
            By submitting Contributions, you irrevocably grant us, and other users of the Services,
            the right to use, distribute, modify, publicly display, and otherwise engage with your
            content in full compliance with these Terms.{'\n\n'}
            <span className="poppins-semibold">Failure</span> to comply with these Terms will result
            in the immediate removal of your Contributions, permanent suspension of your account, or
            any other necessary actions deemed appropriate by us, at our sole discretion.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="changes-to-this-privacy-policy">
          <PrimaryText>Contribution License</PrimaryText>
          <SecondaryText>
            By posting Contributions on the Services or linking your social accounts, you grant us a
            global, non-exclusive, royalty-free, perpetual license to use, reproduce, distribute,
            publicly display, and create derivative works from your Contributions for any purpose,
            including commercial and advertising uses. This includes your name, image, voice, and
            any trademarks or logos you provide. The license applies to all formats, media, and
            technologies now known or developed in the future.{'\n\n'}You retain full ownership of
            your Contributions and associated intellectual property rights. However, you waive any
            moral rights and confirm that such rights have not been asserted. You are solely
            responsible for your Contributions and agree to release us from any claims related to
            them.{'\n\n'}We may, at our sole discretion, edit, relocate, or remove Contributions at
            any time and for any reason without prior notice. While we reserve the right to monitor
            Contributions, we are not obligated to do so.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Mobile Application License</PrimaryText>
          <SecondaryText>
            You are granted a limited, non-exclusive, non-transferable, revocable license to use the
            App on your personal devices in compliance with these Legal Terms. Prohibited Actions
            You must not: 1. Reverse-engineer, decompile, or modify the App. 2. Use the App for
            unauthorized commercial purposes or create competing products. 3. Violate laws or
            regulations in connection with the App. 4. Share the App across networks for
            simultaneous use. 5. Remove or obscure proprietary notices. 6. Send automated queries or
            unsolicited communications through the App.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Third-Party Websites and Content</PrimaryText>
          <SecondaryText>
            The Services may contain links to third-party websites (e.g., Instagram, Google Maps,
            Twitter) or content provided by third parties. We do not monitor or control these
            third-party websites and content, and we are not responsible for their accuracy,
            appropriateness, or availability. If you choose to navigate to these third-party sites,
            you do so at your own risk, and these Legal Terms no longer apply. Please review the
            applicable terms and privacy policies of these third-party websites before using them.
            We are not responsible for any purchases or interactions with these third parties.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Service Management</PrimaryText>
          <SecondaryText>
            Roamies reserves the right to manage, modify, or discontinue services at its sole
            discretion without prior notice.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Privacy Policy</PrimaryText>
          <SecondaryText>
            We prioritize your data privacy and security. Please review our Privacy Policy. By using
            the Services, you agree to its terms. The Services are hosted in the United States, and
            by accessing them from other regions, you consent to the transfer and processing of your
            data in the United States.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Digital Millenium Copyright Act (DMCA) Notice And Policy</PrimaryText>
          <SecondaryText>
            We respect intellectual property rights. If you believe material on the Services
            infringes your copyright, please notify our Designated Copyright Agent at the contact
            details below. Your notification should meet DMCA requirements, including identification
            of the copyrighted work and your contact information. False claims may result in
            liability.{'\n\n'}If your content was removed by mistake, you can submit a Counter
            Notification to restore it. Your Counter Notification must include specific details such
            as your contact info and a statement under penalty of perjury regarding the mistake. If
            valid, we will restore the material unless notified otherwise.{'\n\n'}
            <span className="poppins-semibold">Designated Copyright Agent</span>
            {'\n'}Sherif Amer{'\n'}Attn: Copyright Agent{'\n'}315 Lincoln Pl, Brooklyn, NY 11238,
            United States{'\n'}sherif.amer01@gmail.com
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Term and Termination</PrimaryText>
          <SecondaryText>
            These Terms remain in effect while you use the Services. We may, at our discretion, deny
            access or terminate your account at any time, with or without notice, for any reason,
            including violations of these Terms or applicable laws. If terminated, you are
            prohibited from creating a new account under any name. We may also pursue legal action
            if necessary.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Modifications and Interruptions</PrimaryText>
          <SecondaryText>
            We reserve the right to modify, suspend, or discontinue the Services at any time without
            notice. We are not obligated to update content or provide continuous access, and we are
            not liable for any interruptions, delays, or issues caused by maintenance or other
            problems. You agree that we are not responsible for any inconvenience or loss due to
            downtime or service changes.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Governing Law</PrimaryText>
          <SecondaryText>
            These Terms and your use of the Services are governed by the laws of the State of New
            York, without regard to conflict of law principles.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Dispute resolution</PrimaryText>
          <SecondaryText>
            <span className="poppins-semibold">Informal Negotiations:</span> The Parties agree to
            attempt informal negotiations for at least 30 days before initiating arbitration.
            {'\n\n'}
            <span className="poppins-semibold">Binding Arbitration:</span> Any disputes that cannot
            be resolved through informal negotiations will be settled exclusively through binding
            arbitration, not in court. The arbitration will be governed by the Commercial
            Arbitration Rules of the American Arbitration Association (AAA) and will take place in
            New York.{'\n\n'}
            <span className="poppins-semibold">Waiver of Court Action:</span> The Parties waive any
            right to pursue disputes in court, including the right to a jury trial, and agree that
            arbitration will be the sole method of resolution.{'\n\n'}
            <span className="poppins-semibold">Exceptions:</span> Disputes concerning intellectual
            property, theft, privacy, or requests for injunctive relief are not subject to
            arbitration.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Corrections</PrimaryText>
          <SecondaryText>
            Roamies reserves the right to correct errors, inaccuracies, or omissions in the platform
            content at any time without prior notice.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Disclaimer</PrimaryText>
          <SecondaryText>
            The platform is provided “as-is” and “as-available.” Roamies makes no warranties about
            its operation, availability, or the accuracy of its content. Participating in events is
            at your own risk, and we are not liable for any issues that may arise from such
            participation. We are not responsible for any errors, damages, or interruptions related
            to the Services, nor for any third-party products or services accessed through the
            platform.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Limitations of Liability</PrimaryText>
          <SecondaryText>
            ROAMIES, INCLUDING OUR DIRECTORS, EMPLOYEES, AND AGENTS, WILL NOT BE LIABLE FOR ANY
            DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR REVENUE,
            ARISING FROM YOUR USE OF THE PLATFORM. OUR TOTAL LIABILITY, REGARDLESS OF THE CAUSE, IS
            LIMITED TO THE AMOUNT YOU HAVE PAID FOR THE SERVICES, OR $100, WHICHEVER IS LOWER. SOME
            LAWS MAY PROVIDE ADDITIONAL RIGHTS, AND IN THOSE CASES, THE LIMITATIONS ABOVE MAY NOT
            APPLY.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Indemnification</PrimaryText>
          <SecondaryText>
            You agree to indemnify and hold Roamies harmless, including our officers, employees, and
            agents, from any claims, damages, or expenses arising from your use of the platform or a
            violation of these Terms. This includes reasonable attorneys&apos; fees and any claims
            resulting from your contributions, breach of these Terms, or violation of third-party
            rights. We reserve the right to defend any claim at your expense and will notify you of
            such claims as soon as possible.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>User Data</PrimaryText>
          <SecondaryText>
            Roamies takes reasonable steps to protect user data but does not guarantee protection
            against unauthorized access.{'\n\n'}We maintain certain data you transmit to the
            platform to manage its performance, as well as data related to your use. While we
            perform regular backups, you are solely responsible for all data you transmit or
            generate while using the platform. Roamies is not liable for any loss or corruption of
            your data, and you waive any rights to pursue action against us for such loss.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Electronic Communications, Transactions and Signatures</PrimaryText>
          <SecondaryText>
            By using Roamies, you consent to receive electronic communications and agree that
            electronic agreements, notices, and records are legally binding. You waive any rights
            that require an original signature or non-electronic records, and you agree to the use
            of electronic signatures, contracts, and payments.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>California Users and Residents</PrimaryText>
          <SecondaryText>
            If your complaint is not resolved to your satisfaction, you can contact the Complaint
            Assistance Unit of the Division of Consumer Services at the California Department of
            Consumer Affairs. You can reach them by mail at 1625 North Market Blvd., Suite N112,
            Sacramento, California 95834, or by phone at (800) 952-5210 or (916) 445-1254.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Miscellaneous</PrimaryText>
          <SecondaryText>
            These Legal Terms, along with any policies or rules posted on the Services, form the
            complete and final agreement between you and us. If we do not enforce any right or
            provision of these Legal Terms, it does not mean we waive it. We may assign our rights
            and obligations to others at any time. We are not liable for any loss, damage, delay, or
            failure caused by events outside of our control. If any provision of these Legal Terms
            is found to be unlawful, void, or unenforceable, that provision is severed, and the rest
            remain valid and enforceable. Using our Services does not create a joint venture,
            partnership, employment, or agency relationship between us. These Legal Terms will not
            be interpreted against us because we drafted them. You waive any defense based on the
            electronic nature of these Legal Terms or the lack of physical signatures.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>User Content and Behavior</PrimaryText>
          <SecondaryText>
            You are fully responsible for the content you upload to Roamies, including images,
            comments, and event information. Roamies reserves the right to remove any content that
            violates our community guidelines or is deemed inappropriate.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Events Liability</PrimaryText>
          <SecondaryText>
            Roamies is not liable for any injuries, losses, or damages that occur during events or
            trips arranged through the platform. Participation is at your own risk.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Termination for Violations</PrimaryText>
          <SecondaryText>
            Roamies reserves the right to suspend or terminate your account if you violate these
            Terms and Conditions, engage in fraudulent activity, or misuse the platform.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Changes to Terms</PrimaryText>
          <SecondaryText>
            Roamies reserves the right to update these Terms and Conditions at any time. We will
            inform users of significant changes, and continued use of the platform will be
            considered acceptance of the revised terms.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Data Privacy</PrimaryText>
          <SecondaryText>
            By using Roamies, you consent to the collection and use of your personal data in line
            with our Privacy Policy.
          </SecondaryText>
        </ContentSection>

        <ContentSection id="contact-us">
          <PrimaryText>Contact Us</PrimaryText>
          <SecondaryText>
            If you have any questions, concerns, or feedback regarding these Terms and Conditions or
            any other aspect of Roamies, feel free to contact us at:{'\n\n'}
            <span className="poppins-semibold">Email:</span> support@roamies.xyz
          </SecondaryText>
        </ContentSection>
      </ScrollContent>
    </>
  )
}

const BurgerButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  z-index: 999;
`

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
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
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
  max-height: 600px;
  overflow-y: auto;
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

// const Separator = styled.hr`
//   width: 80vw;
//   border: 0;
//   border-top: 1px solid ${theme.outline};
//   margin: 12px 0;
//   margin-bottom: 0;
// `

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

export default TermsOfServiceModal
