import React from 'react'
import landing from '../../images/landing_page.jpeg'
import styled from 'styled-components/macro'

export const About = () => {
  return (
    <div id="/about">
      <LandingPageBackground />
      <LandingPageMainText>
        <p>It&apos;s better, together!</p>
        <p>From solo traverels, for solo traverels.</p>
      </LandingPageMainText>
    </div>
  )
}

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
