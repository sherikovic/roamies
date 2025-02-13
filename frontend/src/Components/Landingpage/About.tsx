import React from 'react'
import landing from '../../images/landing_page.jpeg'
import styled from 'styled-components/macro'
import downloadApp from 'images/download-app.svg'

export const About = () => {
  return (
    <LandingPageBackground>
      <p className="text-4xl lg:text-8xl text-off-white z-10">It&apos;s better, together!</p>
      <p className="text-xl lg:text-3xl text-off-white z-10">
        From solo traverels, for solo traverels.
      </p>
      <div className="flex gap-1 z-10 flex-col items-center mt-24">
        <img
          src={downloadApp}
          alt="download app"
          className="z-10 w-48 cursor-pointer"
          onClick={() =>
            window.open(
              'https://apps.apple.com/us/app/roamies-adventure-together/id6740840624',
              '_blank',
            )
          }
        />
      </div>
      <Overlay />
    </LandingPageBackground>
  )
}

const LandingPageBackground = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  ::before {
    filter: brightness(0.5);
    background-image: url(${landing});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    content: '';
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
  }
`

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100dvh;
  background-color: rgba(46, 45, 53, 0.527);
`
