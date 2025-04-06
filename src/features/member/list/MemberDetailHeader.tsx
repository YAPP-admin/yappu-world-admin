import { FC } from 'react';
import styled from 'styled-components';

import Close from '@assets/Close';
import Pencil from '@assets/Pencil';
import IconButton from '@compnents/Button/IconButton';
import Button from '@compnents/commons/Button';
import Typography from '@compnents/commons/Typography';
import theme from 'styles/theme';

interface Props {
  isEdit: boolean;
  title: string;
  onClose: () => void;
  onClickToEdit: () => void;
  userName?: string;
}

const MemberDetailHeader: FC<Props> = (props) => {
  const { isEdit, title, onClose, onClickToEdit, userName = '' } = props;

  return (
    <Header>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'cente',
        }}
      >
        <Typography variant="headline1Bold">{title}</Typography>
        <IconButton onClick={onClose}>
          <Close color={theme.colors.label.alternative} />
        </IconButton>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Typography
          style={{ color: theme.colors.primary.normal }}
          variant="title1Bold"
        >
          {userName}
        </Typography>
        {!isEdit && (
          <Button
            buttonSize="xsmall"
            leftIcon={<Pencil height="16" width="16" />}
            text="수정"
            variant="outlined"
            variantType="assistive"
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
