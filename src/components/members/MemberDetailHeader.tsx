import Close from '@assets/Close';
import Pencil from '@assets/Pencil';
import Button from '@compnents/commons/Botton';
import Icon from '@compnents/commons/Icon';
import Typography from '@compnents/commons/Typography';
import { FC } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

interface Props {
  isEdit: boolean;
  title: string;
  onClose: () => void;
  onClickToEdit: () => void;
  userName: string;
}

const MemberDetailHeader: FC<Props> = (props) => {
  const { isEdit, title, onClose, onClickToEdit, userName } = props;

  return (
    <Header>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'cente',
        }}
      >
        <Typography text={title} variatnt="headline1Bold" />
        <Icon
          onClick={onClose}
          icon={
            <Close
              width="16"
              height="16"
              color={theme.colors.label.alternative}
            />
          }
        />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Typography
          text={userName}
          variatnt="title1Bold"
          style={{ color: theme.colors.primary.normal }}
        />
        {!isEdit && (
          <Button
            text="수정"
            buttonSize="xsmall"
            variant="outlined"
            variantType="assistive"
            leftIcon={<Pencil width="16" height="16" />}
            onClick={onClickToEdit}
          />
        )}
      </div>
    </Header>
  );
};

export default MemberDetailHeader;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  border-bottom: 1px solid ${theme.colors.lineNormal.normal};
`;
