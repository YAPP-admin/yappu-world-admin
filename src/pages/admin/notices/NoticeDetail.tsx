import OutlinedButton from '@compnents/Button/OutlinedButton';
import Chip from '@compnents/commons/Chip';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import { useDeleteNoticeMutation } from '@queries/notice/useDeleteNoticeMutation';
import { NoticeDetailRes } from 'apis/notice/types';
import RegisteredTime from 'features/notice/RegisteredTime';
import Writer from 'features/notice/Writer';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  handleEdit: () => void;
  data: NoticeDetailRes | undefined;
}

const NoticeDetail: FC<Props> = ({ handleEdit, data }) => {
  const params = useParams();
  const { mutate } = useDeleteNoticeMutation();

  const onClickToDelete = () => {
    if (!params.id) return;
    mutate({ id: params.id });
  };

  return (
    <Container>
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
  /* width: 1206px; */
  /* height: 1024px; */
  flex-shrink: 0;
`;

const Content = styled.div`
  width: 100%;
`;
