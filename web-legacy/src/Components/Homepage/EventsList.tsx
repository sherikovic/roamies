import { Broadcast } from 'types/broadcast'
import EventItem from './EventItem'

import sliderRightArrow from '../../images/sliderrightarrow.png'
import sliderLeftArrow from '../../images/sliderleftarrow.png'
import rightArrowIcon from '../../images/rightarrow.png'
import { useRef, useState } from 'react'
import styled from 'styled-components/macro'
import { SliderBtn } from 'util/common_styles'
import {
  ContentBox,
  InnerSlider,
  ListPageHeader,
  PageHeaderText,
  SliderContents,
} from 'util/common_styles'

interface EventsListProps {
  events: Broadcast[]
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const [remainingDistance, setRemainingDistance] = useState(0)
  const [traveledDistance, setTraveledDistance] = useState(0)
  const [translateVal, setTranslateVal] = useState(0)
  const [opacity, setOpacity] = useState({
    left: 0.5,
    right: 1,
  })
  const [cursor, setCursor] = useState({
    left: 'default',
    right: 'pointer',
  })

  const slideLeft = () => {
    const slidingDistance = sliderRef.current!.scrollWidth / events.length
    // the purpose here is to check if there is only an item and a half to slide through
    // 20 is padding that was added in the last step
    if (traveledDistance - slidingDistance < slidingDistance) {
      setTranslateVal(0)
      setTraveledDistance(0)
      setRemainingDistance(0)
      setOpacity((prev) => ({ ...prev, left: 0.5, right: 1 }))
      setCursor((prev) => ({ ...prev, left: 'default', right: 'pointer' }))
    } else {
      const offset =
        traveledDistance - slidingDistance * Math.floor(traveledDistance / slidingDistance)

      const travelingDistance = traveledDistance - slidingDistance - offset
      setTranslateVal(travelingDistance * -1)
      setTraveledDistance(travelingDistance)
      setOpacity((prev) => ({ ...prev, left: 1, right: 1 }))
      setCursor((prev) => ({ ...prev, left: 'pointer', right: 'pointer' }))
    }
  }
  const slideRight = () => {
    const offsetWidth = sliderRef.current!.offsetWidth
    const totalRemainingDistance = sliderRef.current!.scrollWidth - offsetWidth
    const slidingDistance = sliderRef.current!.scrollWidth / events.length

    if (traveledDistance < totalRemainingDistance) {
      if (
        remainingDistance > slidingDistance ||
        (traveledDistance === 0 && totalRemainingDistance > slidingDistance)
      ) {
        const travelingDistance = traveledDistance + slidingDistance
        setTranslateVal(travelingDistance * -1)
        setTraveledDistance(travelingDistance)
        setRemainingDistance(totalRemainingDistance - travelingDistance)
        setOpacity((prev) => ({ ...prev, left: 1, right: 1 }))
        setCursor((prev) => ({ ...prev, left: 'pointer', right: 'pointer' }))
      } else {
        const travelingDistance =
          traveledDistance !== 0
            ? traveledDistance + remainingDistance + 20
            : totalRemainingDistance + 20 // 20 for padding
        setTraveledDistance(travelingDistance)
        setTranslateVal(travelingDistance * -1)
        setOpacity((prev) => ({ ...prev, left: 1, right: 0.5 }))
        setCursor((prev) => ({ ...prev, left: 'pointer', right: 'default' }))
        setRemainingDistance(sliderRef.current!.scrollWidth - offsetWidth + 20)
      }
    }
  }

  return (
    <ContentBox>
      <ListPageHeader>
        <PageHeaderText>
          <h4>Events</h4>
          <a href="/events">
            Explore
            <img src={rightArrowIcon} alt="explore arrow" />
          </a>
        </PageHeaderText>
        <EventsListHeaderSliderBtns>
          <SliderBtn onClick={slideLeft} $opacity={opacity.left} $cursor={cursor.left}>
            <img src={sliderLeftArrow} alt="slider left arrow" />
          </SliderBtn>
          <SliderBtn onClick={slideRight} $opacity={opacity.right} $cursor={cursor.right}>
            <img src={sliderRightArrow} alt="slider right arrow" />
          </SliderBtn>
        </EventsListHeaderSliderBtns>
      </ListPageHeader>
      <SliderContents>
        <InnerSlider $translate={translateVal} ref={sliderRef}>
          {events.map((event) => (
            <EventItem event={event} key={event._id} />
          ))}
        </InnerSlider>
      </SliderContents>
    </ContentBox>
  )
}

export default EventsList

const EventsListHeaderSliderBtns = styled.div`
  display: flex;
  justify-content: flex-end;
`
