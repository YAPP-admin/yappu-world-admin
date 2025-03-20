import MemberActivityInfo from '@compnents/members/MemberActivityInfo';
import MemberBasicInfo from '@compnents/members/MemberBasicInfo';
import MemberDetailHeader from '@compnents/members/MemberDetailHeader';
import MemberForm from '@compnents/members/MemberForm';
import { FC, useState } from 'react';
import styled from 'styled-components';
import PopupContainer from './PopupContainer';

export interface UserDetail {
  userId: string;
  name: string;
  phoneNumber?: string | null;
  email: string;
  role: {
    name: string;
    label: string;
  };
  isActive: boolean;
  activityUnits: {
    generation: number;
    position: string;
    isActive?: boolean | null;
  }[];
  gender?: string | null;
  joinDate?: string | null;
}

const sample: UserDetail = {
  userId: '01954c67-0c2b-d741-4561-ed80b4c28d0c',
  name: '홍길동',
  email: 'email@email.com',
  role: {
    name: 'ADMIN',
    label: '관리자',
  },
  isActive: true,
  activityUnits: [
    {
      generation: 1,
      position: 'PM',
    },
    {
      generation: 2,
      position: 'Web',
    },
  ],
};

interface Props {
  onClose: () => void;
}

const MemberDetailPopup: FC<Props> = (props) => {
  const { onClose } = props;
  const [isEdit, setIsEdit] = useState(false);

  return (
    <PopupContainer>
      <Container onClick={(e) => e.stopPropagation()}>
        <MemberDetailHeader
          isEdit={isEdit}
          onClose={onClose}
          title="회원 상세 정보"
          onClickToEdit={() => setIsEdit(true)}
          userName={sample.name}
        />
        {isEdit ? (
          <MemberForm isEdit={isEdit} cancelToEdit={() => setIsEdit(false)} />
        ) : (
          <Wrapper>
            <MemberBasicInfo userData={sample} />
            <MemberActivityInfo userData={sample} />
          </Wrapper>
        )}
      </Container>
    </PopupContainer>
  );
};

export default MemberDetailPopup;

const Container = styled.div`
  z-index: 2;
  width: 744px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background: #fff;
  box-shadow:
    0px 6px 12px 0px rgba(0, 0, 0, 0.12),
    0px 4px 8px 0px rgba(0, 0, 0, 0.08),
    0px 0px 4px 0px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled.div`
  display: flex;

  > div {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 24px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;
