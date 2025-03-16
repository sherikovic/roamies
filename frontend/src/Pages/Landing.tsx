import Roamies from 'Components/Main/Roamies'
import Download from 'Components/Main/Download'
import Reasons from 'Components/Main/Reasons'
import { About } from 'Components/Main/About'
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
