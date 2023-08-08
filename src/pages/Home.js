import { styled } from "styled-components";
import { CardCharacter } from "../components/CardCharacter";
import { useCharacterContext } from "../contexts/CharactersContext";
import { Link } from "react-router-dom";
import { Pagination } from "../components/Pagination";
import { useCharacters } from "../hooks/useCharacters";
import { Loading } from "../components/Loading";
import { useEffect, useState } from "react";

const HomeContainer = styled.div`
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
  justify-content: space-evenly;
  align-items: center;

  list-style: none;
  gap: 16px;

  a {
    width: 18%;
  }

  a:hover {
    cursor: pointer;

    position: relative;
    top: -4px;
  }
`;

export function Home() {
  const {
    totalPages,
    loading,
    setLoading,
    setCurrentPage,
    setOffset,
    setPageNumber,
  } = useCharacterContext();

  const { data } = useCharacters();
  const [characters, setCharacters] = useState();

  useEffect(() => {
    setCharacters(data);
  }, [data, setLoading]);

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    setPageNumber(pageNumber);
    setOffset((pageNumber - 1) * 30);
  };

  return (
    <HomeContainer>
      <span>Bem vindo ao Marvel Heroes</span>
      <HomeTitle>Vamos conhecer seus personagens favoritos</HomeTitle>
      <Pagination
        totalPages={totalPages}
        onPageChange={(pageNumber) => handlePageChange(pageNumber)}
      />
      <div>
        <SectionTitle>Heróis</SectionTitle>
        {loading && <Loading></Loading>}
        {characters && (
          <CharactersList>
            {characters &&
              characters.map((character) => (
                <Link key={character.id} to={`/character/${character.id}`}>
                  <CardCharacter character={character}></CardCharacter>
                </Link>
              ))}
          </CharactersList>
        )}
      </div>
    </HomeContainer>
  );
}
