import Minus from '@assets/Minus';
import Icon from '@compnents/commons/Icon';
import Select from '@compnents/commons/Select';
import TextInput from '@compnents/commons/TextInput';
import { positionList } from '@constants/position';
import { UserDetailRes } from 'apis/user/types';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import theme from 'styles/theme';

interface Props {
  index: number;
  onRemove: () => void;
}

const GenerateForm: FC<Props> = (props) => {
  const { index, onRemove } = props;
  const { register, watch, setValue } = useFormContext<UserDetailRes>();
  return (
    <Container>
      <TextInput
        unitText="기"
        width="80px"
        inputSize="medium"
        borderColor={theme.colors.lineNormal.strong}
        {...register(`activityUnits.${index}.generation`)}
      />
      <Select
        width="120px"
        optionList={positionList}
        selectedValue={watch(`activityUnits.${index}.position`)}
        onChange={(value: string) =>
          setValue(`activityUnits.${index}.position`, value)
        }
      />
      <Icon
        onClick={onRemove}
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
