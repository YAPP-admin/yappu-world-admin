import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import ArrowLeft from '@assets/ArrowLeft';
import IconButton from '@compnents/Button/IconButton';
import { useNoticeDetailQuery } from '@queries/notice/useNoticeDetailQuery';

import NoticeDetail from './NoticeDetail';
import NoticeEdit from './NoticeEdit';

const Notice: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useNoticeDetailQuery(params?.id ?? '');

  const [isEdit, setIsEdit] = useState(false);
  const onClickBack = () => {
    navigate('/admin/notices');
  };

  return (
    <Container>
      <IconButton variant="outlined" onClick={onClickBack}>
        <ArrowLeft size="20" />
      </IconButton>
      {isEdit ? (
        <NoticeEdit data={data} handleEdit={() => setIsEdit(false)} />
      ) : (
        <NoticeDetail data={data} handleEdit={() => setIsEdit(true)} />
      )}
    </Container>
  );
};

export default Notice;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 40px;
  gap: 40px;
`;
