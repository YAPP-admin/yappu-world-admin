import Table, { TableColumn } from '@compnents/table/Table';
import { FC, useState } from 'react';
import styled from 'styled-components';
import Typography from '@compnents/commons/Typography';
import theme from 'styles/theme';
import Chip from '@compnents/commons/Chip';
import MemberDetailPopup from '@compnents/popup/MemberDetailPopup';
import useUserListQuery from '@queries/user/useUserListQuery';

const columns: TableColumn[] = [
  { field: 'index', fieldName: '번호' },
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
  const [detailPopup, setDetailPopup] = useState(false);
  const { data: userList } = useUserListQuery({ page: 1, size: 10 });

  return (
    <>
      <Container>
        <Typography
          children="전체 회원 리스트"
          variant="title2Bold"
          style={{ fontWeight: 700 }}
        />

        <Table
          tableTitle="회원리스트"
          counts={userList?.data.totalCount ?? 0}
          data={userList?.data.data ?? []}
          columns={columns}
          onClickRow={() => setDetailPopup(true)}
        />
      </Container>
      {detailPopup && (
        <MemberDetailPopup onClose={() => setDetailPopup(false)} />
      )}
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
