import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import ArrowLeft from '@assets/ArrowLeft';
import IconButton from '@compnents/Button/IconButton';
import { useSessionDetailQuery } from '@queries/session/useSessionDetailQuery';

import SessionDetail from './SessionDetail';
import SessionEdit from './SessionEdit';

const Session: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useSessionDetailQuery(params?.id ?? '');

  const [isEdit, setIsEdit] = useState(false);
  const onClickBack = () => {
    navigate('/admin/sessions');
  };

  return (
    <Container>
      <IconButton variant="outlined" onClick={onClickBack}>
        <ArrowLeft size="20" />
      </IconButton>
      {isEdit ? (
        <SessionEdit handleEdit={() => setIsEdit(false)} />
      ) : (
        <SessionDetail data={data} handleEdit={() => setIsEdit(true)} />
      )}
    </Container>
  );
};

export default Session;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 40px;
  gap: 40px;
`;
