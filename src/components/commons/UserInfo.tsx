import { FC } from 'react';
import styled from 'styled-components';

import ProfileImg from '@assets/ProfileImg';
import { userRoleOptionList } from '@constants/optionList';
import { RoleName, UserProfileRes } from 'apis/user/types';

import Chip from './Chip';
import FlexBox from './FlexBox';

interface UserInfoProps {
  userProfile: UserProfileRes | null;
}

const UserInfo: FC<UserInfoProps> = ({ userProfile }) => {
  return (
    <Container>
      <ProfileImg />
      <Info>
        <FlexBox gap={4}>
          <Chip
            color="primary"
            size="small"
            text={userProfile?.role}
            variant="fill"
            role={
              userRoleOptionList.find((el) => el.label === userProfile?.role)
                ?.value as RoleName
            }
          />
          <Chip
            color="primary"
            size="small"
            text={userProfile?.position}
            variant="fill"
          />
        </FlexBox>
        <span className="name">{userProfile?.name}</span>
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
