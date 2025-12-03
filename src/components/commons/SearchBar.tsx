import Search from '@assets/Search';
import SolidButton from '@compnents/Button/SolidButton';
import { FC } from 'react';

import FlexBox from './FlexBox';
import TextInput from './TextInput';
import Typography from './Typography';

interface Props {
  value: string;
  placeholder?: string;
  width?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<Props> = ({
  value,
  placeholder = '검색하세요',
  width = '250px',
  onChange,
  onSearch,
  onKeyDown,
}) => {
  return (
    <FlexBox align="center" gap={8} height="fit-content" width="fit-content">
      <TextInput
        icon={<Search size="16" />}
        inputSize="small"
        placeholder={placeholder}
        value={value}
        width={width}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <SolidButton variant="secondary" onClick={onSearch}>
        <Typography
          color="primary-normal"
          fontWeight={600}
          style={{ whiteSpace: 'nowrap' }}
          variant="label1Regular"
        >
          검색
        </Typography>
      </SolidButton>
    </FlexBox>
  );
};

export default SearchBar;
