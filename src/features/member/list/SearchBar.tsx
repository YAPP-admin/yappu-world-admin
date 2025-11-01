import { FC } from 'react';

import Search from '@assets/Search';
import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';

const SearchBar: FC = () => {
  return (
    <FlexBox align="center" gap={8} height="fit-content" width="fit-content">
      <TextInput
        icon={<Search size="16" />}
        inputSize="small"
        placeholder="이름으로 검색하세요"
        width="250px"
      />
      <SolidButton variant="secondary">
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
