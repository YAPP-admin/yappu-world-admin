import Radio from '@compnents/commons/Radio';
import RadioGroup from '@compnents/commons/RadioGroup';
import Select from '@compnents/commons/Select';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import { roleList } from '@constants/role';
import { RoleLabel, UserDetailRes } from 'apis/user/types';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import theme from 'styles/theme';

const MemberBasicForm: FC = () => {
  const { register, watch, setValue } = useFormContext<UserDetailRes>();

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
            {...register('name')}
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
            {...register('email')}
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
            {...register('phoneNumber')}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            children="성별"
            variant="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <RadioGroup name="gender" options={['남', '여']} />
        </Wrapper>
        <Wrapper>
          <Typography
            children="권한"
            variant="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <Select
            width="120px"
            optionList={roleList}
            selectedValue={watch('role')}
            onChange={(value: RoleLabel) => setValue('role', value)}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            children="가입일"
            variant="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <Typography
            children={watch('joinDate')}
            variant="body1Normal"
            style={{ color: theme.colors.label.alternative }}
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
