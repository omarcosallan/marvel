import { styled } from "styled-components";
import { CardCharacter } from "../components/CardCharacter";
import { useCharacterContext } from "../contexts/CharactersContext";
import { Link } from "react-router-dom";
import { Pagination } from "../components/Pagination";
import { useCharacters } from "../hooks/useCharacters";
import { Loading } from "../components/Loading";
import { useEffect, useState } from "react";
import { useFilterContext } from "../contexts/FilterContext";

const ContainerTitle = styled.div`
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

const HomeContainer = styled.section`
  line-height: 32px;

  > span {
    font-size: 14px;
    font-weight: 400;
    color: var(--grey);
  }
`;

const HomeTitle = styled.h2`
  width: 100%;
  font-size: 32px;
  font-weight: 900;
  color: var(--dark);

  @media (min-width: 425px) {
    width: 45%;
  }

  @media (min-width: 768px) {
    width: 50%;
  }

  @media (min-width: 1024px) {
    width: 34%;
  }
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

  li {
    width: calc(100% / 2);
    padding: 5px;
    position: relative;
    top: 0;
    transition: all 0.17s cubic-bezier(0.02, 0.01, 0.47, 1);
  }

  li:hover {
    cursor: pointer;
    top: -8px;
  }

  @media (min-width: 768px) {
    li {
      width: calc(100% / 4);
      padding: 12px;
    }
  }

  @media (min-width: 1024px) {
    li {
      width: calc(100% / 5);
    }
  }
`;

export function Home() {
  const headerForm = document.querySelector("header form");
  headerForm?.classList?.add("open");

  const { totalPages, setCurrentPage, setOffset, setPageNumber } =
    useCharacterContext();
  const { filter, setFilter, resetFilter } = useFilterContext();
  const { data: characters, loading, error } = useCharacters();

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
    <>
      <ContainerTitle className="container">
        <span>Bem vindo ao Marvel Heroes</span>
        <HomeTitle>Vamos conhecer seus personagens favoritos</HomeTitle>
        <Pagination
          totalPages={totalPages}
          onPageChange={(pageNumber) => handlePageChange(pageNumber)}
        />
      </ContainerTitle>
      <HomeContainer className="home-section container">
        <div>
          <SectionTitle>Heróis</SectionTitle>
          {loading && <Loading></Loading>}
          <CharactersList className="characters-list">
            {error && <p className="error">{error}</p>}
            {filteredCharacters &&
              filteredCharacters.map((character) => (
                <li key={character.id}>
                  <Link to={`/character/${character.id}`} className="card-item">
                    <CardCharacter character={character}></CardCharacter>
                  </Link>
                </li>
              ))}
            {filteredCharacters && filteredCharacters.length === 0 && (
              <p className="error">Nenhum personagem encontrado.</p>
            )}
          </CharactersList>
        </div>
      </HomeContainer>
    </>
  );
}
