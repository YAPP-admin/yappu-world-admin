import { FC } from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';

import { DaumPostcodeData } from '@hooks/useDaumPostcode';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: DaumPostcodeData) => void;
}

const PostcodePopup: FC<Props> = ({ isOpen, onClose, onComplete }) => {
  if (!isOpen) return null;

  return (
    <Modal onClick={onClose}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <DaumPostcode onComplete={onComplete} />
      </Wrapper>
    </Modal>
  );
};

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Wrapper = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 500px;
  max-width: 90vw;
`;

export default PostcodePopup;
