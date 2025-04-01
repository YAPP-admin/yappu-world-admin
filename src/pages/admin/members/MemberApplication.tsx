import CircleCheck from '@assets/CircleCheck';
import CircleClose from '@assets/CircleClose';
import OutlinedButton from '@compnents/Button/OutlinedButton';
import TextButton from '@compnents/Button/TextButton';
import Chip, { ChipColor, ChipStyle } from '@compnents/commons/Chip';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import Checkbox from '@compnents/Control/Checkbox';
import StyledTable from '@compnents/table/StyledTable';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableHead from '@compnents/table/TableHead';
import TableRow from '@compnents/table/TableRow';
import { useApplicationListQuery } from '@queries/auth/useApplicationListQuery';
import { useApplicationStore } from '@stores/applicationStore';
import DetailPopup from 'features/member/application/DetailPopup';
import { FC } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const columns = [
  '번호',
  '이름',
  '이메일',
  '상태',
  '활동기수',
  '직군',
  '가입 요청일',
  '상세보기',
];

const MemberApplication: FC = () => {
  const { data } = useApplicationListQuery(1, 10);
  const {
    selectedIndexes,
    setSelectedIndexes,
    isDetailPopup,
    setIsDetailPopup,
    selectedId,
    setSelectedId,
  } = useApplicationStore();

  const applicationIds =
    data?.data.map((application) => Number(application.applicationId)) || [];

  const isAllChecked =
    applicationIds.length > 0 &&
    applicationIds.every((id) => selectedIndexes.includes(id));

  const onClickAllCheck = () => {
    if (isAllChecked) {
      setSelectedIndexes([]);
    } else {
      setSelectedIndexes(applicationIds);
    }
  };

  const onClickRowCheck = (id: number) => {
    if (selectedIndexes.includes(id)) {
      setSelectedIndexes(selectedIndexes.filter((v) => v !== id));
    } else {
      setSelectedIndexes([...selectedIndexes, id]);
    }
  };

  const onClickToDetail = (id: string) => {
    setSelectedId(id);
    setIsDetailPopup(true);
  };

  return (
    <>
      <Container>
        <Typography variant="title2Bold">가입신청서</Typography>

        <FlexBox direction="column" gap={8}>
          <FlexBox height="fit-content" justify="space-between" align="center">
            <FlexBox gap={8} height="fit-content" width="fit-content">
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

            <FlexBox gap={8} align="center" width="fit-content">
              <OutlinedButton
                color="status-positive"
                disabled={!selectedIndexes.length}
                variant="assistive"
                leftIcon={
                  <CircleCheck color={theme.colors.status.positive} size="16" />
                }
              >
                승인
              </OutlinedButton>
              <OutlinedButton
                color="status-negative"
                disabled={!selectedIndexes.length}
                variant="assistive"
                leftIcon={
                  <CircleClose color={theme.colors.status.nagative} size="16" />
                }
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
                {columns.map((col) => (
                  <TableCell as="th" key={col}>
                    <Typography
                      color="label-normal"
                      variant="body1Normal"
                      style={{ fontWeight: 600 }}
                    >
                      {col}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((el) => {
                const id = Number(el.applicationId);
                const isChecked = selectedIndexes.includes(id);
                return (
                  <TableRow key={el.applicationId}>
                    <TableCell>
                      <Checkbox
                        state={isChecked ? 'checked' : 'unchecked'}
                        onClick={() => onClickRowCheck(id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography color="label-normal" variant="body1Normal">
                        {el.applicationId}
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
                          text={el.status}
                          size="large"
                          color={getChipColor(el.status).color}
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
                        {el.applicationDate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TextButton
                        onClick={() => onClickToDetail(el.applicationId)}
                      >
                        상세보기
                      </TextButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </StyledTable>
        </FlexBox>
      </Container>
      {isDetailPopup && (
        <DetailPopup onClose={() => setIsDetailPopup(false)} id={selectedId} />
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

const getChipColor = (
  type: string,
): { color: ChipColor; variant: ChipStyle } => {
  switch (type) {
    case '대기':
      return { color: 'neutral', variant: 'weak' };
    case '거절':
      return { color: 'primary', variant: 'fill' };
    case '승인':
      return { color: 'secondary', variant: 'fill' };
    default:
      return { color: 'neutral', variant: 'weak' };
  }
};
