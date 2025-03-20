import Plus from '@assets/Plus';
import Button from '@compnents/commons/Botton';
import Typography from '@compnents/commons/Typography';
import { FC } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import GenerateForm from './GenerateForm';

const MemberActivityForm: FC = () => {
  return (
    <Container className="wrapper">
      <Header>
        <Typography children="활동 정보" variant="heading2Bold" />
        <Button
          text="추가"
          buttonSize="xsmall"
          variant="outlined"
          variantType="assistive"
          leftIcon={<Plus />}
          onClick={() => console.log('추가')}
        />
      </Header>

      <Content className="wrapper">
        <Title>
          <Typography
            children="기수"
            variant="body1Normal"
            style={{
              color: theme.colors.label.alternative,
              fontWeight: 600,
              width: '80px',
            }}
          />
          <Typography
            children="직군"
            variant="body1Normal"
            style={{
              color: theme.colors.label.alternative,
              fontWeight: 600,
            }}
          />
        </Title>
        <Wrapper className="wrapper">
          <GenerateForm />
          <GenerateForm />
          <GenerateForm />
        </Wrapper>
      </Content>
    </Container>
  );
};

export default MemberActivityForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 300px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.div`
  display: flex;
  padding: 8px 0;
  align-items: center;
  gap: 16px;
`;

const Wrapper = styled.div<{ width?: string }>`
  overflow-y: auto;
  flex: 1;
`;
