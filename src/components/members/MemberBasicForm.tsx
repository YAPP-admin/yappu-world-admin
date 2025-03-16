import Radio from '@compnents/commons/Radio';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import { FC } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const MemberBasicForm: FC = () => {
  return (
    <Container>
      <Typography text="기본 정보" variatnt="heading2Bold" />
      <div className="wrapper">
        <Wrapper>
          <Typography
            text="이름"
            variatnt="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <TextInput
            inputSize="medium"
            borderColor={theme.colors.lineNormal.strong}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            text="이메일"
            variatnt="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <TextInput
            inputSize="medium"
            borderColor={theme.colors.lineNormal.strong}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            text="전화번호"
            variatnt="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <TextInput
            inputSize="medium"
            borderColor={theme.colors.lineNormal.strong}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            text="성별"
            variatnt="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <div id="radio-wrapper">
            <Radio label="남자" />
            <Radio label="여자" checked={true} />
          </div>
        </Wrapper>
        <Wrapper>
          <Typography
            text="권한"
            variatnt="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <SelePct width="120px" />
        </Wrapper>
        <Wrapper>
          <Typography
            text="가입일"
            variatnt="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <TextInput
            inputSize="medium"
            borderColor={theme.colors.lineNormal.strong}
          />
        </Wrapper>
      </div>
    </Container>
  );
};

export default MemberBasicForm;

const Container = styled.div`
  flex: 1;
  border-right: 1px solid ${theme.colors.lineSolid.alternative};
`;

const Wrapper = styled.div<{ width?: string }>`
  display: flex;
  gap: 24px;
  align-items: center;

  > span:first-child {
    width: ${({ width }) => (width ? width : '64px')};
    flex-shrink: 0;
  }

  > div:not(.select-wrapper) {
    flex: 1;
  }

  #radio-wrapper {
    display: flex;
    align-items: center;
    gap: 24px;
  }
`;
