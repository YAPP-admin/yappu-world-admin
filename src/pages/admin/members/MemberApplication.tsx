import dayjs from 'dayjs';
import { FC } from 'react';
import styled from 'styled-components';

import CircleCheck from '@assets/CircleCheck';
import CircleClose from '@assets/CircleClose';
import OutlinedButton from '@compnents/Button/OutlinedButton';
import TextButton from '@compnents/Button/TextButton';
import Chip from '@compnents/commons/Chip';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import Checkbox from '@compnents/Control/Checkbox';
import CompletePopup from '@compnents/popup/CompletePopup';
import Pagination from '@compnents/table/Pagination';
import StyledTable from '@compnents/table/Table';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableHead from '@compnents/table/TableHead';
import TableRow from '@compnents/table/TableRow';
import { applicationHeader } from '@constants/tableHeader';
import { useApplicationListQuery } from '@queries/auth/useApplicationListQuery';
import { useApplicationStore } from '@stores/applicationStore';
import { getChipColor } from '@utils/getChipColor';
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
  const { data } = useApplicationListQuery(page, 10);

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
  };

  return (
    <>
      <Container>
        <Typography variant="title2Bold">가입신청서</Typography>
        <Wrapper>
          <FlexBox direction="column" gap={8}>
            <FlexBox
              align="center"
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
                  color="label-alternative"
                  variant="body1Normal"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {data?.totalCount}개
                </Typography>
              </FlexBox>

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
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell as="th">
                    <Checkbox
                      state={isAllChecked ? 'checked' : 'unchecked'}
                      onClick={onClickAllCheck}
                    />
                  </TableCell>
                  {applicationHeader.map((col) => (
                    <TableCell key={col} as="th">
                      <Typography
                        color="label-normal"
                        style={{ fontWeight: 600 }}
                        variant="body1Normal"
                      >
                        {col}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data.map((el, index) => {
                  const id = el.id;
                  const isChecked = selectedIndexes.includes(id);
                  return (
                    <TableRow key={el.id}>
                      <TableCell>
                        <Checkbox
                          state={isChecked ? 'checked' : 'unchecked'}
                          onClick={() => onClickRowCheck(id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography color="label-normal" variant="body1Normal">
                          {index + 1}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="label-normal" variant="body1Normal">
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
                          {dayjs(el.applicationDate).format('YYYY-MM-DD')}
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
                        <TextButton onClick={() => onClickToDetail(el)}>
                          상세보기
                        </TextButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </StyledTable>
          </FlexBox>
          <Pagination
            currentPage={page}
            totalPages={data?.totalPages ?? 0}
            onPageChange={setPage}
          />
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
