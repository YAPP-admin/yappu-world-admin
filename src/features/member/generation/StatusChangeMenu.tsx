import Typography from '@compnents/commons/Typography';
import Switch from '@compnents/Control/Switch';
import { forwardRef } from 'react';
import styled from 'styled-components';

interface Props {
  active: boolean;
  onToggle?: () => void;
  top: number | null;
  left: number | null;
}

const StatusChangeMenu = forwardRef<HTMLDivElement, Props>(
  ({ active, onToggle, top, left }, ref) => {
    return (
      <Container ref={ref} top={top} left={left}>
        <Header>
          <Typography variant="caption1Regular" color="label-alternative">
            상태변경
          </Typography>
        </Header>
        <ToggleWrapper>
          <Typography variant="label1Normal" color="static-black">
            활동중
          </Typography>
          <Switch checked={active} size="small" onToggle={onToggle} />
        </ToggleWrapper>
      </Container>
    );
  },
);

export default StatusChangeMenu;

const Container = styled.div<{ top: number | null; left: number | null }>`
  display: flex;
  width: 130px;
  height: fit-content;
  padding: 8px;
  flex-direction: column;
  border-radius: 12px;
  background: #fff;
  box-shadow:
    0px 2px 8px 0px rgba(0, 0, 0, 0.12),
    0px 1px 4px 0px rgba(0, 0, 0, 0.08),
    0px 0px 1px 0px rgba(0, 0, 0, 0.08);
  position: absolute;
  top: ${({ top }) => (top ? `${top}px` : '')};
  left: ${({ left }) => (left ? `${left}px` : '')};
  z-index: 10;
`;

const Header = styled.div`
  display: flex;
  padding: 4px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

const ToggleWrapper = styled.div`
  display: flex;
  padding: 4px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;
