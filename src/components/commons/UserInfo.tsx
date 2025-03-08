import ProfileImg from '@assets/ProfileImg';
import { FC } from 'react';
import styled from 'styled-components';
import Chip from './Chip';

interface UserInfoProps {
  authority: string;
  userName: string;
}

const UserInfo: FC<UserInfoProps> = (props) => {
  const { authority, userName } = props;

  return (
    <Container>
      <ProfileImg />
      <Info>
        <Chip
          text={authority}
          chipColor="primary"
          chipSize="small"
          chipStyle="fill"
        />
        <span className="name">{userName}</span>
      </Info>
    </Container>
  );
};

export default UserInfo;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;

  .name {
    color: #000;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.24px;
  }
`;
