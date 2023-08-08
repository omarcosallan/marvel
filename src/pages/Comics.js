import { useEffect, useState } from "react";
import { useCharacterContext } from "../contexts/CharactersContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { CardSeriesAndComics } from "../components/CardSeriesAndComics";
import { useComics } from "../hooks/useComics";
import { BackIcon } from "../components/icons/back-icon";

const ComicsContainer = styled.div`
  padding: 30px 160px;

  svg {
    cursor: pointer;
  }
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

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin: 16px 0;
  color: var(--red);
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

export function Comics() {
  const { loading } = useCharacterContext();

  const params = useParams();
  const navigate = useNavigate();

  const { comics: comicsData } = useComics(params.id, 100, 0);
  const [comics, setComics] = useState();

  useEffect(() => {
    setComics(comicsData);
  }, [comicsData]);

  return (
    <ComicsContainer>
      <Back
        onClick={() => {
          navigate(`/character/${params.id}`);
        }}
      >
        <BackIcon color={"black"} />
        <span>Voltar</span>
      </Back>
      <SectionTitle>Comics</SectionTitle>
      {comics && !loading ? (
        <SectionList key={comics}>
          {comics.map((comic) => (
            <Link
              key={comic.id}
              to={`/character/${params.id}/comic/${comic.id}`}
            >
              <CardSeriesAndComics data={comic}></CardSeriesAndComics>
            </Link>
          ))}
        </SectionList>
      ) : (
        <p>Aguarde...</p>
      )}
    </ComicsContainer>
  );
}
