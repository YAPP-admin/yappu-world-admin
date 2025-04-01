import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import MoreVertical from '@assets/MoreVertical';
import Plus from '@assets/Plus';
import IconButton from '@compnents/Button/IconButton';
import OutlinedButton from '@compnents/Button/OutlinedButton';
import Chip from '@compnents/commons/Chip';
import Typography from '@compnents/commons/Typography';
import CompletePopup from '@compnents/popup/CompletePopup';
import StyledTable from '@compnents/table/StyledTable';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableHead from '@compnents/table/TableHead';
import TableRow from '@compnents/table/TableRow';
import { useEditGenerationMutation } from '@queries/operation/useEditGenerationMutation';
import { useGenerationListQuery } from '@queries/operation/useGenerationListQuery';
import { useGenerationStore } from '@stores/generationStore';
import { EditGenerationReq, GenerationListRes } from 'apis/operation/types';
import AddGenerationPopup from 'features/member/generation/AddGenerationPopup';
import StatusChangeMenu from 'features/member/generation/StatusChangeMenu';
import theme from 'styles/theme';

const MemberGeneration: FC = () => {
  const {
    selectedGeneration,
    setSelectedGeneration,
    isAddPopupOpen,
    handleAddPopupOpen,
    isAddCompletePopupOpen,
    handleAddCompletePopupOpen,
  } = useGenerationStore();
  const { data } = useGenerationListQuery();
  const { mutate } = useEditGenerationMutation();

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

  // 추가 팝업 오픈 함수
  const onClickToAdd = () => {
    handleAddPopupOpen(true);
  };

  // 활성화 수정 함수
  const patchGeneration = () => {
    if (!selectedGeneration) return;

    const updated = {
      ...selectedGeneration,
      isActive: !selectedGeneration.isActive,
    };
    setSelectedGeneration(updated);

    const req: EditGenerationReq = {
      generation: updated.generation,
      targetActive: updated.isActive,
    };
    mutate(req);
  };

  return (
    <>
      <Container>
        <Typography variant="title2Bold">기수 관리</Typography>
        <Wrapper>
          <TableHeader>
            <TitleWrapper>
              <Typography variant="headline1Bold">기수 리스트</Typography>
              <Typography
                color="label-alternative"
                variant="body1Normal"
                style={{
                  fontWeight: 600,
                }}
              >
                {data?.data?.totalCount}개
              </Typography>
            </TitleWrapper>
            <OutlinedButton
              leftIcon={<Plus />}
              variant="assistive"
              onClick={onClickToAdd}
            >
              추가
            </OutlinedButton>
          </TableHeader>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell as="th" justifyContent="center">
                  <Typography
                    color="label-normal"
                    variant="body1Normal"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    기수
                  </Typography>
                </TableCell>
                <TableCell as="th" justifyContent="center">
                  <Typography
                    color="label-normal"
                    variant="body1Normal"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    활동기간
                  </Typography>
                </TableCell>
                <TableCell as="th" justifyContent="center">
                  <Typography
                    color="label-normal"
                    variant="body1Normal"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    상태
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.data?.map((generation) => (
                <TableRow key={generation.generation}>
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
                    <StatusWrapper>
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
                        <MoreVertical color={theme.colors.label.assistive} />
                      </IconButton>
                    </StatusWrapper>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
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
        <AddGenerationPopup
          handleAddCompletePopupOpen={handleAddCompletePopupOpen}
          onClose={() => handleAddPopupOpen(false)}
        />
      )}
      {menuPos && (
        <StatusChangeMenu
          ref={menuRef}
          active={selectedGeneration?.isActive ?? false}
          left={menuPos.left}
          top={menuPos.top}
          onToggle={patchGeneration}
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
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
