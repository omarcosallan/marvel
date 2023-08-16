import { styled } from "styled-components";
import { useCharacterContext } from "../contexts/CharactersContext";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const PageNumber = styled.span`
  cursor: pointer;
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  color: ${(props) => (props.isActive ? "var(--red)" : "black")};
`;

const ControlButton = styled.button`
  cursor: pointer;
  font-weight: bold;
  color: black;
  background-color: transparent;
  border: none;
  margin: 0 4px;
`;

export function Pagination({ totalPages, onPageChange }) {
  const { currentPage, setCurrentPage } = useCharacterContext();

  const pagesToShow = 10;
  const startIndex = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const visiblePages = Array.from(
    { length: Math.min(pagesToShow, totalPages - startIndex + 1) },
    (_, index) => startIndex + index
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const goToFirstPage = () => handlePageChange(1);
  const goToLastPage = () => handlePageChange(totalPages);

  return (
    <Container>
      <ControlButton onClick={goToFirstPage} disabled={currentPage === 1}>
        <span>«</span>
      </ControlButton>
      {visiblePages.map((page) => (
        <PageNumber
          key={page}
          isActive={currentPage === page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </PageNumber>
      ))}
      <ControlButton
        onClick={goToLastPage}
        disabled={currentPage === totalPages}
      >
        <span>»</span>
      </ControlButton>
    </Container>
  );
}
