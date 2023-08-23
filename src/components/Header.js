import { SearchIcon } from "./icons/search-icon";
import { MarvelLogo } from "./icons/marvel-logo";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useFilterContext } from "../contexts/FilterContext";

const Container = styled.div`
  .open {
    display: flex;
  }
`;

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: var(--silver);
  padding: 15px;

  .open form {
    display: flex;
  }

  form {
    display: none;
    align-items: center;
    margin-top: 10px;
    position: relative;

    input {
      background-color: #f7f5fa;
      border-radius: 5px;
      border: 1px solid #eee9f5;

      width: 200px;
      padding: 10px;

      color: var(--dark);
      font-size: 16px;

      outline: none;
    }
  }

  button {
    background-color: transparent;
    border: none;
    position: absolute;
    right: 10px;
  }

  @media (min-width: 425px) {
    flex-direction: row;

    form {
      margin-top: 0;
    }
  }

  @media (min-width: 1024px) {
    padding: 30px 160px;

    form {
      input {
        width: 300px;
      }
    }
  }
`;

export function Header() {
  const { filter, handleFilterChange } = useFilterContext();

  const handleInputChange = (e) => {
    handleFilterChange(e.target.value);
  };

  return (
    <Container>
      <HeaderContainer className="header-primary">
        <Link to="/">
          <MarvelLogo />
        </Link>
        <form>
          <label>
            <input
              type="text"
              placeholder="Pesquisa"
              value={filter}
              onChange={handleInputChange}
            />
          </label>
          <button>
            <SearchIcon />
          </button>
        </form>
      </HeaderContainer>
    </Container>
  );
}
