import NormalBlank from '@assets/NormalBlank';
import { sideNavList } from '@constants/sideNavList';
import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  curPath: string;
  onClick: () => void;
}

const SideNavList: FC<Props> = (props) => {
  const { curPath, onClick } = props;

  return (
    <Container>
      {sideNavList.map((el) => (
        <Wrapper key={el.title}>
          <Route active={curPath === el.path}>
            <NormalBlank active={curPath === el.path} />
            <span>{el.title}</span>
          </Route>
          {el.childs &&
            el.childs.map((child, index) => (
              <Route
                key={index}
                className="child"
                active={curPath === child.path}
              >
                <NormalBlank
                  width="16"
                  height="16"
                  active={curPath === child.path}
                />
                <span>{child.title}</span>
              </Route>
            ))}
        </Wrapper>
      ))}
    </Container>
  );
};

export default SideNavList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Route = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 0;

  color: ${({ active }) => (active ? '#fa6027' : 'rgba(55, 56, 60, 0.61)')};
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.091px;

  &.child {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.203px;
    padding-left: 24px;
  }
`;
