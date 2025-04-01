import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import NormalBlank from '@assets/NormalBlank';
import { sideNavList } from '@constants/sideNavList';

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
            style={{ textDecoration: 'none', color: 'inherit' }}
            to={el.path}
          >
            <Route $active={pathname === el.path}>
              <NormalBlank active={pathname === el.path} />
              <span>{el.title}</span>
            </Route>
          </Link>
          {el.childs &&
            el.childs.map((child, index) => (
              <Link
                key={index}
                style={{ textDecoration: 'none', color: 'inherit' }}
                to={child.path}
              >
                <Route
                  key={index}
                  $active={pathname === child.path}
                  className="child"
                >
                  <NormalBlank
                    active={pathname === child.path}
                    height="16"
                    width="16"
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

const Route = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 0;

  color: ${({ $active }) => ($active ? '#fa6027' : 'rgba(55, 56, 60, 0.61)')};
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
