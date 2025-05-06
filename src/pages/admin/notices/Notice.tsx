import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import ArrowLeft from '@assets/ArrowLeft';
import IconButton from '@compnents/Button/IconButton';
import CompletePopup from '@compnents/popup/CompletePopup';
import { useNoticeDetailQuery } from '@queries/notice/useNoticeDetailQuery';
import { useNoticeStore } from '@stores/noticeStore';

import NoticeDetail from './NoticeDetail';
import NoticeEdit from './NoticeEdit';

const Notice: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useNoticeDetailQuery(params?.id ?? '');
  const isEditPopup = useNoticeStore((state) => state.isEditPopup);
  const setIsEditPopup = useNoticeStore((state) => state.setIsEditPopup);
  const isAddNoticeComplete = useNoticeStore(
    (state) => state.isAddNoticeComplete,
  );
  const setIsAddNoticeComplete = useNoticeStore(
    (state) => state.setIsAddNoticeComplete,
  );
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
      {isEditPopup && (
        <CompletePopup
          comment="공지사항이 정상적으로 수정 되었습니다."
          title="공지사항 수정 완료"
          onClose={() => setIsEditPopup(false)}
        />
      )}
      {isAddNoticeComplete && (
        <CompletePopup
          comment="공지사항이 정상적으로 추가 되었습니다."
          title="공지사항 추가 완료"
          onClose={() => setIsAddNoticeComplete(false)}
        />
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
