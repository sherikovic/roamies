import { useState } from 'react';
import { FlexboxCol } from 'util/common_styles';
import { useAuthCtx } from 'util/auth-context';
import styled from 'styled-components';

const CurrentActions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('events');
  const { isAuthenticated } = useAuthCtx();

  return (
    <FlexboxCol style={{ minHeight: '250px' }}>
      <CurrentActionsHeader $activeTab={activeTab}>
        <span onClick={() => setActiveTab('events')}>Current Events</span>
        <span onClick={() => setActiveTab('trips')}>My Trips</span>
      </CurrentActionsHeader>
      {!isAuthenticated && <div>Couldn&apos;t load information</div>}
    </FlexboxCol>
  );
};

export default CurrentActions;

const CurrentActionsHeader = styled.div<{ $activeState: string }>`
  display: flex;
  margin: 10px 30px 0 30px;
  border-bottom: 1px solid #c2c2d1;
  height: 3vw;
  align-items: center;
  gap: 10px;
  > span {
    text-align: center;
    min-width: 170px;
    font-size: 15px;
    font-weight: 550;
    cursor: pointer;
    &:hover {
      color: black;
      transition: 0.2s ease-in-out;
    }
    &:first-child {
      color: ${(p) => (p.$activeTab === 'events' ? 'black' : 'grey')};
      transition: ${(p) => p.$activeTab === 'events' && '0.2s ease-in-out'};
      padding-right: 10px;
    }
    &:last-child {
      color: ${(p) => (p.$activeTab === 'trips' ? 'black' : 'grey')};
      transition: ${(p) => p.$activeTab === 'events' && '0.2s ease-in-out'};
    }
  }
`;
