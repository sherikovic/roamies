import { About } from 'Components/Landingpage/About'
import LandingNavigation from 'Components/Landingpage/LandingNavigation'

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col relative">
      <LandingNavigation />
      <About />
    </div>
  )
}

export default LandingPage
