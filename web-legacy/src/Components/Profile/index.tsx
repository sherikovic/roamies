import styled from 'styled-components/macro'
import { ContentBox } from 'util/common_styles'
import { useAuthCtx } from 'util/auth-context'
import { FlexboxCol, FlexboxRow } from 'util/common_styles'
import defaultAvatar from 'images/profilepic.png'
import twitter from 'images/twitter.svg'
import instagram from 'images/instagram.svg'
import EventsList from 'Components/Homepage/EventsList'
import TripsList from 'Components/Homepage/TripsList'

const ProfilePage: React.FC = () => {
  const { user } = useAuthCtx()
  const userFields = [
    { label: 'First Name', value: user?.firstname ?? '' },
    { label: 'Last Name', value: user?.lastname ?? '' },
    { label: 'Country', value: user?.country ?? '' },
    { label: 'Age', value: user?.age ?? '' },
    { label: 'Bio', value: user?.bio ?? '' },
  ]
  console.log(user)
  return (
    <FlexboxRow style={{ gap: 24 }}>
      <ContentBox style={{ alignItems: 'center', flex: 1 }}>
        <img
          style={{ margin: 'auto', height: '100px' }}
          src={user?.profile_picture ?? defaultAvatar}
          alt="profile"
        />
        {user?.social && (
          <FlexboxRow>
            {user.social?.twitter && (
              <a href={`https://twitter.com/${user.social.twitter}`}>
                <img style={{ height: '20px' }} src={twitter} alt="twitter" />
              </a>
            )}
            {user.social?.instagram && (
              <a href={`https://www.instagram.com/${user.social.instagram}`}>
                <img style={{ height: '20px' }} src={instagram} alt="instagram" />
              </a>
            )}
          </FlexboxRow>
        )}
        <InfoContainer>
          {userFields.map((field) => (
            <InfoItem key={field.label} label={field.label} value={field.value} />
          ))}
        </InfoContainer>
      </ContentBox>
      <FlexboxCol style={{ flex: 1 }}>
        <TripsList trips={user?.trips ?? []} />
        <EventsList events={user?.events ?? []} />
      </FlexboxCol>
    </FlexboxRow>
  )
}

const InfoItem: React.FC<{ label: string; value: string; key: string }> = ({
  label,
  value,
  key,
}) => {
  if (!value) return null
  return (
    <FlexboxCol key={key}>
      <p style={{ margin: 0 }}>{label}</p>
      <h4 style={{ margin: 0 }}>{value}</h4>
    </FlexboxCol>
  )
}

export default ProfilePage

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`
