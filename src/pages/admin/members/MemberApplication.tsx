import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import CircleCheck from '@assets/CircleCheck';
import CircleClose from '@assets/CircleClose';
import Tune from '@assets/Tune';
import IconButton from '@compnents/Button/IconButton';
import OutlinedButton from '@compnents/Button/OutlinedButton';
import TextButton from '@compnents/Button/TextButton';
import Chip from '@compnents/commons/Chip';
import FlexBox from '@compnents/commons/FlexBox';
import SearchBar from '@compnents/commons/SearchBar';
import Typography from '@compnents/commons/Typography';
import Checkbox from '@compnents/Control/Checkbox';
import CompletePopup from '@compnents/popup/CompletePopup';
import Pagination from '@compnents/table/Pagination';
import Table from '@compnents/table/Table';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableFilterPopover from '@compnents/table/TableFilterPopover';
import TableHead from '@compnents/table/TableHead';
import TableRow from '@compnents/table/TableRow';
import {
  OptionType,
  positionOptionList,
  statusOptionList,
} from '@constants/optionList';
import { applicationHeader } from '@constants/tableHeader';
import { useDebounceCallBack } from '@hooks/useDebounceCallBack';
import { useTableFilter } from '@hooks/useTableFilter';
import { useApplicationListQuery } from '@queries/auth/useApplicationListQuery';
import { useGenerationListQuery } from '@queries/operation/useGenerationListQuery';
import { useApplicationStore } from '@stores/applicationStore';
import { getChipColor } from '@utils/getChipColor';
import { applicationFilterTypeMap } from '@utils/getTableFilter';
import { ApplicationListRes } from 'apis/auth/types';
import ApprovePopup from 'features/member/application/ApprovePopup';
import DetailPopup from 'features/member/application/DetailPopup';
import RefusePopup from 'features/member/application/RejectPopup';
import theme from 'styles/theme';

