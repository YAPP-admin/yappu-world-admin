import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import MoreVertical from '@assets/MoreVertical';
import Plus from '@assets/Plus';
import Trash from '@assets/Trash';
import IconButton from '@compnents/Button/IconButton';
import OutlinedButton from '@compnents/Button/OutlinedButton';
import Chip from '@compnents/commons/Chip';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import Checkbox from '@compnents/Control/Checkbox';
import CompletePopup from '@compnents/popup/CompletePopup';
import ConfirmPopup from '@compnents/popup/ConfirmPopup';
import Pagination from '@compnents/table/Pagination';
import Table from '@compnents/table/Table';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableHead from '@compnents/table/TableHead';
import TableRow from '@compnents/table/TableRow';
import { generationHeader } from '@constants/tableHeader';
import { useDeleteGenerationMutation } from '@queries/operation/useDeleteGenerationMutation';
import { useGenerationListQuery } from '@queries/operation/useGenerationListQuery';
import { useGenerationStore } from '@stores/generationStore';
import { ErrorResponse } from 'apis/common/types';
import { GenerationListRes } from 'apis/operation/types';
import AddGenerationPopup from 'features/member/generation/AddGenerationPopup';
import StatusChangeMenu from 'features/member/generation/StatusChangeMenu';
import theme from 'styles/theme';
import { showErrorToast } from 'types/showErrorToast';

