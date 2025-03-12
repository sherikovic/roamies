import LandingNavigation from 'Components/Landingpage/LandingNavigation'
import Anticipation from 'Components/Landingpage/Anticipation'
import { About } from 'Components/Landingpage/About'
import Reasons from 'Components/Landingpage/Reasons'
import { useEffect } from 'react'
import Lenis from 'lenis'
import Download from 'Components/Landingpage/Download'
// import Footer from 'Components/Landingpage/Footer'
import Roamies from 'Components/Landingpage/Roamies'

const LandingPage: React.FC = () => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis()
    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  return (
    <div>
      <LandingNavigation />
      <About />
      <div id="jump-down" />
      <Reasons />
      <Anticipation />
      <Roamies />
      {/* <Features /> */}
      <Download />
      {/* <Footer /> */}
      {/* <Contact /> */}
    </div>
  )
}

export default LandingPage
