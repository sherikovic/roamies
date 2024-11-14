import styled from 'styled-components/macro'

const UnderConstructionPage: React.FC = () => {
  return <UnderConstruction>This page is still under construction.</UnderConstruction>
}

export default UnderConstructionPage

const UnderConstruction = styled.p`
  color: black;
  font-size: 30px;
  font-weight: 600;
  width: 100%;
  text-align: center;
  position: relative;
  margin: 0;
`
