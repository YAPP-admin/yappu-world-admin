import { isAxiosError } from 'axios';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import ArrowLeft from '@assets/ArrowLeft';
import IconButton from '@compnents/Button/IconButton';
import { useSessionDetailQuery } from '@queries/session/useSessionDetailQuery';
import { ErrorResponse } from 'apis/common/types';
import { showErrorToast } from 'types/showErrorToast';

import SessionDetail from './SessionDetail';
import SessionEdit from './SessionEdit';


const Session: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data, isError, error } = useSessionDetailQuery(params?.id ?? '');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (isError) {
      navigate('/admin/sessions');
    }
  }, [isError]);

  const onClickBack = () => {
    navigate('/admin/sessions');
  };

  if (isAxiosError<ErrorResponse>(error)) {
    console.log(error);
    showErrorToast(
      error.response?.data.message ?? '알 수 없는 에러가 발생했습니다.',
    );
    return null;
  }

  return (
    <Container>
      <IconButton variant="outlined" onClick={onClickBack}>
        <ArrowLeft size="20" />
      </IconButton>
      {isEdit ? (
        <SessionEdit data={data} handleEdit={() => setIsEdit(false)} />
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
