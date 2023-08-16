import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { CardSeriesAndComics } from "../components/CardSeriesAndComics";
import { useSeries } from "../hooks/useSeries";
import { BackIcon } from "../components/icons/back-icon";
import { Loading } from "../components/Loading";

const SerieContainer = styled.section`
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
  justify-content: start;
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

export function Series() {
  document.querySelector("header form")?.classList?.remove("open");

  const params = useParams();
  const navigate = useNavigate();

  const { data: seriesData, loading, error } = useSeries(params.id, 100, 0);
  const [series, setSeries] = useState();

  useEffect(() => {
    setSeries(seriesData);
  }, [seriesData]);

  useEffect(() => {
    if (!loading) {
      document.querySelector(".series-section").classList.add("show-section");
    }
  }, [loading]);

  return (
    <SerieContainer className="series-section">
      <Back
        onClick={() => {
          navigate(`/character/${params.id}`);
        }}
      >
        <BackIcon color={"black"} />
        <span>Voltar</span>
      </Back>
      <SectionTitle>Series</SectionTitle>
      <SectionList key={series}>
        {loading && <Loading />}
        {error && <p className="error">{error}</p>}
        {series &&
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
  );
}
