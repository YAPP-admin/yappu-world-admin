import Button from '@compnents/commons/Botton';
import { FC } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import MemberActivityForm from './MemberActivityForm';
import MemberBasicForm from './MemberBasicForm';

interface Props {
  isEdit: boolean;
  cancelToEdit: () => void;
}

const MemberForm: FC<Props> = (props) => {
  const { isEdit, cancelToEdit } = props;
  return (
    <Container onClick={(e) => e.stopPropagation()}>
      <Wrapper>
        <MemberBasicForm />
        <MemberActivityForm />
      </Wrapper>
      <ButtonWrapper>
        <Button
          text="취소"
          variant="outlined"
          variantType="assistive"
          onClick={cancelToEdit}
        />
        <Button
          text="저장"
          onClick={() => console.log('저장 confirm 모달 오픈')}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default MemberForm;

const Container = styled.form``;

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

const ButtonWrapper = styled.div`
  display: flex;
  padding: 24px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;
  border-top: 1px solid ${theme.colors.lineNormal.alternative};
  background: ${theme.colors.backgroundElevated.normal};
`;
