import { styled } from "styled-components";
import { useCharacterContext } from "../contexts/CharactersContext";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px;
`;

const PageNumber = styled.span`
  cursor: pointer;
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  color: ${(props) => (props.isActive ? "red" : "black")};
`;

export function Pagination({ totalPages, onPageChange }) {
  const { currentPage, setCurrentPage } = useCharacterContext();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const paginate = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Container>
      {paginate.map((page) => (
        <PageNumber
          key={page}
          isActive={currentPage === page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </PageNumber>
      ))}
    </Container>
  );
}
