import { FC } from 'react';
import styled from 'styled-components';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = (props) => {
  const { totalPages, currentPage, onPageChange } = props;
  const groupSize = 10;
  const currentGroup = Math.floor((currentPage - 1) / groupSize); // 0-based
  const startPage = currentGroup * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <PaginationContainer>
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        처음
      </PaginationButton>
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        &lt;
      </PaginationButton>

      {pages.map((page) => (
        <PaginationButton
          key={page}
          $active={currentPage === page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </PaginationButton>
      ))}

      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        &gt;
      </PaginationButton>
      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
      >
        마지막
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const PaginationButton = styled.button<{ $active?: boolean }>`
  border: none;
  background-color: ${({ $active }) => ($active ? '#FF6F30' : 'transparent')};
  color: ${({ $active }) => ($active ? 'white' : '#171719')};
  cursor: pointer;
  border-radius: 19px;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.203px;
  padding: 4px 8px;

  &:disabled {
    opacity: 0.5;
  }
`;
