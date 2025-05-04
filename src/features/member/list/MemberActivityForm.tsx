import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import Plus from '@assets/Plus';
import OutlinedButton from '@compnents/Button/OutlinedButton';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import { MemberFormType } from 'schema/MemberFormSchema';
import theme from 'styles/theme';

import GenerateForm from './GenerateForm';

const MemberActivityForm: FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<MemberFormType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'activityUnits',
  });

  return (
    <Container className="wrapper">
      <Header>
        <Typography variant="heading2Bold">활동 정보</Typography>
        <OutlinedButton
          leftIcon={<Plus />}
          size="xsmall"
          variant="assistive"
          onClick={() =>
            append({
              id: null,
              generation: 0,
              position: '',
            })
          }
        >
          추가
        </OutlinedButton>
      </Header>

      <Content className="wrapper">
        <Title>
          <Typography
            variant="body1Normal"
            style={{
              color: theme.colors.label.alternative,
              fontWeight: 600,
              width: '80px',
            }}
          >
            기수
          </Typography>
          <Typography
            variant="body1Normal"
            style={{
              color: theme.colors.label.alternative,
              fontWeight: 600,
            }}
          >
            직군
          </Typography>
        </Title>
        <Wrapper className="wrapper">
          {fields.map((unit, index) => {
            const unitError = errors.activityUnits?.[index];

            const errorMessage =
              unitError?.generation?.message ??
              unitError?.position?.message ??
              '';

            return (
              <FlexBox key={unit.id} direction="column">
                <GenerateForm index={index} onRemove={() => remove(index)} />
                {errorMessage && (
                  <Typography color="status-negative" variant="caption1Regular">
                    {errorMessage}
                  </Typography>
                )}
              </FlexBox>
            );
          })}
          <Typography color="status-negative" variant="caption1Regular">
            {errors.activityUnits?.root?.message}
          </Typography>
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
