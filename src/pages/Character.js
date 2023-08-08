import { Link, useNavigate, useParams } from "react-router-dom";

import { styled } from "styled-components";
import { useEffect, useState } from "react";

import { CardSeriesAndComics } from "../components/CardSeriesAndComics";
import { BackIcon } from "../components/icons/back-icon";

import { useCharacter } from "../hooks/useCharacter";
import { useCharacterContext } from "../contexts/CharactersContext";

import { useComics } from "../hooks/useComics";
import { useSeries } from "../hooks/useSeries";
import { Loading } from "../components/Loading";

const CharacterContainer = styled.div`
  padding: 30px 160px;

  svg {
    cursor: pointer;
  }
`;

const Card = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 40px;

  > div {
    width: 100%;
  }

  color: var(--white);

  border-radius: 16px;
  line-height: 150%;
`;

const CardImage = styled.img`
  width: 350px;
  border-radius: 16px;
  object-fit: cover;
`;

const Back = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  font-weight: 700;

  > svg {
    width: 24px;
  }
`;

const CardInformations = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 100%;
  height: 350px;

  color: var(--black);

  span {
    display: block;
  }
`;

const NameCharacter = styled.h3`
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
`;

const NamePerson = styled.h4`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 3px;
`;

const SectionTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > a {
    color: var(--red);
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  span {
    font-weight: 600;
  }

  > a > svg {
    transform: rotate(-180deg);
  }
`;

const SectionTitle = styled.h3`
  color: var(--red);
  font-size: 24px;
  font-weight: bold;
  margin: 16px 0;
`;

const Description = styled.p`
  font-size: 14px;
  font-weight: 500;
  text-align: justify;

  margin-top: 20px;
`;

const SectionList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;

  gap: 16px;

  a {
    width: 15%;
    text-decoration: none;
  }

  a:hover {
    cursor: pointer;

    figure {
      position: relative;
      top: -8px;
      transition: top 1s ease-in-out;
    }

    h4 {
      color: var(--red);
    }
  }
`;

const Type = styled.span`
  margin-bottom: 20px;
`;

export function Character() {
  const { loading } = useCharacterContext();

  const params = useParams();

  // fetch character
  const { character: characterData } = useCharacter(params.id);
  const [character, setCharacter] = useState();

  // fetch 6 comics
  const { comics: comicsData } = useComics(params.id, 6, 0);
  const [comics, setComics] = useState();

  // fetch 6 series
  const { series: seriesData } = useSeries(params.id, 6, 0);
  const [series, setSeries] = useState();

  useEffect(() => {
    setCharacter(characterData);
    setComics(comicsData);
    setSeries(seriesData);
  }, [characterData, seriesData, comicsData]);

  const navigate = useNavigate();

  const names = character?.name?.split("(") || [];
  const description = character?.description
    ? character?.description
    : "Ainda não há descrição para este personagem.";
  const urlImage = character
    ? `${character?.thumbnail?.path}.${character?.thumbnail?.extension}`
    : "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  return (
    <>
      {loading && !character && !series && !comics ? (
        <CharacterContainer>
          <Loading></Loading>
        </CharacterContainer>
      ) : (
        <CharacterContainer>
          <Card>
            <figure>
              <CardImage src={urlImage} />
            </figure>
            <CardInformations>
              <Back
                onClick={() => {
                  navigate("/");
                }}
              >
                <BackIcon color={"black"} />
                <span>Voltar</span>
              </Back>
              <div>
                <Type>Character</Type>
                {names[1] && (
                  <>
                    <NamePerson>{names[1]?.replace(")", "")}</NamePerson>
                    <NameCharacter>{names[0]}</NameCharacter>
                  </>
                )}
                {!names[1] && <NameCharacter>{names[0]}</NameCharacter>}
                {description && (
                  <div>
                    <Description>{description}</Description>
                  </div>
                )}
              </div>
            </CardInformations>
          </Card>
          <>
            <SectionTitleContainer>
              <SectionTitle>Histórias em quadrinhos</SectionTitle>
              <Link to={`/comics/character/${params.id}`}>
                <span>Ver mais</span>
                <BackIcon color={"#f2264b"} />
              </Link>
            </SectionTitleContainer>
            <SectionList key={comics}>
              {Array.isArray(comics) &&
                comics.map((comic) => (
                  <Link
                    key={comic.id}
                    to={`/character/${params.id}/comic/${comic.id}`}
                  >
                    <CardSeriesAndComics data={comic}></CardSeriesAndComics>{" "}
                  </Link>
                ))}
            </SectionList>
          </>
          <>
            <SectionTitleContainer>
              <SectionTitle>Series</SectionTitle>
              <Link to={`/series/character/${params.id}`}>
                <span>Ver mais</span>
                <BackIcon color={"#f2264b"} />
              </Link>
            </SectionTitleContainer>
            <SectionList key={series}>
              {Array.isArray(series) &&
                series.map((serie) => (
                  <Link
                    key={serie.id}
                    to={`/character/${params.id}/serie/${serie.id}`}
                  >
                    <CardSeriesAndComics data={serie}></CardSeriesAndComics>
                  </Link>
                ))}
            </SectionList>
          </>
        </CharacterContainer>
      )}
    </>
  );
}
