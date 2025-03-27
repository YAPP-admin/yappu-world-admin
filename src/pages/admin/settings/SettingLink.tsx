import Trash from '@assets/Trash';
import OutlinedButton from '@compnents/Button/OutlinedButton';
import TextButton from '@compnents/Button/TextButton';
import Typography from '@compnents/commons/Typography';
import Checkbox from '@compnents/Control/Checkbox';
import CompletePopup from '@compnents/popup/CompletePopup';
import StyledTable from '@compnents/table/StyledTable';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableHead from '@compnents/table/TableHead';
import TableRow from '@compnents/table/TableRow';
import { useOperationQuery } from '@queries/operation/useOperationQuery';
import { useSettingLinkStore } from '@stores/SettingLinkStore';
import { OperationListInfo } from 'apis/operation/types';
import EditPopup from 'features/setting/components/EditPopup';
import { FC } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const SettingLink: FC = () => {
  const { data } = useOperationQuery();
  const {
    selectedLinkInfo,
    setSelectedLinkInfo,
    isEditPopupOpen,
    setIsEditPopupOpen,
    isEditCompletePopupOpen,
    setIsEditCompletePopupOpen,
  } = useSettingLinkStore();

  const onClickToEdit = (linkInfo: OperationListInfo) => {
    setSelectedLinkInfo(linkInfo);
    setIsEditPopupOpen(true);
  };

  return (
    <>
      <Container>
        <Typography variant="title2Bold">링크 관리</Typography>
        <Wrapper>
          <TableHeader>
            <TitleWrapper>
              <Typography variant="headline1Bold">관리중인 링크</Typography>
              <Typography
                variant="body1Normal"
                color="label-alternative"
                style={{
                  fontWeight: 600,
                }}
              >
                {data?.links.length}개
              </Typography>
            </TitleWrapper>
            <OutlinedButton
              variant="assistive"
              size="xsmall"
              color="status-negative"
              leftIcon={
                <Trash
                  width="16"
                  height="16"
                  color={theme.colors.status.nagative}
                />
              }
            >
              삭제
            </OutlinedButton>
          </TableHeader>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell as="th" justifyContent="center">
                  <Checkbox />
                </TableCell>
                <TableCell as="th" justifyContent="center">
                  <Typography
                    variant="body1Normal"
                    color="label-normal"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    링크 이름
                  </Typography>
                </TableCell>
                <TableCell as="th">
                  <Typography
                    variant="body1Normal"
                    color="label-normal"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    URL
                  </Typography>
                </TableCell>
                <TableCell as="th" justifyContent="center">
                  <Typography
                    variant="body1Normal"
                    color="label-normal"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    수정
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.links.map((link) => (
                <TableRow key={link.id}>
                  <TableCell justifyContent="center">
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1Normal" color="label-normal">
                      {link.label}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1Normal" color="label-normal">
                      {link.value}
                    </Typography>
                  </TableCell>
                  <TableCell justifyContent="center">
                    <TextButton onClick={() => onClickToEdit(link)}>
                      수정
                    </TextButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </Wrapper>
      </Container>
      {isEditCompletePopupOpen && (
        <CompletePopup
          title="수정 완료"
          comment="수정되었습니다."
          buttonText="확인"
          onClose={() => setIsEditCompletePopupOpen(false)}
        />
      )}
      {isEditPopupOpen && (
        <EditPopup
          linkInfo={selectedLinkInfo}
          onClose={() => setIsEditPopupOpen(false)}
          setIsEditCompletePopupOpen={() => setIsEditCompletePopupOpen(true)}
        />
      )}
    </>
  );
};

export default SettingLink;

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
