import { styled } from "styled-components";
import { CardCharacter } from "../components/CardCharacter";
import { useCharacterContext } from "../contexts/CharactersContext";
import { Link } from "react-router-dom";
import { Pagination } from "../components/Pagination";
import { useCharacters } from "../hooks/useCharacters";
import { Loading } from "../components/Loading";
import { useEffect, useState } from "react";
import { useFilterContext } from "../contexts/FilterContext";

const HomeContainer = styled.section`
  padding: 30px 160px;
  line-height: 32px;

  > div {
    margin-top: 28px;
  }

  > span {
    font-size: 14px;
    font-weight: 400;
    color: var(--grey);
  }
`;

const HomeTitle = styled.h2`
  width: 34%;
  font-size: 32px;
  font-weight: 900;
  color: var(--dark);
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  color: var(--red);
  font-weight: bold;
  line-height: normal;

  margin-bottom: 16px;
`;

const CharactersList = styled.ul`
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;

  list-style: none;

  p {
    font-weight: 700;
    width: 100%;
  }

  a {
    width: calc(100% / 5);
    padding: 12px;
    position: relative;
    top: 0;
    transition: all 0.17s cubic-bezier(0.02, 0.01, 0.47, 1);
  }

  a:hover {
    cursor: pointer;
    top: -8px;
  }
`;

export function Home() {
  const headerForm = document.querySelector("header form");
  headerForm?.classList?.add("open");

  const { totalPages, setCurrentPage, setOffset, setPageNumber } =
    useCharacterContext();

  const { filter, setFilter, resetFilter } = useFilterContext();

  const { data, loading, error } = useCharacters();
  const [characters, setCharacters] = useState();
  const [filteredCharacters, setFilteredCharacters] = useState();

  useEffect(() => {
    resetFilter();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFilteredCharacters(
      characters?.filter((character) =>
        character.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, characters]);

  useEffect(() => {
    setCharacters(data);
  }, [data]);

  useEffect(() => {
    const list = document.querySelector("ul");
    if (!loading) {
      document.querySelector(".home-section")?.classList.add("show-section");
      list?.classList.add("show-section");
    } else {
      list?.classList.remove("show-section");
    }
  }, [loading]);

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    setPageNumber(pageNumber);
    setOffset((pageNumber - 1) * 30);
    setFilter("");
  };

  return (
    <HomeContainer className="home-section">
      <span>Bem vindo ao Marvel Heroes</span>
      <HomeTitle>Vamos conhecer seus personagens favoritos</HomeTitle>
      <Pagination
        totalPages={totalPages}
        onPageChange={(pageNumber) => handlePageChange(pageNumber)}
      />
      <div>
        <SectionTitle>Heróis</SectionTitle>

        {loading && <Loading></Loading>}
        <CharactersList className="characters-list">
          {error && <p className="error">{error}</p>}
          {filteredCharacters &&
            filteredCharacters.map((character) => (
              <Link
                key={character.id}
                to={`/character/${character.id}`}
                className="card-item"
              >
                <CardCharacter character={character}></CardCharacter>
              </Link>
            ))}
          {filteredCharacters && filteredCharacters.length < 1 && (
            <p>Nenhum personagem encontrado.</p>
          )}
        </CharactersList>
      </div>
    </HomeContainer>
  );
}
