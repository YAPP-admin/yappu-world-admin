import Chip from '@compnents/commons/Chip';
import Typography from '@compnents/commons/Typography';
import MemberDetailPopup from '@compnents/popup/MemberDetailPopup';
import Table, { TableColumn } from '@compnents/table/Table';
import useUserListQuery from '@queries/user/useUserListQuery';
import { useMemberStore } from '@stores/memberStore';
import { UserList } from 'apis/user/types';
import { getUserDetail } from 'apis/user/UserApis';
import { FC } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const columns: TableColumn<UserList>[] = [
  { field: 'userId', fieldName: '번호' },
  {
    field: 'name',
    fieldName: '이름',
    renderCell: (row) => (
      <Typography
        children={row.name}
        variant={'label1Normal'}
        style={{ color: theme.colors.primary.normal, fontWeight: 600 }}
      />
    ),
  },
  { field: 'generation', fieldName: '최근활동기수' },
  { field: 'position', fieldName: '직군' },
  {
    field: 'role',
    fieldName: '권한',
    renderCell: (row) => <Chip text={row.role} variant="weak" />,
  },
  { field: 'date', fieldName: '가입일' },
  { field: 'isExit', fieldName: '탈퇴여부' },
];

const MemberList: FC = () => {
  const {
    selectedUserId,
    setSelectedUserId,
    setUserDetailInfo,
    detailPopupOpen,
    setDetailPopupOpen,
  } = useMemberStore();
  const { data: userList } = useUserListQuery({ page: 1, size: 10 });

  const fetchUserDetail = async (userId: number) => {
    const response = await getUserDetail(userId);
    setUserDetailInfo(response.data);
  };

  const onClickRow = (row: UserList) => {
    setSelectedUserId(Number(row.userId));
    fetchUserDetail(Number(row.userId));
    setDetailPopupOpen();
  };

  return (
    <>
      <Container>
        <Typography
          children="전체 회원 리스트"
          variant="title2Bold"
          style={{ fontWeight: 700 }}
        />

        <Table<UserList>
          tableTitle="회원리스트"
          counts={userList?.totalCount ?? 0}
          data={userList?.data ?? []}
          columns={columns}
          onClickRow={onClickRow}
        />
      </Container>
      {detailPopupOpen && <MemberDetailPopup onClose={setDetailPopupOpen} />}
    </>
  );
};

export default MemberList;

const Container = styled.div`
  display: flex;
  padding: 32px 40px;
  flex-direction: column;
  gap: 24px;
`;
