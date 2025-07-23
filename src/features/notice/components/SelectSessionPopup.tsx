import { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import Close from '@assets/Close';
import IconButton from '@compnents/Button/IconButton';
import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import Select, { OptionType } from '@compnents/commons/Select';
import Typography from '@compnents/commons/Typography';
import PopupContainer from '@compnents/popup/PopupContainer';
import Pagination from '@compnents/table/Pagination';
import { useSessionQuery } from '@queries/session/useSessionQuery';
import theme from 'styles/theme';
import { BaseNoticeType } from 'types/formTypes';

import SessionListTable from './SessionListTable';
import { useGenerationListQuery } from '../../../queries/operation/useGenerationListQuery';

interface Props {
  onClose: () => void;
}

const SelectSessionPopup: FC<Props> = ({ onClose }) => {
  const { setValue, watch } = useFormContext<BaseNoticeType>();
  const { data: generationList, isFetching } = useGenerationListQuery(1, 100);
  const optionList: OptionType[] =
    generationList?.data.map((el) => ({
      label: el.generation?.toString() + '기',
      value: el.generation?.toString(),
    })) ?? [];
  const [selectedGeneration, setSelectedGeneration] = useState<string | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const { data: sessionList, refetch } = useSessionQuery(
    page,
    false,
    Number(selectedGeneration),
  );

  const onClickGeneration = (value: string) => {
    setSelectedGeneration(value);
  };

  const onClickToRefetch = () => {
    refetch();
    setPage(1);
  };

  const selectedSessionId = watch('sessionId');

  return (
    <PopupContainer onClose={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <FlexBox justify="space-between" padding="24px">
          <Typography variant="headline1Bold">공지 대상 세션 선택</Typography>
          <IconButton onClick={onClose}>
            <Close color={theme.colors.label.assistive} />
          </IconButton>
        </FlexBox>
        <Content>
          <FlexBox align="center" gap={16}>
            <Select
              defaultSelectLabel="기수를 선택해주세요."
              disabled={isFetching}
              optionList={optionList}
              size="large"
              width="191px"
              selectedValue={
                optionList.find((item) => item.value === selectedGeneration)
                  ?.value ?? ''
              }
              onChange={(value) => {
                onClickGeneration(value);
              }}
            />
            <SolidButton
              disabled={!selectedGeneration || isFetching}
              size="medium"
              variant="secondary"
              onClick={onClickToRefetch}
            >
              선택
            </SolidButton>
          </FlexBox>
          {sessionList?.data ? (
            <>
              <SessionListTable
                selectedSessionId={selectedSessionId}
                sessionList={sessionList.data}
                onSelectSessionId={(id) => setValue('sessionId', id)}
              />
              <Pagination
                isHideText
                currentPage={page}
                style={{ margin: '0 auto' }}
                totalPages={sessionList?.totalPages ?? 0}
                onPageChange={setPage}
              />
            </>
          ) : (
            <FlexBox align="center" height="200px" justify="center">
              <Typography color="label-alternative" variant="body1Normal">
                공지를 노출할 기수/세션을 선택해주세요.
              </Typography>
            </FlexBox>
          )}
        </Content>
        <FlexBox gap={8} justify="flex-end" padding="24px">
          <OutlinedButton size="medium" variant="assistive">
            취소
          </OutlinedButton>
          <SolidButton
            disabled={!selectedSessionId}
            size="medium"
            onClick={onClose}
          >
            저장
          </SolidButton>
        </FlexBox>
      </Container>
    </PopupContainer>
  );
};

export default SelectSessionPopup;

const Container = styled.div`
  background: #fff;
  border-radius: 16px;
  display: flex;
  width: 744px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
  box-shadow:
    0px 6px 12px 0px rgba(0, 0, 0, 0.12),
    0px 4px 8px 0px rgba(0, 0, 0, 0.08),
    0px 0px 4px 0px rgba(0, 0, 0, 0.08);

  div {
    box-sizing: border-box;
  }

  thead td {
    background: rgba(112, 115, 124, 0.08);
  }
`;

const Content = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  align-self: stretch;
  border-top: 1px solid rgba(112, 115, 124, 0.08);
  border-bottom: 1px solid rgba(112, 115, 124, 0.08);
`;
