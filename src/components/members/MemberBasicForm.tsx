import Radio from '@compnents/commons/Radio';
import Select from '@compnents/commons/Select';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import { FC } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const MemberBasicForm: FC = () => {
  return (
    <Container>
      <Typography children="기본 정보" variant="heading2Bold" />
      <div className="wrapper">
        <Wrapper>
          <Typography
            children="이름"
            variant="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <TextInput
            inputSize="medium"
            borderColor={theme.colors.lineNormal.strong}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            children="이메일"
            variant="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <TextInput
            inputSize="medium"
            borderColor={theme.colors.lineNormal.strong}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            children="전화번호"
            variant="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <TextInput
            inputSize="medium"
            borderColor={theme.colors.lineNormal.strong}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            children="성별"
            variant="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <div id="radio-wrapper">
            <Radio label="남자" />
            <Radio label="여자" checked={true} />
          </div>
        </Wrapper>
        <Wrapper>
          <Typography
            children="권한"
            variant="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <Select width="120px" />
        </Wrapper>
        <Wrapper>
          <Typography
            children="가입일"
            variant="body1Normal"
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
