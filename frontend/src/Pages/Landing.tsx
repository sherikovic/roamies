import LandingNavigation from 'Components/Landingpage/LandingNavigation'
import { CoolMobileApp } from 'Components/Landingpage/CoolMobileApp'
import { Description } from 'Components/Landingpage/Description'
import { Features } from 'Components/Landingpage/Features'
import { Contact } from 'Components/Landingpage/Contact'
import { About } from 'Components/Landingpage/About'
import Footer from 'Components/Landingpage/Footer'

const LandingPage: React.FC = () => {
  return (
    <>
      <LandingNavigation />
      <div className="flex flex-col overflow-x-hidden">
        <About />
        <Description />
        <CoolMobileApp />
        <Features />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default LandingPage
