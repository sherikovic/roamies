import Roamies from 'Components/Main/Roamies'
import Download from 'Components/Main/Download'
import Reasons from 'Components/Main/Reasons'
import { About } from 'Components/Main/About'
import NavBar from 'Components/NavBar'
import Footer from 'Components/Footer'
import { lenis } from 'util/lenis'
import { getIsMobile } from 'util/util'

const LandingPage: React.FC = () => {
  if (!getIsMobile()) lenis.start()

  return (
    <div>
      <NavBar />
      <About />
      <Reasons />
      <Roamies />
      <Download />
      <Footer />
    </div>
  )
}

export default LandingPage
