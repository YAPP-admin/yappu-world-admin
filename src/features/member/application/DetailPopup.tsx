import { FC, useState } from 'react';
import styled from 'styled-components';

import CircleCheck from '@assets/CircleCheck';
import CircleClose from '@assets/CircleClose';
import Close from '@assets/Close';
import IconButton from '@compnents/Button/IconButton';
import OutlinedButton from '@compnents/Button/OutlinedButton';
import Typography from '@compnents/commons/Typography';
import PopupContainer from '@compnents/popup/PopupContainer';
import { useApplicationDetailQuery } from '@queries/auth/useApplicationDetailQuery';
import { ApplicationListRes } from 'apis/auth/types';
import theme from 'styles/theme';

import ApprovePopup from './ApprovePopup';
import InfoGrid from './InfoGrid';
import RefusePopup from './RejectPopup';

interface Props {
  selectedList: ApplicationListRes | null;
  onClose: () => void;
}

const DetailPopup: FC<Props> = ({ selectedList, onClose }) => {
  const { data } = useApplicationDetailQuery(selectedList?.applicationId ?? '');
  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);

  return (
    <>
      <PopupContainer>
        <Container>
          <Header>
            <Typography color="label-normal" variant="headline1Bold">
              가입 신청서 상세
            </Typography>
            <IconButton onClick={onClose}>
              <Close color={theme.colors.label.assistive} />
            </IconButton>
          </Header>

          <Content>
            <Section>
              <Typography color="label-normal" variant="headline2Bold">
                유저 입력 정보
              </Typography>
              <SectionContent>
                <InfoGrid label="이름" value={data?.data.details.name ?? ''} />
                <InfoGrid
                  label="이메일"
                  value={data?.data.details.email ?? ''}
                />
                <InfoGrid
                  label="가입요청일"
                  value={data?.data.details.applicationDate ?? ''}
                />
              </SectionContent>
            </Section>

            <Section borderLeft>
              <Typography color="label-normal" variant="headline2Bold">
                활동 정보
              </Typography>
              <SectionContent>
                <InfoGrid label="기수" value="직군" />
                {data?.data.details.activityUnits.map((unit) => (
                  <InfoGrid
                    key={`${unit.generation}-${unit.position}`}
                    label={`${unit.generation}기`}
                    value={unit.position.label}
                  />
                ))}
              </SectionContent>
            </Section>
          </Content>

          <ButtonContainer>
            <OutlinedButton
              color="status-positive"
              size="medium"
              variant="assistive"
              leftIcon={
                <CircleCheck color={theme.colors.status.positive} size="18" />
              }
              onClick={() => setApprove(true)}
            >
              승인
            </OutlinedButton>
            <OutlinedButton
              color="status-negative"
              size="medium"
              variant="assistive"
              leftIcon={
                <CircleClose color={theme.colors.status.nagative} size="18" />
              }
              onClick={() => setReject(true)}
            >
              거절
            </OutlinedButton>
          </ButtonContainer>
        </Container>
      </PopupContainer>
      {approve && (
        <ApprovePopup
          selectedList={selectedList}
          onClose={() => setApprove(false)}
        />
      )}
      {reject && (
        <RefusePopup
          selectedList={selectedList}
          onClose={() => setReject(false)}
        />
      )}
    </>
  );
};

export default DetailPopup;

const Container = styled.div`
  display: flex;
  width: 744px;
  flex-direction: column;
  border-radius: 16px;
  box-shadow:
    0px 6px 12px 0px rgba(0, 0, 0, 0.12),
    0px 4px 8px 0px rgba(0, 0, 0, 0.08),
    0px 0px 4px 0px rgba(0, 0, 0, 0.08);
  background: ${theme.colors.backgroundElevated.normal};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid ${theme.colors.lineNormal.normal};
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const Section = styled.div<{ borderLeft?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 40px;
  flex: 1;
  align-self: stretch;
  ${({ borderLeft }) =>
    borderLeft &&
    `border-left: 1px solid ${theme.colors.lineSolid.alternative};`}
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ButtonContainer = styled.div`
  display: flex;
  padding: 24px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;
  border-top: 1px solid ${theme.colors.lineNormal.normal};
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
`;
