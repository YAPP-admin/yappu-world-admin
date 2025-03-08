import ProfileImg from '@assets/ProfileImg';
import { FC } from 'react';
import styled from 'styled-components';

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
        <span className="badge">{authority}</span>
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

  .badge {
    border-radius: 6px;
    background: #dcdcdc;
    color: #5c5c5c;
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0.342px;
    padding: 2px 8px;
  }
`;
