import { SearchIcon } from "./icons/search-icon";
import { MarvelLogo } from "./icons/marvel-logo";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--silver);
  padding: 15px 160px;

  /* box-shadow: 0px 20px 40px -8px rgba(0, 0, 0, 0.3); */

  form {
    display: flex;
    align-items: center;
    justify-content: space-between;

    position: relative;

    input {
      background-color: #f7f5fa;
      border-radius: 5px;
      border: 1px solid #eee9f5;

      width: 300px;
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
`;

export function Header() {
  return (
    <HeaderContainer>
      <Link to="/">
        <MarvelLogo />
      </Link>
      <form>
        <label>
          <input type="text" placeholder="Pesquisa" />
        </label>
        <button>
          <SearchIcon />
        </button>
      </form>
    </HeaderContainer>
  );
}
