import { Link, useNavigate, useParams } from "react-router-dom";

import { styled } from "styled-components";
import { useEffect } from "react";

import { CardSeriesAndComics } from "../components/CardSeriesAndComics";
import { BackIcon } from "../components/icons/back-icon";

import { useCharacter } from "../hooks/useCharacter";

import { useComics } from "../hooks/useComics";
import { useSeries } from "../hooks/useSeries";
import { Loading } from "../components/Loading";

const CharacterContainer = styled.section`
  svg {
    cursor: pointer;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  margin-bottom: 40px;

  > figure {
    width: 100%;
    max-width: 350px;
  }

  color: var(--white);

  border-radius: 16px;
  line-height: 150%;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;

    gap: 32px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  object-fit: cover;
  box-shadow: 0 7px 17px -8px rgba(0, 0, 0, 0.8);
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
  justify-content: space-between;

  color: var(--black);

  span {
    display: block;
  }
`;

const NameCharacter = styled.h3`
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
  color: var(--red);
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

  > a:hover {
    color: var(--black);
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
  justify-content: left;
  flex-wrap: wrap;
  list-style: none;

  a {
    width: calc(100% / 2);
    padding-inline: 16px 8px;
    padding-bottom: 16px;
    text-decoration: none;
  }

  a:hover {
    cursor: pointer;

    div {
      top: -4px;
    }

    h4 {
      color: var(--red);
    }
  }

  @media (min-width: 425px) {
    a {
      width: calc(100% / 3);
    }
  }

  @media (min-width: 768px) {
    a {
      width: calc(100% / 6);
    }
  }
`;

const Type = styled.span`
  margin-bottom: 20px;
`;

export function Character() {
  document.querySelector(".App")?.classList?.remove("open");
  document.querySelector("header form")?.classList?.remove("open");

  const params = useParams();

  // fetch character
  const {
    data: character,
    error,
    loading: loadingCharacter,
  } = useCharacter(params.id);

  // fetch 6 comics
  const {
    data: comics,
    error: errorComics,
    loading: loadingComics,
  } = useComics(params.id, 6, 0);

  // fetch 6 series
  const {
    data: series,
    error: errorSeries,
    loading: loadingSeries,
  } = useSeries(params.id, 6, 0);

  useEffect(() => {
    if (!loadingCharacter) {
      document
        .querySelector(".character-section")
        .classList.add("show-section");
    }
  }, [loadingCharacter]);

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
      {!character && !series && !comics ? (
        <CharacterContainer className="character-section container">
          {error && <p className="error">{error}</p>}
          {(loadingCharacter || loadingComics || loadingSeries) && (
            <Loading></Loading>
          )}
        </CharacterContainer>
      ) : (
        <CharacterContainer
          className="character-section container"
          onLoad={() => document.querySelector(".App").classList.add("open")}
        >
          <Card>
            <figure>
              <CardImage src={urlImage} loading="laze" />
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
            <SectionList key={comics} loading="laze">
              {loadingComics && <Loading></Loading>}
              {errorComics && <p className="error">{errorComics}</p>}
              {!loadingComics &&
                !errorComics &&
                Array.isArray(comics) &&
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
            <SectionList key={series} loading="laze">
              {loadingSeries && <Loading></Loading>}
              {errorSeries && <p className="error">{errorSeries}</p>}
              {!loadingSeries &&
                !errorSeries &&
                Array.isArray(series) &&
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
