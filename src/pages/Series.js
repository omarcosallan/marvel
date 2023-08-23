import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { CardSeriesAndComics } from "../components/CardSeriesAndComics";
import { useSeries } from "../hooks/useSeries";
import { BackIcon } from "../components/icons/back-icon";
import { Loading } from "../components/Loading";

const SerieContainer = styled.section`
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
  justify-content: start;
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

export function Series() {
  document.querySelector("header form")?.classList?.remove("open");

  const params = useParams();
  const navigate = useNavigate();

  const { data: series, loading, error } = useSeries(params.id, 100, 0);

  useEffect(() => {
    if (!loading) {
      document.querySelector(".series-section").classList.add("show-section");
    }
  }, [loading]);

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
      <SectionTitle>Series</SectionTitle>
      {loading && <Loading></Loading>}
      <SerieContainer className="series-section">
        <SectionList key={series}>
          {error && <p className="error">{error}</p>}
          {!loading &&
            !error &&
            series &&
            series.map((serie) => (
              <Link
                key={serie.id}
                to={`/character/${params.id}/serie/${serie.id}`}
              >
                <CardSeriesAndComics data={serie}></CardSeriesAndComics>
              </Link>
            ))}
        </SectionList>
      </SerieContainer>
    </div>
  );
}
