import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import FlexBox from '@compnents/commons/FlexBox';
import RadioGroup from '@compnents/commons/RadioGroup';
import Select from '@compnents/commons/Select';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import { userRoleOptionList } from '@constants/optionList';
import { formatPhoneNumber } from '@utils/formatPhoneNumber';
import { RoleLabel } from 'apis/user/types';
import { MemberFormType } from 'schema/MemberFormSchema';
import theme from 'styles/theme';

const MemberBasicForm: FC = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<MemberFormType>();

  return (
    <Container>
      <Typography variant="heading2Bold">기본정보</Typography>
      <div className="wrapper">
        <Wrapper>
          <Typography
            style={{ color: theme.colors.label.alternative }}
            variant="body1Normal"
          >
            이름
          </Typography>
          <FlexBox direction="column">
            <TextInput inputSize="medium" {...register('name')} />
            <Typography color="status-negative" variant="caption1Regular">
              {errors.name?.message}
            </Typography>
          </FlexBox>
        </Wrapper>
        <Wrapper>
          <Typography
            style={{ color: theme.colors.label.alternative }}
            variant="body1Normal"
          >
            이메일
          </Typography>
          <FlexBox direction="column">
            <TextInput inputSize="medium" {...register('email')} />
            <Typography color="status-negative" variant="caption1Regular">
              {errors.email?.message}
            </Typography>
          </FlexBox>
        </Wrapper>
        <Wrapper>
          <Typography
            style={{ color: theme.colors.label.alternative }}
            variant="body1Normal"
          >
            전화번호
          </Typography>
          <FlexBox direction="column">
            <TextInput
              inputSize="medium"
              {...register('phoneNumber')}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                setValue('phoneNumber', formatted);
              }}
            />
            <Typography color="status-negative" variant="caption1Regular">
              {errors.phoneNumber?.message}
            </Typography>
          </FlexBox>
        </Wrapper>
        <Wrapper>
          <Typography
            style={{ color: theme.colors.label.alternative }}
            variant="body1Normal"
          >
            성별
          </Typography>
          <RadioGroup
            name="gender"
            options={[
              { label: '남', value: '남' },
              { label: '여', value: '여' },
            ]}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            style={{ color: theme.colors.label.alternative }}
            variant="body1Normal"
          >
            권한
          </Typography>
          <FlexBox direction="column" width="100%">
            <Select
              optionList={userRoleOptionList}
              width="120px"
              selectedValue={
                userRoleOptionList.find((item) => item.label === watch('role'))
                  ?.value ?? ''
              }
              onChange={(value: string) => setValue('role', value as RoleLabel)}
            />
            <Typography color="status-negative" variant="caption1Regular">
              {errors.role?.message}
            </Typography>
          </FlexBox>
        </Wrapper>
        <Wrapper>
          <Typography
            style={{ color: theme.colors.label.alternative }}
            variant="body1Normal"
          >
            가입일
          </Typography>
          <Typography
            style={{ color: theme.colors.label.alternative }}
            variant="body1Normal"
          >
            {watch('registrationDate')}
          </Typography>
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
