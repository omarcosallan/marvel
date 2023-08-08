import { useEffect, useState } from "react";
import { useCharacterContext } from "../contexts/CharactersContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { CardSeriesAndComics } from "../components/CardSeriesAndComics";
import { useSeries } from "../hooks/useSeries";
import { BackIcon } from "../components/icons/back-icon";

const SerieContainer = styled.div`
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

export function Series() {
  const { loading } = useCharacterContext();

  const params = useParams();
  const navigate = useNavigate();

  const { series: seriesData } = useSeries(params.id, 100, 0);
  const [series, setSeries] = useState();

  useEffect(() => {
    setSeries(seriesData);
  }, [seriesData]);

  return (
    <SerieContainer>
      <Back
        onClick={() => {
          navigate(`/character/${params.id}`);
        }}
      >
        <BackIcon color={"black"} />
        <span>Voltar</span>
      </Back>
      <SectionTitle>Series</SectionTitle>
      {series && !loading ? (
        <SectionList key={series}>
          {series.map((serie) => (
            <Link
              key={serie.id}
              to={`/character/${params.id}/serie/${serie.id}`}
            >
              <CardSeriesAndComics data={serie}></CardSeriesAndComics>
            </Link>
          ))}
        </SectionList>
      ) : (
        <p>Aguarde...</p>
      )}
    </SerieContainer>
  );
}
