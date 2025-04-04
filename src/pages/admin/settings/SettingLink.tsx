import { FC } from 'react';
import styled from 'styled-components';

import TextButton from '@compnents/Button/TextButton';
import Typography from '@compnents/commons/Typography';
import CompletePopup from '@compnents/popup/CompletePopup';
import StyledTable from '@compnents/table/StyledTable';
import TableBody from '@compnents/table/TableBody';
import TableCell from '@compnents/table/TableCell';
import TableHead from '@compnents/table/TableHead';
import TableRow from '@compnents/table/TableRow';
import { linkHeader } from '@constants/tableHeader';
import { useOperationQuery } from '@queries/operation/useOperationQuery';
import { useSettingLinkStore } from '@stores/SettingLinkStore';
import { OperationListInfo } from 'apis/operation/types';
import EditPopup from 'features/setting/components/EditPopup';

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
                color="label-alternative"
                variant="body1Normal"
                style={{
                  fontWeight: 600,
                }}
              >
                {data?.links.length}개
              </Typography>
            </TitleWrapper>
          </TableHeader>
          <StyledTable>
            <TableHead>
              <TableRow>
                {linkHeader.map((el) => (
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
              {data?.links.map((link) => (
                <TableRow key={link.id}>
                  <TableCell>
                    <Typography color="label-normal" variant="body1Normal">
                      {link.label}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="label-normal" variant="body1Normal">
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
          buttonText="확인"
          comment="수정되었습니다."
          title="수정 완료"
          onClose={() => setIsEditCompletePopupOpen(false)}
        />
      )}
      {isEditPopupOpen && (
        <EditPopup
          linkInfo={selectedLinkInfo}
          onClose={() => setIsEditPopupOpen(false)}
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
