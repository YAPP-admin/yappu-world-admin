import { FC } from 'react';

import Typography from '@compnents/commons/Typography';
import Table from '@compnents/table/Table';
import TableCell from '@compnents/table/TableCell';
import TableHead from '@compnents/table/TableHead';
import TableRow from '@compnents/table/TableRow';
import { AttendanceSession, AttendanceUser } from 'apis/attendance/types';

interface Props {
  sessions: AttendanceSession[] | undefined;
  users: AttendanceUser[] | undefined;
}

const SummaryTable: FC<Props> = ({ sessions, users }) => {
  const commonStyle = { borderTop: '1px solid #e1e2e4' };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell as="th" className="sticky-col-1" widthType="fixed">
            <Typography variant="body1Normal">총 인원</Typography>
          </TableCell>
          <TableCell
            className="sticky-col-2"
            style={commonStyle}
            widthType="fixed"
          >
            <Typography variant="body1Normal">출석</Typography>
          </TableCell>
          {sessions?.map((s) => (
            <TableCell key={s.sessionId} style={commonStyle} widthType="max">
              <Typography variant="body1Normal">
                {s.totalOnTimeCount}
              </Typography>
            </TableCell>
          ))}
          {[...Array(6)].map((_, i) => (
            <TableCell
              key={`empty-ontime-${i}`}
              style={commonStyle}
              widthType="max"
            />
          ))}
        </TableRow>
        <TableRow>
          <TableCell as="th" className="sticky-col-1">
            <Typography variant="body1Normal">{users?.length}</Typography>
          </TableCell>
          <TableCell className="sticky-col-2">
            <Typography variant="body1Normal">지각</Typography>
          </TableCell>
          {sessions?.map((s) => (
            <TableCell key={s.sessionId} widthType="max">
              <Typography variant="body1Normal">{s.totalLateCount}</Typography>
            </TableCell>
          ))}
          {[...Array(6)].map((_, i) => (
            <TableCell key={`empty-ontime-${i}`} widthType="max" />
          ))}
        </TableRow>
        <TableRow>
          <TableCell as="th" className="sticky-col-1" />
          <TableCell className="sticky-col-2">
            <Typography variant="body1Normal">결석</Typography>
          </TableCell>
          {sessions?.map((s) => (
            <TableCell key={s.sessionId} widthType="max">
              <Typography variant="body1Normal">
                {s.totalAbsentCount}
              </Typography>
            </TableCell>
          ))}
          {[...Array(6)].map((_, i) => (
            <TableCell key={`empty-ontime-${i}`} widthType="max" />
          ))}
        </TableRow>
      </TableHead>
    </Table>
  );
};

export default SummaryTable;
