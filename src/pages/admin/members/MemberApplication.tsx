import { FC, useState } from 'react';
import styled from 'styled-components';

import CircleCheck from '@assets/CircleCheck';
import CircleClose from '@assets/CircleClose';
import OutlinedButton from '@compnents/Button/OutlinedButton';
import FlexBox from '@compnents/commons/FlexBox';
import SearchBar from '@compnents/commons/SearchBar';
import Typography from '@compnents/commons/Typography';
import CompletePopup from '@compnents/popup/CompletePopup';
import Pagination from '@compnents/table/Pagination';
import TableFilterPopover from '@compnents/table/TableFilterPopover';
import { useDebounceCallBack } from '@hooks/useDebounceCallBack';
import { useSelection } from '@hooks/useSelection';
import { useTableFilter } from '@hooks/useTableFilter';
import { useApplicationListQuery } from '@queries/auth/useApplicationListQuery';
import { useGenerationListQuery } from '@queries/operation/useGenerationListQuery';
import { useApplicationStore } from '@stores/applicationStore';
import { getApplicationFilterConfig } from '@utils/getTableFilter';
import { ApplicationListRes } from 'apis/auth/types';
import ApplicationTable from 'features/member/application/ApplicationTable';
import ApprovePopup from 'features/member/application/ApprovePopup';
import DetailPopup from 'features/member/application/DetailPopup';
import RefusePopup from 'features/member/application/RejectPopup';
import theme from 'styles/theme';

const MemberApplication: FC = () => {
  const {
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

  // useEffect(() => {
  //   setSelectedIndexes([]);
  // }, []);

  const applicationIds = data?.data.map((application) => application.id) || [];

  const { selected, setSelected, isAllChecked, toggleAll, toggleOne } =
    useSelection(applicationIds);

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
    setSelected([]);
  };

  const filterConfig = getApplicationFilterConfig(generation?.data);

  return (
    <>
      <Container>
        <Typography variant="title2Bold">가입신청서</Typography>
        <Wrapper>
          <FlexBox direction="column" gap={8}>
            <FlexBox
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
                    disabled={!selected.length}
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
                    disabled={!selected.length}
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
            <ApplicationTable
              data={data?.data}
              filterRefs={filterRefs}
              handleFilterClick={handleFilterClick}
              isAllChecked={isAllChecked}
              selected={selected}
              selectedFilters={selectedFilters}
              toggleAll={toggleAll}
              toggleOne={toggleOne}
              onClickToDetail={onClickToDetail}
            />
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
          selectedIndexes={selected}
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
          selectedIndexes={selected}
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
          {openFilterType && (
            <TableFilterPopover
              optionList={filterConfig[openFilterType].getOptions()}
              title={filterConfig[openFilterType].title}
              value={selectedFilters[openFilterType]}
              onSelect={(v) => handleSelectFilter(openFilterType, v)}
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
