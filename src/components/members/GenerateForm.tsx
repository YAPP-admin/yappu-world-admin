import Minus from '@assets/Minus';
import Icon from '@compnents/commons/Icon';
import Select from '@compnents/commons/Select';
import TextInput from '@compnents/commons/TextInput';
import { FC } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const GenerateForm: FC = () => {
  return (
    <Container>
      <TextInput
        unitText="기"
        width="80px"
        inputSize="medium"
        borderColor={theme.colors.lineNormal.strong}
      />
      <Select width="120px" />
      <Icon
        onClick={() => console.log('제거')}
        icon={<Minus color={theme.colors.status.nagative} />}
      />
    </Container>
  );
};

export default GenerateForm;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
