import { FC, useState } from 'react';
import Backdrop from './Backdrop';
import styled from 'styled-components';
import MemberDetailHeader from '@compnents/members/MemberDetailHeader';
import MemberBasicInfo from '@compnents/members/MemberBasicInfo';
import MemberActivityInfo from '@compnents/members/MemberActivityInfo';
import MemberForm from '@compnents/members/MemberForm';

interface Props {
  onClose: () => void;
}

const MemberDetailPopup: FC<Props> = (props) => {
  const { onClose } = props;
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Backdrop onClose={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <MemberDetailHeader
          isEdit={isEdit}
          onClose={onClose}
          title="회원 상세 정보"
          onClickToEdit={() => setIsEdit(true)}
        />
        {isEdit ? (
          <MemberForm isEdit={isEdit} cancelToEdit={() => setIsEdit(false)} />
        ) : (
          <Wrapper>
            <MemberBasicInfo />
            <MemberActivityInfo />
          </Wrapper>
        )}
      </Container>
    </Backdrop>
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
