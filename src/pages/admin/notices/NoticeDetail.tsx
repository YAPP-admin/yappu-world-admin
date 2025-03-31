import ArrowLeft from '@assets/ArrowLeft';
import IconButton from '@compnents/Button/IconButton';
import OutlinedButton from '@compnents/Button/OutlinedButton';
import Chip from '@compnents/commons/Chip';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import { useNoticeDetailQuery } from '@queries/notice/useNoticeDetailQuery';
import RegisteredTime from 'features/notice/RegisteredTime';
import Writer from 'features/notice/Writer';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { useDeleteNoticeMutation } from '@queries/notice/useDeleteNoticeMutation';

const NoticeDetail: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useNoticeDetailQuery(Number(params.id ?? 0));
  const { mutate } = useDeleteNoticeMutation();

  const onClickBack = () => {
    navigate('/admin/notices');
  };

  const onClickToDelete = () => {
    if (!params.id) return;
    mutate({ id: params.id });
  };

  return (
    <Container>
      <IconButton variant="outlined" onClick={onClickBack}>
        <ArrowLeft size="20" />
      </IconButton>
      <FlexBox direction="column" gap={24}>
        <FlexBox direction="column" gap={8}>
          <FlexBox justify="space-between" align="center">
            <FlexBox gap={24} align="center">
              <Chip
                variant="weak"
                text={data?.type === 'OPERATION' ? '운영' : '세션'}
                color={data?.type === 'OPERATION' ? 'primary' : 'secondary'}
                size="large"
              />
              <Writer name={data?.writer.name ?? ''} />
              <RegisteredTime date={data?.createdAt ?? ''} />
            </FlexBox>
            <FlexBox gap={8} width="fit-content">
              <OutlinedButton size="xsmall" variant="assistive">
                수정
              </OutlinedButton>
              <OutlinedButton
                size="xsmall"
                variant="assistive"
                onClick={onClickToDelete}
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
  );
};

export default NoticeDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 40px;
  gap: 40px;
  /* width: 1206px; */
  /* height: 1024px; */
  flex-shrink: 0;
`;

const Content = styled.div`
  width: 100%;
`;
