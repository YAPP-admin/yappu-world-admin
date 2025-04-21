import { FC } from 'react';
import styled from 'styled-components';

import Typography from '@compnents/commons/Typography';
import CompletePopup from '@compnents/popup/CompletePopup';
import { useSupportVersionQuery } from '@queries/operation/useSupportVersionQuery';
import { useSupportVersionStore } from '@stores/supportVersionStore';
import { Version } from 'apis/operation/types';
import EditVersionPopup from 'features/setting/components/EditVersionPopup';
import UpdateVersion from 'features/setting/components/UpdateVersion';
import theme from 'styles/theme';

const SettingUpdate: FC = () => {
  const { data } = useSupportVersionQuery();
  const {
    isEditCompletePopupOpen,
    setIsEditCompletePopupOpen,
    isEditPopupOpen,
    setIsEditPopupOpen,
    selectedVersionInfo,
    setSelectedVersionInfo,
  } = useSupportVersionStore();

  const onClickToEdit = (value: Version) => {
    setSelectedVersionInfo(value);
    setIsEditPopupOpen(true);
  };

  return (
    <>
      <Container>
        <Typography variant="title2Bold">강제 업데이트</Typography>
        <Divider />
        <Wrapper>
          {data?.platforms.map((el) => (
            <UpdateVersion
              key={el.platform}
              versionInfo={el}
              onClick={onClickToEdit}
            />
          ))}
        </Wrapper>
      </Container>
      {isEditPopupOpen && (
        <EditVersionPopup onClose={() => setIsEditPopupOpen(false)} />
      )}
      {isEditCompletePopupOpen && (
        <CompletePopup
          buttonText="확인"
          comment={`${selectedVersionInfo?.version} 버전으로 강제업데이트 정상 진행되었습니다`}
          title="업데이트 완료"
          onClose={() => setIsEditCompletePopupOpen(false)}
        />
      )}
    </>
  );
};

export default SettingUpdate;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px 40px;

  span {
    white-space: nowrap;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${theme.colors.lineNormal.normal};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;
