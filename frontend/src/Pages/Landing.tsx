import Roamies from 'Components/Landingpage/Roamies'
import Download from 'Components/Landingpage/Download'
import Reasons from 'Components/Landingpage/Reasons'
import { About } from 'Components/Landingpage/About'
import NavBar from 'Components/NavBar'
import Footer from 'Components/Footer'
import { lenis } from 'util/lenis'

const LandingPage: React.FC = () => {
  lenis.start()

  return (
    <div>
      <NavBar />
      <About />
      <div id="jump-down" />
      <Reasons />
      <Roamies />
      <Download />
      <Footer />
    </div>
  )
}

export default LandingPage
