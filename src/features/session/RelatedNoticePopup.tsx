import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import Close from '@assets/Close';
import Search from '@assets/Search';
import IconButton from '@compnents/Button/IconButton';
import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import Checkbox from '@compnents/Control/Checkbox';
import PopupContainer from '@compnents/popup/PopupContainer';
import Pagination from '@compnents/table/Pagination';
import { useTargetableNoticesQuery } from '@queries/session/useTargetableNoticesQuery';
import { TargetableNoticesRes } from 'apis/session/types';
import { SessionFormType } from 'schema/SessionFormScheme';


interface Props {
  onClose: () => void;
}

const RelatedNoticePopup: FC<Props> = ({ onClose }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data } = useTargetableNoticesQuery(page, search);

  const { watch, setValue } = useFormContext<SessionFormType>();

  const formNotices = watch('notices') ?? [];

  const onChangePage = (page: number) => setPage(page);

  const toggleChecked = (notice: TargetableNoticesRes) => {
    const id = notice.id;
    const exists = formNotices.some((n) => n.noticeId === id);
    const next = exists
      ? formNotices.filter((n) => n.noticeId !== id)
      : [...formNotices, { noticeId: id, title: notice.title }];

    setValue('notices', next, { shouldDirty: true, shouldValidate: true });
  };

  const onChangeSearchText = (value: string) => {
    setSearch(value);
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
          <SearchWrapper>
            <Search color="rgba(55, 56, 60, 0.28)" />
            <TextInput
              placeholder="공지 제목을 검색하세요"
              value={search}
              onChange={(e) => onChangeSearchText(e.target.value)}
            />
          </SearchWrapper>
          {data?.data.length ? (
            <>
              {data?.data.map((el) => {
                const checked = formNotices.find((n) => n.noticeId === el.id);
                return (
                  <FlexBox key={el.id} gap={8}>
                    <Checkbox
                      disabled={el.isSelectedByOtherSession}
                      state={checked ? 'checked' : 'unchecked'}
                      onClick={() => toggleChecked(el)}
                    />
                    <Typography
                      variant="body2Normal"
                      color={
                        el.isSelectedByOtherSession
                          ? 'label-disable'
                          : 'label-normal'
                      }
                    >
                      {el.title}
                      {'  '}
                      <Typography
                        variant="body2Normal"
                        color={
                          el.isSelectedByOtherSession
                            ? 'label-disable'
                            : 'label-assistive'
                        }
                      >
                        ({dayjs(el.createdAt).format('YY.MM.DD')})
                      </Typography>
                    </Typography>
                  </FlexBox>
                );
              })}
            </>
          ) : (
            <FlexBox align="center" flex={1} justify="center">
              <Typography color="label-assistive" variant="body1Normal">
                작성된 공지사항이 없습니다.
              </Typography>
            </FlexBox>
          )}

          {!!data?.data.length && (
            <Pagination
              isHideText
              currentPage={page}
              totalPages={data?.totalPages ?? 0}
              onPageChange={onChangePage}
            />
          )}
        </Content>

        <ButtonWrapper>
          <SolidButton
            disabled={!formNotices.length}
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

  > span {
    justify-content: center;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid rgba(112, 115, 124, 0.22);
  padding-left: 16px;
  border-radius: 12px;

  svg {
  }
  div {
    border: none;
  }
`;
