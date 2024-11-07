import logo from '../../images/logo.svg'
import { LogoWhite } from 'util/common_styles'
import styled from 'styled-components/macro'

const LandingNavigation: React.FC = () => {
  return (
    <LandingPageNavigation>
      <LogoWhite src={logo} />
      <LandingPageNavigationContainer>
        <a href="/#about">About</a>
        <a href="/#how-to-use">How to Use</a>
        <a href="/#faq">FAQ</a>
        <a href="/#contact">Contact</a>
      </LandingPageNavigationContainer>
    </LandingPageNavigation>
  )
}

export default LandingNavigation

const LandingPageNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  position: fixed;
  z-index: 100;
  width: 100%;
  padding: 20px 60px;
`

const LandingPageNavigationContainer = styled.nav`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid transparent;
  border-radius: 15px;
  background-color: #00000029;
  padding: 10px 45px;
  > a {
    margin: 0 30px;
    text-decoration: none;
    color: rgba(208, 202, 202, 0.926);
    &:hover {
      color: white;
    }
  }
  > a.active {
    color: white;
  }
`
