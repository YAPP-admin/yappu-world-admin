import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import useSampleDataQuery from '@queries/sample/useSampleDataQuery';

const Detail: FC = () => {
  const navigate = useNavigate();
  const { data } = useSampleDataQuery();

  return (
    <Container>
      <h1>Welcome Yappu World Admin Detail Page!</h1>
      <div>{data?.data.data}</div>
      <button onClick={() => navigate('/')}>move to main page</button>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  > button {
    border: 1px solid pink;
    background: #fff;
    padding: 10px;
    color: pink;
    border-radius: 10px;
  }
`;
