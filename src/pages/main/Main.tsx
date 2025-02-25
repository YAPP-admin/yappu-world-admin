import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import useSampleStore from '@stores/useSampleStore';

const Main: FC = () => {
  const { count, setIncreaseCounts } = useSampleStore();
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Welcome Yappu World Admin Main Page!</h1>
      <button onClick={setIncreaseCounts}>click to increase</button>
      <span>{count}</span>
      <button onClick={() => navigate('/detail')}>move to detail page</button>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  > button {
    border: none;
    background: pink;
    border-radius: 10px;
    padding: 10px;
  }
`;
