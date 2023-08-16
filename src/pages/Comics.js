import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { CardSeriesAndComics } from "../components/CardSeriesAndComics";
import { useComics } from "../hooks/useComics";
import { BackIcon } from "../components/icons/back-icon";
import { Loading } from "../components/Loading";

const ComicsContainer = styled.section`
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
  justify-content: left;
  flex-wrap: wrap;
  list-style: none;

  a {
    width: calc(100% / 6);
    padding: 16px 8px;
    text-decoration: none;
  }

  a:hover {
    cursor: pointer;

    div {
      top: -8px;
    }

    h4 {
      color: var(--red);
    }
  }
`;

export function Comics() {
  document.querySelector("header form")?.classList?.remove("open");

  const params = useParams();
  const navigate = useNavigate();

  const { data: comicsData, loading, error } = useComics(params.id, 100, 0);
  const [comics, setComics] = useState();

  useEffect(() => {
    setComics(comicsData);
  }, [comicsData]);

  useEffect(() => {
    if (!loading) {
      document.querySelector(".comics-section")?.classList?.add("show-section");
    }
  }, [loading]);

  return (
    <ComicsContainer className="comics-section">
      <Back
        onClick={() => {
          navigate(`/character/${params.id}`);
        }}
      >
        <BackIcon color={"black"} />
        <span>Voltar</span>
      </Back>
      <SectionTitle>Comics</SectionTitle>
      <SectionList key={comics}>
        {loading && <Loading />}
        {error && <p className="error">{error}</p>}
        {comics &&
          comics.map((comic) => (
            <Link
              key={comic.id}
              to={`/character/${params.id}/comic/${comic.id}`}
            >
              <CardSeriesAndComics data={comic}></CardSeriesAndComics>
            </Link>
          ))}
      </SectionList>
    </ComicsContainer>
  );
}
