import { FC } from 'react';
import styled from 'styled-components';

import Tune from '@assets/Tune';
import IconButton from '@compnents/Button/IconButton';
import Chip from '@compnents/commons/Chip';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import Pagination from '@compnents/table/Pagination';
import Table from '@compnents/table/Table';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableHead from '@compnents/table/TableHead';
import TableRow from '@compnents/table/TableRow';
import { memberListHeader } from '@constants/tableHeader';
import useUserListQuery from '@queries/user/useUserListQuery';
import { useMemberStore } from '@stores/memberStore';
import { UserList } from 'apis/user/types';
import MemberDetailPopup from 'features/member/list/MemberDetailPopup';
import SearchBar from 'features/member/list/SearchBar';

const MemberList: FC = () => {
  const {
    setSelectedUserId,
    detailPopupOpen,
    setDetailPopupOpen,
    page,
    setPage,
  } = useMemberStore();
  const { data } = useUserListQuery({ page, size: 10 });

  const onClickRow = (row: UserList) => {
    setSelectedUserId(row.userId);
    setDetailPopupOpen();
  };

  return (
    <>
      <Container>
        <Typography variant="title2Bold">전체 회원 리스트</Typography>
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
                <Typography variant="headline1Bold">회원리스트</Typography>
                <Typography
                  color="primary-normal"
                  fontWeight="bold"
                  variant="body1Normal"
                >
                  {data?.totalCount}명
                </Typography>
              </FlexBox>
              <SearchBar />
            </FlexBox>
            <Table>
              <TableHead>
                <TableRow>
                  {memberListHeader.map((col) => (
                    <TableCell key={col.title} as="th">
                      <FlexBox align="center" gap={4} justify="center">
                        <Typography
                          color="label-normal"
                          style={{ fontWeight: 600 }}
                          variant="body1Normal"
                        >
                          {col.title}
                        </Typography>
                        {col.isFilter && (
                          <IconButton>
                            <Tune size="16" />
                          </IconButton>
                        )}
                      </FlexBox>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data.map((el) => (
                  <TableRow key={el.userId} onClick={() => onClickRow(el)}>
                    <TableCell>
                      <Typography color="primary-normal" variant="body1Normal">
                        {el.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="label-normal" variant="body1Normal">
                        {el.generation}기
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="label-normal" variant="body1Normal">
                        {el.position}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        role={el.role.name}
                        size="large"
                        text={el.role.label}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography color="label-normal" variant="body1Normal">
                        {el.registrationDate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="label-normal" variant="body1Normal">
                        {el.isActive}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </FlexBox>
          <Pagination
            currentPage={page}
            totalPages={data?.totalPages ?? 0}
            onPageChange={setPage}
          />
        </Wrapper>
      </Container>
      {detailPopupOpen && <MemberDetailPopup onClose={setDetailPopupOpen} />}
    </>
  );
};

export default MemberList;

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
