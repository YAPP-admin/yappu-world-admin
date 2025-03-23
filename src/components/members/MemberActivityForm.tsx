import Plus from '@assets/Plus';
import Button from '@compnents/commons/Button';
import Typography from '@compnents/commons/Typography';
import { UserDetailRes } from 'apis/user/types';
import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import theme from 'styles/theme';
import GenerateForm from './GenerateForm';

const MemberActivityForm: FC = () => {
  const { control, watch } = useFormContext<UserDetailRes>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'activityUnits',
  });

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
          onClick={() =>
            append({
              generation: 0,
              position: '',
              isActive: true,
            })
          }
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
          {fields.map((unit, index) => (
            <GenerateForm
              key={unit.id}
              index={index}
              onRemove={() => remove(index)}
            />
          ))}
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
