import NormalBlank from '@assets/NormalBlank';
import { sideNavList } from '@constants/sideNavList';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  pathname: string;
}

const SideNavList: FC<Props> = (props) => {
  const { pathname } = props;

  return (
    <Container>
      {sideNavList.map((el) => (
        <Wrapper key={el.title}>
          <Link
            to={el.path}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Route active={pathname === el.path}>
              <NormalBlank active={pathname === el.path} />
              <span>{el.title}</span>
            </Route>
          </Link>
          {el.childs &&
            el.childs.map((child, index) => (
              <Link
                to={child.path}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Route
                  key={index}
                  className="child"
                  active={pathname === child.path}
                >
                  <NormalBlank
                    width="16"
                    height="16"
                    active={pathname === child.path}
                  />
                  <span>{child.title}</span>
                </Route>
              </Link>
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
