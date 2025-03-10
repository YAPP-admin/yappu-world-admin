import Table, { TableColumn } from '@compnents/table/Table';
import { FC } from 'react';
import styled from 'styled-components';
import Typography from '@compnents/commons/Typography';
import theme from 'styles/theme';
import Chip from '@compnents/commons/Chip';

const columns: TableColumn[] = [
  { field: 'index', fieldName: '번호' },
  {
    field: 'name',
    fieldName: '이름',
    renderCell: (row) => (
      <Typography
        text={row.name}
        variatnt={'label1Normal'}
        style={{ color: theme.colors.primary.normal, fontWeight: 600 }}
      />
    ),
  },
  { field: 'generate', fieldName: '최근활동기수' },
  { field: 'role', fieldName: '직군' },
  {
    field: 'authority',
    fieldName: '권한',
    renderCell: (row) => <Chip text={row.authority} chipStyle="weak" />,
  },
  { field: 'date', fieldName: '가입일' },
  { field: 'isExit', fieldName: '탈퇴여부' },
];

const data = [
  {
    index: 1,
    name: '김현정',
    generate: '25기',
    role: 'Server',
    authority: '운영진',
    date: '2025.02.10',
    isExit: 'X',
  },
  {
    index: 2,
    name: '김백설',
    generate: '25기',
    role: 'Design',
    authority: '운영진',
    date: '2025.02.10',
    isExit: 'X',
  },
  {
    index: 3,
    name: '김건호',
    generate: '25기',
    role: 'Web',
    authority: '어드민',
    date: '2025.02.10',
    isExit: 'X',
  },
];

const MemberList: FC = () => {
  return (
    <Container>
      <Typography
        text="전체 회원 리스트"
        variatnt="title2Bold"
        style={{ fontWeight: 700 }}
      />

      <Table
        tableTitle="회원리스트"
        counts={100}
        data={data}
        columns={columns}
      />
    </Container>
  );
};

export default MemberList;

const Container = styled.div`
  display: flex;
  padding: 32px 40px;
  flex-direction: column;
  gap: 24px;
`;
