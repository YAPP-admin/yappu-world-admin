import { FC, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import OutlinedButton from '@compnents/Button/OutlinedButton';
import Chip from '@compnents/commons/Chip';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import ConfirmPopup from '@compnents/popup/ConfirmPopup';
import { useDeleteNoticeMutation } from '@queries/notice/useDeleteNoticeMutation';
import { NoticeDetailRes } from 'apis/notice/types';
import RegisteredTime from 'features/notice/components/RegisteredTime';
import Writer from 'features/notice/components/Writer';

interface Props {
  handleEdit: () => void;
  data: NoticeDetailRes | undefined;
}

const NoticeDetail: FC<Props> = ({ handleEdit, data }) => {
  const params = useParams();
  const { mutate } = useDeleteNoticeMutation();
  const [isDeletePopup, setIsDeletePopup] = useState(false);

  const onClickToDelete = () => {
    if (!params.id) return;
    mutate({ noticeIds: [params.id] });
  };

  return (
    <>
      <Container>
        <FlexBox direction="column" gap={24}>
          <FlexBox direction="column" gap={8}>
            <FlexBox align="center" justify="space-between">
              <FlexBox align="center" gap={24}>
                <Chip
                  color={data?.type === 'OPERATION' ? 'primary' : 'secondary'}
                  size="large"
                  text={data?.type === 'OPERATION' ? '운영' : '세션'}
                  variant="weak"
                />
                <Writer name={data?.writer.name ?? ''} />
                <RegisteredTime date={data?.createdAt ?? ''} />
              </FlexBox>
              <FlexBox gap={8} width="fit-content">
                <OutlinedButton
                  size="xsmall"
                  variant="assistive"
                  onClick={handleEdit}
                >
                  수정
                </OutlinedButton>
                <OutlinedButton
                  size="xsmall"
                  variant="assistive"
                  onClick={() => setIsDeletePopup(true)}
                >
                  삭제
                </OutlinedButton>
              </FlexBox>
            </FlexBox>
            <Typography variant="title3Bold">{data?.title}</Typography>
          </FlexBox>
          <Content>
            <ReactMarkdown>{data?.content}</ReactMarkdown>
          </Content>
        </FlexBox>
      </Container>
      {isDeletePopup && (
        <ConfirmPopup
          comment="삭제 후 복구가 불가능합니다. "
          confirmActionLabel="삭제"
          title="공지사항을 삭제할까요?"
          onCancelAction={() => setIsDeletePopup(false)}
          onConfirmAction={onClickToDelete}
        />
      )}
    </>
  );
};

export default NoticeDetail;

const Container = styled.div`
  flex-shrink: 0;
`;

const Content = styled.div`
  width: 100%;
`;
