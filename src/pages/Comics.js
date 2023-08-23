import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { CardSeriesAndComics } from "../components/CardSeriesAndComics";
import { useComics } from "../hooks/useComics";
import { BackIcon } from "../components/icons/back-icon";
import { Loading } from "../components/Loading";

const ComicsContainer = styled.section`
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
    width: calc(100% / 2);
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

export function Comics() {
  document.querySelector("header form")?.classList?.remove("open");

  const params = useParams();
  const navigate = useNavigate();

  const { data: comics, loading, error } = useComics(params.id, 100, 0);

  useEffect(() => {
    if (!loading) {
      document.querySelector(".comics-section")?.classList?.add("show-section");
    }
  }, [loading]);

  console.log(loading);

  return (
    <div className="container">
      <Back
        onClick={() => {
          navigate(`/character/${params.id}`);
        }}
      >
        <BackIcon color={"black"} />
        <span>Voltar</span>
      </Back>
      <SectionTitle>Comics</SectionTitle>
      {loading && <Loading></Loading>}
      <ComicsContainer className="comics-section ">
        <SectionList key={comics}>
          {error && <p className="error">{error}</p>}
          {!loading &&
            !error &&
            comics &&
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
    </div>
  );
}
