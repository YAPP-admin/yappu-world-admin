import dayjs from 'dayjs';
import { FC, useState } from 'react';
import styled from 'styled-components';

import Close from '@assets/Close';
import IconButton from '@compnents/Button/IconButton';
import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import Checkbox from '@compnents/Control/Checkbox';
import PopupContainer from '@compnents/popup/PopupContainer';
import Pagination from '@compnents/table/Pagination';
import { useAllNoticeQuery } from '@queries/notice/useAllNoticeQuery';
import { useSessionStore } from '@stores/sessionStore';
import { NoticeRes } from 'apis/notice/types';

interface Props {
  onClose: () => void;
}

const RelatedNoticePopup: FC<Props> = ({ onClose }) => {
  const [page, setPage] = useState(1);
  const { data } = useAllNoticeQuery(page);
  const selectedNotices = useSessionStore((state) => state.selectedNotices);
  const setSelectedNoticds = useSessionStore(
    (state) => state.setSelectedNoticds,
  );

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const toggleChecked = (notice: NoticeRes) => {
    const exists = selectedNotices.find(
      (el) => el.noticeId === notice.noticeId,
    );
    const next = exists
      ? selectedNotices.filter((s) => s.noticeId !== notice.noticeId)
      : [...selectedNotices, notice];
    setSelectedNoticds(next);
  };

  return (
    <PopupContainer onClose={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <FlexBox justify="space-between" padding="24px">
          <Typography variant="headline1Bold">연계 공지사항 선택</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </FlexBox>

        <Content>
          {data?.data.map((el) => {
            const checked = selectedNotices.find(
              (n) => n.noticeId === el.noticeId,
            );
            return (
              <FlexBox key={el.noticeId} gap={8}>
                <Checkbox
                  state={checked ? 'checked' : 'unchecked'}
                  onClick={() => toggleChecked(el)}
                />
                <Typography color="label-normal" variant="body2Normal">
                  {el.title}
                  {'  '}
                  <Typography color="label-assistive" variant="body2Normal">
                    ({dayjs(el.createdAt).format('YY.MM.DD')})
                  </Typography>
                </Typography>
              </FlexBox>
            );
          })}
          <Pagination
            isHideText
            currentPage={page}
            totalPages={data?.totalPages ?? 0}
            onPageChange={onChangePage}
          />
        </Content>

        <ButtonWrapper>
          <SolidButton
            disabled={!selectedNotices.length}
            size="xlarge"
            variant="primary"
            onClick={onClose}
          >
            선택 완료
          </SolidButton>
        </ButtonWrapper>
      </Container>
    </PopupContainer>
  );
};

export default RelatedNoticePopup;

const Container = styled.div`
  display: flex;
  width: 586px;
  flex-direction: column;
  border-radius: 16px;
  box-shadow:
    0px 6px 12px 0px rgba(0, 0, 0, 0.12),
    0px 4px 8px 0px rgba(0, 0, 0, 0.08),
    0px 0px 4px 0px rgba(0, 0, 0, 0.08);
  background: #fff;
  min-height: 50%;

  div {
    box-sizing: border-box;
  }
`;

const ButtonWrapper = styled.div`
  padding: 24px;
  button {
    width: 100%;
  }
`;

const Content = styled.div`
  flex: 1;
  border-top: 1px solid rgba(112, 115, 124, 0.22);
  border-bottom: 1px solid rgba(112, 115, 124, 0.22);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
