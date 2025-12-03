import dayjs from 'dayjs';
import { FC } from 'react';

import Tune from '@assets/Tune';
import IconButton from '@compnents/Button/IconButton';
import TextButton from '@compnents/Button/TextButton';
import Chip from '@compnents/commons/Chip';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import Checkbox from '@compnents/Control/Checkbox';
import Table from '@compnents/table/Table';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableHead from '@compnents/table/TableHead';
import TableRow from '@compnents/table/TableRow';
import { applicationHeader } from '@constants/tableHeader';
import { getChipColor } from '@utils/getChipColor';
import { applicationFilterTypeMap } from '@utils/getTableFilter';
import { ApplicationListRes } from 'apis/auth/types';

export interface Filter {
  generation: string;
  position: string;
  status: string;
}

interface Props {
  isAllChecked: boolean;
  toggleAll: () => void;
  selectedFilters: Filter;
  handleFilterClick: (index: number, key: keyof Filter) => void;
  data?: ApplicationListRes[];
  selected: string[];
  toggleOne: (id: string) => void;
  onClickToDetail: (list: ApplicationListRes) => void;
  filterRefs: React.RefObject<(HTMLButtonElement | null)[]>;
}

const ApplicationTable: FC<Props> = (props) => {
  const {
    isAllChecked,
    toggleAll,
    selectedFilters,
    handleFilterClick,
    data,
    selected,
    toggleOne,
    onClickToDetail,
    filterRefs,
  } = props;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell as="th">
            <Checkbox
              state={isAllChecked ? 'checked' : 'unchecked'}
              onClick={toggleAll}
            />
          </TableCell>
          {applicationHeader.map((col, index) => {
            const filterType = applicationFilterTypeMap[col.title] ?? null;

            const hasValue = filterType
              ? selectedFilters[filterType] !== ''
              : false;

            return (
              <TableCell key={col.title} as="th">
                <FlexBox align="center" gap={4} justify="center">
                  <Typography
                    color="label-normal"
                    style={{ fontWeight: 600 }}
                    variant="body1Normal"
                  >
                    {col.title}
                  </Typography>
                  {col.isFilter && filterType && (
                    <IconButton
                      ref={(el) => {
                        filterRefs.current[index] = el;
                      }}
                      onClick={() => handleFilterClick(index, filterType)}
                    >
                      <Tune
                        color={hasValue ? '#FA6027' : '#171719'}
                        size="16"
                      />
                    </IconButton>
                  )}
                </FlexBox>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((el) => {
          const id = el.id;
          const isChecked = selected.includes(id);
          return (
            <TableRow key={el.id} onClick={() => onClickToDetail(el)}>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  state={isChecked ? 'checked' : 'unchecked'}
                  onClick={() => toggleOne(id)}
                />
              </TableCell>
              <TableCell>
                <Typography color="primary-normal" variant="body1Normal">
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
                    color={getChipColor(el.status).color}
                    size="large"
                    text={el.status}
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
                  {el.processDate
                    ? dayjs(el.processDate).format('YYYY-MM-DD')
                    : '-'}
                </Typography>
              </TableCell>
              <TableCell>
                <TextButton>상세보기</TextButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ApplicationTable;
