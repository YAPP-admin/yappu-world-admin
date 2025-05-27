import dayjs from 'dayjs';
import { FC } from 'react';

import Typography from '@compnents/commons/Typography';
import TableCell from '@compnents/table/TableCell';
import TableHead from '@compnents/table/TableHead';
import TableRow from '@compnents/table/TableRow';
import { AttendanceSession } from 'apis/attendance/types';

interface Props {
  sessions: AttendanceSession[] | undefined;
}

const AttendanceHeader: FC<Props> = ({ sessions }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell as="th" className="sticky-col-1" widthType="fixed" />
        <TableCell as="th" className="sticky-col-2" widthType="fixed" />
        {sessions?.map((el) => (
          <TableCell key={el.sessionId} as="th" widthType="max">
            <Typography variant="body1Normal">
              {dayjs(el.startDate).format('YYYY.MM.DD')}
            </Typography>
          </TableCell>
        ))}
        <TableCell as="th" widthType="max" />
        <TableCell as="th" widthType="max" />
        <TableCell as="th" widthType="max" />
        <TableCell as="th" widthType="max" />
        <TableCell as="th" widthType="max" />
        <TableCell as="th" widthType="max" />
      </TableRow>
      <TableRow>
        <TableCell as="th" className="sticky-col-1" widthType="fixed">
          <Typography variant="body1Normal">이름</Typography>
        </TableCell>
        <TableCell as="th" className="sticky-col-2" widthType="fixed">
          <Typography variant="body1Normal">총점</Typography>
        </TableCell>
        {sessions?.map((el) => (
          <TableCell key={el.sessionId} as="th" widthType="max">
            <Typography ellipsis variant="body1Normal">
              {el.name}
            </Typography>
          </TableCell>
        ))}
        <TableCell as="th" widthType="max">
          <Typography variant="body1Normal">지각</Typography>
        </TableCell>
        <TableCell as="th" widthType="max">
          <Typography variant="body1Normal">조퇴</Typography>
        </TableCell>
        <TableCell as="th" widthType="max">
          <Typography variant="body1Normal">지각면제권</Typography>
        </TableCell>
        <TableCell as="th" widthType="max">
          <Typography variant="body1Normal">결석</Typography>
        </TableCell>
        <TableCell as="th" widthType="max">
          <Typography variant="body1Normal">감점</Typography>
        </TableCell>
        <TableCell as="th" widthType="max">
          <Typography variant="body1Normal">가점</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default AttendanceHeader;