const MemberApplication: FC = () => {
  const {
    selectedIndexes,
    setSelectedIndexes,
    isDetailPopup,
    setIsDetailPopup,
    selectedList,
    setSelectedList,
    isApprovePopup,
    setIsApprovePopup,
    isApproveCompletePopup,
    setIsApproveCompletePopup,
    isRejectPopup,
    setIsRejectPopup,
    isRejectCompletePopup,
    setIsRejectCompletePopup,
    page,
    setPage,
  } = useApplicationStore();
  const [name, setName] = useState('');
  const {
    selectedFilters,
    openFilterType,
    setOpenFilterIndex,
    openFilterIndex,
    filterRefs,
    popoverRef,
    popoverPos,
    handleFilterClick,
    handleSelectFilter,
  } = useTableFilter({
    generation: '',
    position: '',
    status: '',
  });
  const { data, refetch } = useApplicationListQuery({
    page,
    size: 10,
    name,
    generation: selectedFilters.generation,
    position: selectedFilters.position,
    status: selectedFilters.status,
  });
  const { data: generation } = useGenerationListQuery(1, 100);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSearch = useDebounceCallBack(() => {
    refetch();
  }, 500);

  useEffect(() => {
    setSelectedIndexes([]);
  }, []);

  const applicationIds = data?.data.map((application) => application.id) || [];

  const isAllChecked =
    applicationIds.length > 0 &&
    applicationIds.every((id) => selectedIndexes.includes(id?.toString()));

  const onClickAllCheck = () => {
    if (isAllChecked) {
      setSelectedIndexes([]);
    } else {
      setSelectedIndexes(applicationIds);
    }
  };

  const onClickRowCheck = (id: string) => {
    if (selectedIndexes.includes(id)) {
      setSelectedIndexes(selectedIndexes.filter((v) => v !== id));
    } else {
      setSelectedIndexes([...selectedIndexes, id]);
    }
  };

  const onClickToDetail = (list: ApplicationListRes) => {
    setSelectedList(list);
    setIsDetailPopup(true);
    if (openFilterIndex !== null) {
      setOpenFilterIndex(null);
      return;
    }
  };

  const onChangePage = (page: number) => {
    setPage(page);
    setSelectedIndexes([]);
  };

  return (
    <>
      <Container>
        <Typography variant="title2Bold">가입신청서</Typography>
        <Wrapper>
          <FlexBox direction="column" gap={8}>
            <FlexBox
              // align="center"
              direction="column"
              gap={8}
              height="fit-content"
              justify="space-between"
            >
              <FlexBox
                align="center"
                gap={8}
                height="fit-content"
                width="fit-content"
              >
                <Typography variant="headline1Bold">신청리스트</Typography>
                <Typography
                  color="primary-normal"
                  variant="body1Normal"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {data?.totalCount}명
                </Typography>
              </FlexBox>
              <FlexBox justify="space-between">
                <SearchBar
                  placeholder="이름으로 검색하세요"
                  value={name}
                  onChange={handleSearchChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  onSearch={handleSearch}
                />
                <FlexBox align="center" gap={8} width="fit-content">
                  <OutlinedButton
                    color="status-positive"
                    disabled={!selectedIndexes.length}
                    variant="assistive"
                    leftIcon={
                      <CircleCheck
                        color={theme.colors.status.positive}
                        size="16"
                      />
                    }
                    onClick={() => setIsApprovePopup(true)}
                  >
                    승인
                  </OutlinedButton>
                  <OutlinedButton
                    color="status-negative"
                    disabled={!selectedIndexes.length}
                    variant="assistive"
                    leftIcon={
                      <CircleClose
                        color={theme.colors.status.nagative}
                        size="16"
                      />
                    }
                    onClick={() => setIsRejectPopup(true)}
                  >
                    거절
                  </OutlinedButton>
                </FlexBox>
              </FlexBox>
            </FlexBox>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell as="th">
                    <Checkbox
                      state={isAllChecked ? 'checked' : 'unchecked'}
                      onClick={onClickAllCheck}
                    />
                  </TableCell>
                  {applicationHeader.map((col, index) => {
                    const filterType =
                      applicationFilterTypeMap[col.title] ?? null;

                    const hasValue = filterType
                      ? selectedFilters[filterType] !== ''
                      : false;

                    return (
                      <TableCell key={col.title} as="th">
                        <FlexBox align="center" gap={4} justify="center">
                          <Typography
                            color="label-normal"
                            style={{ fontWeight: 600 }}
                            variant="body1Normal"
                          >
                            {col.title}
                          </Typography>
                          {col.isFilter && filterType && (
                            <IconButton
                              ref={(el) => {
                                filterRefs.current[index] = el;
                              }}
                              onClick={() =>
                                handleFilterClick(index, filterType)
                              }
                            >
                              <Tune
                                color={hasValue ? '#FA6027' : '#171719'}
                                size="16"
                              />
                            </IconButton>
                          )}
                        </FlexBox>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data.map((el) => {
                  const id = el.id;
                  const isChecked = selectedIndexes.includes(id);
                  return (
                    <TableRow key={el.id} onClick={() => onClickToDetail(el)}>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          state={isChecked ? 'checked' : 'unchecked'}
                          onClick={() => onClickRowCheck(id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="primary-normal"
                          variant="body1Normal"
                        >
                          {el.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="label-normal" variant="body1Normal">
                          {el.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="label-normal" variant="body1Normal">
                          <Chip
                            color={getChipColor(el.status).color}
                            size="large"
                            text={el.status}
                            variant={getChipColor(el.status).variant}
                          />
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="label-normal" variant="body1Normal">
                          {el.activityUnit.generation}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="label-normal" variant="body1Normal">
                          {el.activityUnit.position.label}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="label-normal" variant="body1Normal">
                          {el.processDate
                            ? dayjs(el.processDate).format('YYYY-MM-DD')
                            : '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <TextButton>상세보기</TextButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </FlexBox>
          {!!data?.data.length && (
            <Pagination
              currentPage={page}
              totalPages={data?.totalPages ?? 0}
              onPageChange={onChangePage}
            />
          )}
        </Wrapper>
      </Container>
      {isDetailPopup && (
        <DetailPopup
          selectedList={selectedList}
          onClose={() => setIsDetailPopup(false)}
        />
      )}
      {isApprovePopup && (
        <ApprovePopup
          isBulk
          selectedIndexes={selectedIndexes}
          onClose={() => setIsApprovePopup(false)}
        />
      )}
      {isApproveCompletePopup && (
        <CompletePopup
          comment="승인 처리되었습니다."
          title="승인 완료"
          onClose={() => setIsApproveCompletePopup(false)}
        />
      )}
      {isRejectPopup && (
        <RefusePopup
          isBulk
          selectedIndexes={selectedIndexes}
          onClose={() => setIsRejectPopup(false)}
        />
      )}
      {isRejectCompletePopup && (
        <CompletePopup
          comment="거절 처리되었습니다."
          title="거절 완료"
          onClose={() => setIsRejectCompletePopup(false)}
        />
      )}
      {openFilterIndex !== null && (
        <PopoverContainer
          ref={popoverRef}
          style={{ top: popoverPos.top, left: popoverPos.left }}
        >
          {openFilterType === 'generation' && (
            <TableFilterPopover
              title="기수"
              value={selectedFilters.generation}
              optionList={
                (generation?.data?.map((g) => ({
                  label: `${g.generation.toString()}기`,
                  value: g.generation.toString(),
                })) as OptionType[]) ?? []
              }
              onSelect={(v) => handleSelectFilter('generation', v)}
            />
          )}
          {openFilterType === 'position' && (
            <TableFilterPopover
              optionList={positionOptionList}
              title="직군"
              value={selectedFilters.position}
              onSelect={(v) => handleSelectFilter('position', v)}
            />
          )}
          {openFilterType === 'status' && (
            <TableFilterPopover
              optionList={statusOptionList}
              title="상태"
              value={selectedFilters.status}
              onSelect={(v) => handleSelectFilter('status', v)}
            />
          )}
        </PopoverContainer>
      )}
    </>
  );
};

export default MemberApplication;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 40px;
  gap: 24px;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  > div:first-child {
    flex: 1;
  }
`;

const PopoverContainer = styled.div`
  position: absolute;
  z-index: 10;
`;
