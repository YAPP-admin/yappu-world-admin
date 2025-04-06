import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import MoreVertical from '@assets/MoreVertical';
import Plus from '@assets/Plus';
import IconButton from '@compnents/Button/IconButton';
import OutlinedButton from '@compnents/Button/OutlinedButton';
import Chip from '@compnents/commons/Chip';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import CompletePopup from '@compnents/popup/CompletePopup';
import Pagination from '@compnents/table/Pagination';
import StyledTable from '@compnents/table/Table';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableHead from '@compnents/table/TableHead';
import TableRow from '@compnents/table/TableRow';
import { generationHeader } from '@constants/tableHeader';
import { useGenerationListQuery } from '@queries/operation/useGenerationListQuery';
import { useGenerationStore } from '@stores/generationStore';
import { GenerationListRes } from 'apis/operation/types';
import AddGenerationPopup from 'features/member/generation/AddGenerationPopup';
import StatusChangeMenu from 'features/member/generation/StatusChangeMenu';
import theme from 'styles/theme';

const MemberGeneration: FC = () => {
  const {
    setSelectedGeneration,
    isAddPopupOpen,
    handleAddPopupOpen,
    isAddCompletePopupOpen,
    handleAddCompletePopupOpen,
    page,
    setPage,
  } = useGenerationStore();
  const { data } = useGenerationListQuery(page);

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
              <OutlinedButton
                leftIcon={<Plus />}
                variant="assistive"
                onClick={onClickToAdd}
              >
                추가
              </OutlinedButton>
            </FlexBox>
            <StyledTable>
              <TableHead>
                <TableRow>
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
                {data?.data?.map((generation) => (
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
                          <MoreVertical color={theme.colors.label.assistive} />
                        </IconButton>
                      </FlexBox>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </StyledTable>
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
