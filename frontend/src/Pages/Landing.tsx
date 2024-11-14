import { About } from 'Components/Landingpage/About'
import { Contact } from 'Components/Landingpage/Contact'
import { CoolMobileApp } from 'Components/Landingpage/CoolMobileApp'
import { Description } from 'Components/Landingpage/Description'
import { Features } from 'Components/Landingpage/Features'
import LandingNavigation from 'Components/Landingpage/LandingNavigation'

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
      </div>
    </>
  )
}

export default LandingPage