const MemberGeneration: FC = () => {
  const {
    setSelectedGeneration,
    isAddPopupOpen,
    handleAddPopupOpen,
    isAddCompletePopupOpen,
    handleAddCompletePopupOpen,
    page,
    setPage,
    selectedIndexes,
    setSelectedIndexes,
    handleDeletePopup,
    setHandleDeletePopup,
    deleteCompletePopup,
    setDeleteCompletePopup,
  } = useGenerationStore();
  const { data } = useGenerationListQuery(page);
  const { mutateAsync } = useDeleteGenerationMutation();
  const queryClient = useQueryClient();

  const generationsId =
    data?.data.map((generation) => generation.generation) || [];

  const isAllChecked =
    generationsId.length > 0 &&
    generationsId.every((id) => selectedIndexes.includes(id));

  const onClickAllCheck = () => {
    if (isAllChecked) {
      setSelectedIndexes([]);
    } else {
      setSelectedIndexes(generationsId);
    }
  };

  const onClickRowCheck = (id: number) => {
    if (selectedIndexes.includes(id)) {
      setSelectedIndexes(selectedIndexes.filter((v) => v !== id));
    } else {
      setSelectedIndexes([...selectedIndexes, id]);
    }
  };

  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(
    null,
  );
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        handleCloseMenu();
      }
    };
    if (menuPos) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuPos]);

  const handleOpenMenu = (
    e: React.MouseEvent<HTMLButtonElement>,
    generation: GenerationListRes | null,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPos({
      top: rect.bottom + window.scrollY + 10,
      left: rect.right + window.scrollX - 140,
    });
    setSelectedGeneration(generation);
  };

  const handleCloseMenu = () => {
    setMenuPos(null);
    setSelectedGeneration(null);
  };

  const onClickToAdd = () => {
    handleAddPopupOpen(true);
  };

  const onClickToDelete = async () => {
    try {
      await mutateAsync({ generations: selectedIndexes });
      queryClient.invalidateQueries({ queryKey: ['generation-list', page] });
      setHandleDeletePopup(false);
      setDeleteCompletePopup(true);
      setSelectedIndexes([]);
    } catch (err) {
      if (isAxiosError<ErrorResponse>(err)) {
        setHandleDeletePopup(false);
        setDeleteCompletePopup(false);
        showErrorToast(
          err.response?.data.message ??
            '알 수 없는 오류가 발생했습니다.\n관리자에게 문의해주세요.',
        );
      }
    }
  };

  return (
    <>
      <Container>
        <Typography variant="title2Bold">기수 관리</Typography>
        <Wrapper>
          <FlexBox direction="column" gap={8}>
            <FlexBox justify="space-between">
              <FlexBox align="center" gap={8}>
                <Typography variant="headline1Bold">기수 리스트</Typography>
                <Typography
                  color="label-alternative"
                  variant="body1Normal"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {data?.totalCount}개
                </Typography>
              </FlexBox>

              <FlexBox align="center" gap={8} width="fit-content">
                <OutlinedButton
                  leftIcon={<Plus />}
                  variant="assistive"
                  onClick={onClickToAdd}
                >
                  추가
                </OutlinedButton>
                <OutlinedButton
                  color="status-negative"
                  disabled={!selectedIndexes.length}
                  variant="assistive"
                  leftIcon={
                    <Trash color={theme.colors.status.nagative} size="16" />
                  }
                  onClick={() => setHandleDeletePopup(true)}
                >
                  삭제
                </OutlinedButton>
              </FlexBox>
            </FlexBox>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell as="th">
                    <Checkbox
                      state={isAllChecked ? 'checked' : 'unchecked'}
                      onClick={onClickAllCheck}
                    />
                  </TableCell>
                  {generationHeader.map((el) => (
                    <TableCell key={el} as="th" justifyContent="center">
                      <Typography
                        color="label-normal"
                        variant="body1Normal"
                        style={{
                          fontWeight: 600,
                        }}
                      >
                        {el}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data?.map((generation) => {
                  const id = generation.generation;
                  const isChecked = selectedIndexes.includes(id);
                  return (
                    <TableRow key={generation.generation}>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          state={isChecked ? 'checked' : 'unchecked'}
                          onClick={() => onClickRowCheck(id)}
                        />
                      </TableCell>
                      <TableCell justifyContent="center">
                        <Typography color="label-normal" variant="body1Normal">
                          {generation.generation}기
                        </Typography>
                      </TableCell>
                      <TableCell justifyContent="center">
                        <Typography color="label-normal" variant="body1Normal">
                          {generation.startDate} - {generation.endDate}
                        </Typography>
                      </TableCell>
                      <TableCell justifyContent="center">
                        <FlexBox align="center" justify="space-between">
                          <div />
                          <Chip
                            color={generation.isActive ? 'primary' : 'neutral'}
                            size="large"
                            text={generation.isActive ? '활동중' : '종료'}
                            variant={generation.isActive ? 'fill' : 'weak'}
                          />
                          <IconButton
                            size="custom"
                            onClick={(e) =>
                              handleOpenMenu(e, generation as GenerationListRes)
                            }
                          >
                            <MoreVertical
                              color={theme.colors.label.assistive}
                            />
                          </IconButton>
                        </FlexBox>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
      {isAddCompletePopupOpen && (
        <CompletePopup
          buttonText="확인"
          comment="신규 기수 추가되었습니다."
          title="추가 완료"
          onClose={() => handleAddCompletePopupOpen(false)}
        />
      )}
      {isAddPopupOpen && (
        <AddGenerationPopup onClose={() => handleAddPopupOpen(false)} />
      )}
      {menuPos && (
        <StatusChangeMenu ref={menuRef} left={menuPos.left} top={menuPos.top} />
      )}
      {handleDeletePopup && (
        <ConfirmPopup
          comment="삭제후 복구가 불가능합니다."
          confirmActionLabel="삭제"
          title="선택하신 기수를 삭제할까요?"
          onCancelAction={() => setHandleDeletePopup(false)}
          onConfirmAction={onClickToDelete}
        />
      )}
      {deleteCompletePopup && (
        <CompletePopup
          comment="정상적으로 삭제되었습니다. "
          title="삭제 완료"
          onClose={() => setDeleteCompletePopup(false)}
        />
      )}
    </>
  );
};

export default MemberGeneration;

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
