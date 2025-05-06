import dayjs from 'dayjs';
import { FC } from 'react';

import Chip from '@compnents/commons/Chip';
import Typography from '@compnents/commons/Typography';
import Table from '@compnents/table/Table';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableHead from '@compnents/table/TableHead';
import TableRow from '@compnents/table/TableRow';
import { getChipColor } from '@utils/getChipColor';
import {
  AttendanceSession,
  AttendanceStatusType,
  AttendanceUser,
} from 'apis/attendance/types';

interface Props {
  sessions: AttendanceSession[] | undefined;
  users: AttendanceUser[] | undefined;
  sessionMap:
    | Record<string, Record<string, AttendanceStatusType | null>>
    | undefined;
}

const AttandanceTable: FC<Props> = ({ sessions, users, sessionMap }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell as="th" className="sticky-col-1" />
          <TableCell as="th" className="sticky-col-2" />
          {sessions?.map((el) => (
            <TableCell key={el.sessionId} as="th">
              <Typography variant="body1Normal">
                {dayjs(el.startDate).format('YYYY.MM.DD')}
              </Typography>
            </TableCell>
          ))}
          <TableCell as="th" />
          <TableCell as="th" />
          <TableCell as="th" />
          <TableCell as="th" />
          <TableCell as="th" />
          <TableCell as="th" />
        </TableRow>
        <TableRow>
          <TableCell as="th" className="sticky-col-1">
            <Typography variant="body1Normal">이름</Typography>
          </TableCell>
          <TableCell as="th" className="sticky-col-2">
            <Typography variant="body1Normal">총점</Typography>
          </TableCell>
          {sessions?.map((el) => (
            <TableCell key={el.sessionId} as="th">
              <Typography variant="body1Normal">{el.name}</Typography>
            </TableCell>
          ))}
          <TableCell as="th">
            <Typography variant="body1Normal">지각</Typography>
          </TableCell>
          <TableCell as="th">
            <Typography variant="body1Normal">조퇴</Typography>
          </TableCell>
          <TableCell as="th">
            <Typography variant="body1Normal">지각면제권</Typography>
          </TableCell>
          <TableCell as="th">
            <Typography variant="body1Normal">결석</Typography>
          </TableCell>
          <TableCell as="th">
            <Typography variant="body1Normal">감점</Typography>
          </TableCell>
          <TableCell as="th">
            <Typography variant="body1Normal">가점</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.userId}>
            <TableCell className="sticky-col-1 ">
              <Typography variant="body1Normal">{user.name}</Typography>
            </TableCell>
            <TableCell className="sticky-col-2 ">
              <Typography variant="body1Normal">{user.totalPoint}</Typography>
            </TableCell>
            {sessions?.map((session) => {
              if (!sessionMap) return <td key={session.sessionId}>-</td>;
              const status = sessionMap[session.sessionId]?.[user.userId] ?? '';
              return (
                <TableCell key={session.sessionId}>
                  <Chip
                    color={getChipColor(status).color}
                    size="large"
                    text={status}
                    variant={getChipColor(status).variant}
                  />
                </TableCell>
              );
            })}
            <TableCell>
              <Typography variant="body1Normal">{user.lateCount}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1Normal">
                {user.earlyCheckOutCount}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1Normal">
                {user.latePassCount}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1Normal">{user.absentCount}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1Normal">{user.penaltyPoint}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1Normal">{user.bonusPoint}</Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttandanceTable;
