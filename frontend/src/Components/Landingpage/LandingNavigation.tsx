import { getIsMobile } from 'util/util'
import logo from 'images/icon.svg'
import SVG from 'react-inlinesvg'

const LandingNavigation: React.FC = () => {
  const isMobile = getIsMobile()
  window.onscroll = function () {
    if (isMobile) return
    const nav = document.getElementById('navbar-container')
    const logoElem = document.getElementById('logo-elem')
    const navLinks = document.getElementById('nav-links')
    if (this.scrollY >= 200) {
      nav?.classList.remove('nav-normal')
      nav?.classList.add('nav-scroll')
      logoElem?.classList.remove('logo-large')
      logoElem?.classList.add('logo-small')
      navLinks?.classList.remove('nav-links-normal')
      navLinks?.classList.add('nav-links-scroll')
    } else {
      nav?.classList.remove('nav-scroll')
      nav?.classList.add('nav-normal')
      logoElem?.classList.remove('logo-small')
      logoElem?.classList.add('logo-large')
      navLinks?.classList.remove('nav-links-scroll')
      navLinks?.classList.add('nav-links-normal')
    }
  }

  return (
    <div id="navbar-container" className="nav-normal">
      <div className="logo-container">
        <SVG src={logo} id="logo-elem" className="logo-large" />
        <p id="logo-elem" className="logo-large">
          Roamies
        </p>
      </div>
      <nav id="nav-links" className="nav-links-normal">
        <a href="#about">About</a>
        <a href="#features">Features</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  )
}

export default LandingNavigation
