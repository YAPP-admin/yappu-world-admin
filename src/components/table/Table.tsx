import { FC, useState } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import Pagination from './Pagination';
import Typography from '@compnents/commons/Typography';

export interface Tablerow {
  field: string;
  fieldName: string;
}

export interface TableColumn<T> {
  field: string;
  fieldName: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  renderCell?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  tableTitle: string;
  counts: number;
  columns: TableColumn<T>[];
  data: T[];
  onClickRow: (row: T) => void;
  isCheck?: boolean; // 체크박스 유무
  onChecked?: (indexes: number[]) => void; // 체크박스 중복 선택
  isEmpty?: boolean; // 데이터 없을 때
}

const Table = <T,>({
  tableTitle,
  counts,
  data,
  columns,
  onClickRow,
  isCheck,
  onChecked,
  isEmpty,
}: TableProps<T>) => {
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);
  const handleCheck = (index: number) => {
    let newChecked = checkedIndexes.includes(index)
      ? checkedIndexes.filter((i) => i !== index)
      : [...checkedIndexes, index];
    setCheckedIndexes(newChecked);
    onChecked?.(newChecked);
  };
  const [curIndex, setCurIndex] = useState(1);

  return (
    <Container>
      <TableWrapper>
        <TableHeader>
          <Typography children={tableTitle} variant="headline1Bold" />
          <Typography
            children={`${counts}명`}
            variant="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
        </TableHeader>
        <TableContainer>
          <TableHead>
            <tr>
              {isCheck && (
                <th>
                  <input type="checkbox" />
                </th>
              )}
              {columns.map((col, index) => (
                <th
                  key={index}
                  style={{
                    minWidth: col.minWidth,
                    textAlign: col.align || 'center',
                  }}
                >
                  <Typography
                    children={col.fieldName}
                    variant="body1Normal"
                    style={{ fontWeight: 600 }}
                  />
                </th>
              ))}
            </tr>
          </TableHead>
          <TableBody>
            {isEmpty ? (
              <tr>
                <td colSpan={columns.length + (isCheck ? 1 : 0)}>
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={index} onClick={() => onClickRow(row)}>
                  {isCheck && (
                    <td>
                      <input
                        type="checkbox"
                        checked={checkedIndexes.includes(index)}
                        onChange={() => handleCheck(index)}
                      />
                    </td>
                  )}
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      style={{ textAlign: col.align || 'center' }}
                    >
                      <Typography
                        children={
                          col.renderCell
                            ? col.renderCell(row)
                            : (row as any)[col.field]
                        }
                        variant="label1Normal"
                      />
                    </td>
                  ))}
                </tr>
              ))
            )}
          </TableBody>
        </TableContainer>
      </TableWrapper>
      <Pagination
        totalPages={10}
        currentPage={curIndex}
        onPageChange={(index: number) => setCurIndex(index)}
      />
    </Container>
  );
};

export default Table;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  color: ${theme.colors.label.normal};

  .total-counts {
    color: ${theme.colors.label.alternative};
  }
`;

const TableContainer = styled.table`
  border-spacing: 0;
`;

const TableHead = styled.thead`
  th {
    border-top: 1px solid #aeb0b6;
    background: rgba(112, 115, 124, 0.08);
    color: #171719;
    text-align: center;
    padding: 6px 8px;
  }

  th:not(:last-child) {
    border-right: 1px solid #e1e2e4;
  }
`;

const TableBody = styled.tbody`
  td {
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-align: center;
    border-bottom: 1px solid #e1e2e4;
  }

  td:not(:last-child) {
    border-right: 1px solid #e1e2e4;
  }
`;
