import { FC } from 'react';
import styled from 'styled-components';

import FlexBox from '@compnents/commons/FlexBox';
import Radio from '@compnents/commons/Radio';
import Typography from '@compnents/commons/Typography';

const list = [
  '20기',
  '21기',
  '22기',
  '23기',
  '24기',
  '25기',
  '26기',
  '27기',
  '28기',
  '29기',
]; // 추후 제거 예정

const TableFilterPopover: FC = () => {
  return (
    <Container>
      <FlexBox align="center" gap={8}>
        <Radio />
        <Typography color="label-normal" variant="body2Normal">
          전체 기수 선택
        </Typography>
      </FlexBox>
      <Divider />
      <ScrollArea>
        <ListWrapper>
          {list.map((li, index) => (
            <FlexBox key={index} align="center" gap={8}>
              <Radio />
              <Typography color="label-normal" variant="body2Normal">
                {li}
              </Typography>
            </FlexBox>
          ))}
        </ListWrapper>
      </ScrollArea>
    </Container>
  );
};

export default TableFilterPopover;

const Container = styled.div`
  border-radius: 6px;
  display: flex;
  padding: 10px;
  flex-direction: column;
  gap: 8px;
  box-shadow:
    0 2px 8px 0 rgba(0, 0, 0, 0.12),
    0 1px 4px 0 rgba(0, 0, 0, 0.08),
    0 0 1px 0 rgba(0, 0, 0, 0.08);
  width: fit-content;
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(112, 115, 124, 0.22);
`;

const ScrollArea = styled.div`
  max-height: 200px;
  overflow-y: auto;
  position: relative;

  &::before {
    content: '';
    position: sticky;
    top: 0;
    height: 16px;
    display: block;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
    z-index: 1;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: sticky;
    bottom: 0;
    height: 16px;
    display: block;
    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
    z-index: 1;
    pointer-events: none;
  }
`;

const ListWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
