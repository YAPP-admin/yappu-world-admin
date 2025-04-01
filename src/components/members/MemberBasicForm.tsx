import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import RadioGroup from '@compnents/commons/RadioGroup';
import Select from '@compnents/commons/Select';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import { roleList } from '@constants/role';
import { RoleLabel, UserDetailRes } from 'apis/user/types';
import theme from 'styles/theme';

const MemberBasicForm: FC = () => {
  const { register, watch, setValue } = useFormContext<UserDetailRes>();

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
          <TextInput
            borderColor={theme.colors.lineNormal.strong}
            inputSize="medium"
            {...register('name')}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            style={{ color: theme.colors.label.alternative }}
            variant="body1Normal"
          >
            이메일
          </Typography>
          <TextInput
            borderColor={theme.colors.lineNormal.strong}
            inputSize="medium"
            {...register('email')}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            style={{ color: theme.colors.label.alternative }}
            variant="body1Normal"
          >
            전화번호
          </Typography>
          <TextInput
            borderColor={theme.colors.lineNormal.strong}
            inputSize="medium"
            {...register('phoneNumber')}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            style={{ color: theme.colors.label.alternative }}
            variant="body1Normal"
          >
            성별
          </Typography>
          <RadioGroup name="gender" options={['남', '여']} />
        </Wrapper>
        <Wrapper>
          <Typography
            style={{ color: theme.colors.label.alternative }}
            variant="body1Normal"
          >
            권한
          </Typography>
          <Select
            optionList={roleList}
            selectedValue={watch('role')}
            width="120px"
            onChange={(value: RoleLabel) => setValue('role', value)}
          />
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
            {watch('joinDate')}
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
