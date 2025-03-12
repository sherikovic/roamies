import { getIsMobile } from 'util/util'
import logo from 'assets/images/icon.svg'
import SVG from 'react-inlinesvg'

const LandingNavigation: React.FC = () => {
  const isMobile = getIsMobile()
  window.onscroll = function () {
    if (isMobile) return
    const nav = document.getElementById('navbar-container')
    const logoElem = document.getElementById('logo-elem')
    const logoText = document.getElementById('logo-text')
    const navLinks = document.getElementById('nav-links')
    if (this.scrollY >= 200) {
      nav?.classList.remove('nav-normal')
      nav?.classList.add('nav-scroll')
      logoElem?.classList.remove('logo-large')
      logoElem?.classList.add('logo-small')
      logoText?.classList.remove('logo-text-large')
      logoText?.classList.add('logo-text-small')
      navLinks?.classList.remove('nav-links-normal')
      navLinks?.classList.add('nav-links-scroll')
    } else {
      nav?.classList.remove('nav-scroll')
      nav?.classList.add('nav-normal')
      logoElem?.classList.remove('logo-small')
      logoElem?.classList.add('logo-large')
      logoText?.classList.remove('logo-text-small')
      logoText?.classList.add('logo-text-large')
      navLinks?.classList.remove('nav-links-scroll')
      navLinks?.classList.add('nav-links-normal')
    }
  }

  return (
    <section id="navbar-container" className="nav-normal">
      <div className="logo-container">
        <SVG src={logo} id="logo-elem" className="logo-large" />
      </div>
      <nav id="nav-links" className="nav-links-normal">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector('#about')?.scrollIntoView({ behavior: 'auto', block: 'start' })
          }}
        >
          About
        </a>
        <a
          href="#features"
          onClick={(e) => {
            e.preventDefault()
            document
              .querySelector('#features')
              ?.scrollIntoView({ behavior: 'auto', block: 'start' })
          }}
        >
          Features
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'auto', block: 'start' })
          }}
        >
          Contact
        </a>
      </nav>
    </section>
  )
}

export default LandingNavigation
