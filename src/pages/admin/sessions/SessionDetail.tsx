import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import OutlinedButton from '@compnents/Button/OutlinedButton';
import Chip from '@compnents/commons/Chip';
import FlexBox from '@compnents/commons/FlexBox';
import GridBox from '@compnents/commons/GridBox';
import Typography from '@compnents/commons/Typography';
import { useDeleteSessionMutation } from '@queries/session/useDeleteSessionMutation';
import { useSessionStore } from '@stores/sessionStore';
import { getSessionType } from '@utils/getSessionType';
import { SessionDetailRes } from 'apis/session/types';

import 'dayjs/locale/ko';

dayjs.locale('ko');

interface Props {
  data: SessionDetailRes | undefined;
  handleEdit: () => void;
}

const SessionDetail: FC<Props> = ({ data, handleEdit }) => {
  const { mutateAsync } = useDeleteSessionMutation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const page = useSessionStore((state) => state.page);
  const setIsDeleteCompletePopup = useSessionStore(
    (state) => state.setIsDeleteCompletePopup,
  );

  const onClickToDelete = async () => {
    if (!data?.id) return;

    try {
      await mutateAsync({ ids: [data.id] });
      queryClient.invalidateQueries({ queryKey: ['session-list', page] });
      setIsDeleteCompletePopup(true);
      navigate('/admin/sessions');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <FlexBox align="center" justify="space-between">
        <Typography variant="title3Bold">{data?.name}</Typography>
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
      <FlexBox gap={73}>
        <GridBox columnGap={16} columns="80px auto" width="213px">
          <Typography color="label-alternative" variant="body1Normal">
            날짜
          </Typography>
          <Typography variant="body1Normal">
            {dayjs(data?.date).format('YYYY.MM.DD')} (
            {dayjs(data?.date).format('ddd')})
          </Typography>
        </GridBox>
        <GridBox columnGap={16} columns="80px auto">
          <Typography color="label-alternative" variant="body1Normal">
            시간
          </Typography>
          <Typography variant="body1Normal">
            {data?.time} - {data?.endTime}
          </Typography>
        </GridBox>
      </FlexBox>
      <FlexBox gap={73}>
        <GridBox columnGap={16} columns="80px auto" width="213px">
          <Typography color="label-alternative" variant="body1Normal">
            기수
          </Typography>
          <Typography variant="body1Normal">{data?.generation}기</Typography>
        </GridBox>
        <GridBox columnGap={16} columns="80px auto">
          <Typography color="label-alternative" variant="body1Normal">
            세션타입
          </Typography>
          <Chip
            color={getSessionType(data?.sessionType).color}
            size="large"
            text={getSessionType(data?.sessionType).text}
            variant={getSessionType(data?.sessionType).style}
          />
        </GridBox>
      </FlexBox>
      <GridBox columnGap={16} columns="80px auto">
        <Typography color="label-alternative" variant="body1Normal">
          장소
        </Typography>
        <Typography variant="body1Normal">{data?.place}</Typography>
      </GridBox>
    </Container>
  );
};

export default SessionDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
