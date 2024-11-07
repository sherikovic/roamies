import { FlexboxCol, LogoLink, LogoWhite } from 'util/common_styles'
import landing from '../images/landing_page.jpeg'
import logo from '../images/logo.svg'
import styled from 'styled-components/macro'

const LandingPage: React.FC = () => {
  return (
    <FlexboxCol>
      <LandingPageBackground />
      <LandingPageNavigation>
        <LogoLink href="/">
          <LogoWhite src={logo} />
        </LogoLink>
        <LandingPageNavigationContainer>
          <a href="/about">About</a>
          <a href="/how-to-use">How to Use</a>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact</a>
        </LandingPageNavigationContainer>
      </LandingPageNavigation>
      <LandingPageMainText>
        <p>It&apos;s better, together!</p>
        <p>From solo traverels, for solo traverels.</p>
      </LandingPageMainText>
    </FlexboxCol>
  )
}

export default LandingPage

const LandingPageBackground = styled.div`
  display: block;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${landing});
  filter: brightness(0.5);
  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(46, 45, 53, 0.527);
  }
`

const LandingPageNavigation = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  background-color: transparent;
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

const LandingPageMainText = styled.div`
  > p:first-child {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 40%;
    margin: auto;
    font-size: 100px;
    color: white;
  }
  > p:last-child {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 50%;
    margin: auto;
    font-size: 30px;
    color: white;
  }
`

// const LandingPageJoinLink = styled.div`
//   > a {
//     position: absolute;
//     top: 70%;
//     left: 20%;
//     margin: auto;
//     border: 1px transparent;
//     border-radius: 15px;
//     padding: 15px 40px;
//     /* background-color: rgb(36, 48, 64); */
//     background-color: #2c3333;
//     /* box-shadow: 1px 2px 2px #696262; */
//     color: white;
//     text-decoration: none;
//     &:hover {
//       /* background-color: rgba(36, 48, 64, 0.597); */
//       background-color: #1c2727;
//     }
//   }
// `
