import { FC, useState } from 'react';
import styled from 'styled-components';

import MemberActivityInfo from '@compnents/members/MemberActivityInfo';
import MemberBasicInfo from '@compnents/members/MemberBasicInfo';
import MemberDetailHeader from '@compnents/members/MemberDetailHeader';
import MemberForm from '@compnents/members/MemberForm';
import { useUserDetailQuery } from '@queries/user/useUserDetailQuery';
import { useMemberStore } from '@stores/memberStore';

import PopupContainer from './PopupContainer';

interface Props {
  onClose: () => void;
}

const MemberDetailPopup: FC<Props> = (props) => {
  const { onClose } = props;
  const [isEdit, setIsEdit] = useState(false);
  const selectedId = useMemberStore((state) => state.selectedUserId);
  const { data } = useUserDetailQuery(selectedId ?? '');

  return (
    <PopupContainer>
      <Container onClick={(e) => e.stopPropagation()}>
        <MemberDetailHeader
          isEdit={isEdit}
          title="회원 상세 정보"
          userName={data?.name}
          onClickToEdit={() => setIsEdit(true)}
          onClose={onClose}
        />
        {isEdit ? (
          <MemberForm cancelToEdit={() => setIsEdit(false)} userInfo={data} />
        ) : (
          <Wrapper>
            <MemberBasicInfo userInfo={data} />
            <MemberActivityInfo userInfo={data} />
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
