import ArrowLeft from '@assets/ArrowLeft';
import IconButton from '@compnents/Button/IconButton';
import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import NoticeEdit from './NoticeEdit';
import NoticeDetail from './NoticeDetail';
import { useNoticeDetailQuery } from '@queries/notice/useNoticeDetailQuery';

const Notice: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useNoticeDetailQuery(Number(params.id ?? 0));

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
        <NoticeEdit handleEdit={() => setIsEdit(false)} data={data} />
      ) : (
        <NoticeDetail handleEdit={() => setIsEdit(true)} data={data} />
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
