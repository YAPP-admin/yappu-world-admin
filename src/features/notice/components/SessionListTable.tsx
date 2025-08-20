import dayjs from 'dayjs';
import { FC } from 'react';

import Radio from '@compnents/commons/Radio';
import Typography from '@compnents/commons/Typography';
import Table from '@compnents/table/Table';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableHead from '@compnents/table/TableHead';
import TableRow from '@compnents/table/TableRow';
import { useNoticeStore } from '@stores/noticeStore';
import { SessionRes } from 'apis/session/types';

interface Props {
  sessionList?: SessionRes[];
  selectedSessionId: string | null;
  onSelectSessionId: (id: string) => void;
}

const SessionListTable: FC<Props> = ({
  sessionList,
  selectedSessionId,
  onSelectSessionId,
}) => {
  const setSelectedSession = useNoticeStore(
    (state) => state.setSelectedSession,
  );
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell colSpan={2}>
            <Typography fontWeight="600" variant="body1Normal">
              세션이름
            </Typography>
          </TableCell>
          <TableCell>
            <Typography fontWeight="600" variant="body1Normal">
              시작일
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sessionList?.map((el) => (
          <TableRow key={el.id}>
            <TableCell>
              <Radio
                checked={selectedSessionId === el.id}
                name="session"
                onChange={() => {
                  onSelectSessionId(el.id);
                  setSelectedSession(el);
                }}
              />
            </TableCell>
            <TableCell>{el.title}</TableCell>
            <TableCell>
              {dayjs(el.date).format('YYYY.MM.DD')} {el.time}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SessionListTable;
