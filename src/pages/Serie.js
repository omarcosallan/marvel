import { useNavigate, useParams } from "react-router-dom";

import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { BackIcon } from "../components/icons/back-icon";
import { useSerie } from "../hooks/useSerie";
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

  color: var(--white);

  border-radius: 16px;
  line-height: 150%;

  figure img {
    width: 100%;
    max-width: 350px;
    object-fit: cover;
    box-shadow: 0 7px 17px -8px rgba(0, 0, 0, 0.8);

    opacity: 0;
    transition: opacity, 0.1s ease-in-out;
    transform: translateZ(0);
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;

    gap: 32px;
  }
`;

const Back = styled.div`
  display: flex;
  align-items: center;
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

  h4 {
    font-size: 20px;
    font-weight: 700;
  }
`;

const Type = styled.span`
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
  color: var(--red);
`;

const TitleDetails = styled.h3`
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
`;

const Creators = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
  margin: 20px auto;

  div {
    width: 45%;
  }
`;

const Description = styled.p`
  font-size: 14px;
  font-weight: 500;
  text-align: justify;
  margin-top: 20px;
`;

export function Serie() {
  const params = useParams();

  const { data: serie, loading, error } = useSerie(params.idSerie, 1, 0);

  const navigate = useNavigate();

  const imageUrl =
    `${serie?.thumbnail?.path}.${serie?.thumbnail?.extension}` ||
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  const [writer, setWriter] = useState(null);
  const [penciler, setPenciler] = useState(null);
  const [editor, setEditor] = useState(null);
  const [colorist, setColorist] = useState(null);
  const [inker, setInker] = useState(null);

  useEffect(() => {
    const writerCreators = serie?.creators?.items.filter(
      (item) => item.role === "writer"
    );
    const pencilerCreators = serie?.creators?.items.filter(
      (item) => item.role === "penciller"
    );
    const editorCreators = serie?.creators?.items.filter(
      (item) => item.role === "editor"
    );
    const coloristCreators = serie?.creators?.items.filter(
      (item) => item.role === "colorist"
    );
    const inkerCreators = serie?.creators?.items.filter(
      (item) => item.role === "inker"
    );

    setWriter(writerCreators?.map((creator) => creator.name) || null);
    setPenciler(pencilerCreators?.map((creator) => creator.name) || null);
    setEditor(editorCreators?.map((creator) => creator.name) || null);
    setColorist(coloristCreators?.map((creator) => creator.name) || null);
    setInker(inkerCreators?.map((creator) => creator.name) || null);
  }, [serie?.creators?.items]);

  useEffect(() => {
    if (!loading) {
      document.querySelector(".serie-section")?.classList?.add("show-section");
    }
  }, [loading]);

  return (
    <CharacterContainer className="serie-section container">
      {loading && <Loading />}
      {error && <p className="error">{error}</p>}
      {serie && (
        <>
          <Card>
            <figure>
              <img
                src={imageUrl}
                alt={serie?.title}
                loading="laze"
                onLoad={(e) => (e.target.style.opacity = 1)}
              />
            </figure>
            <CardInformations>
              <Back
                onClick={() => {
                  navigate(`/character/${params.idCharacter}`);
                }}
              >
                <BackIcon color={"black"} />
                <span>Voltar</span>
              </Back>
              <div>
                <Type>Serie</Type>
                <Title>{serie?.title}</Title>
                <Creators>
                  {writer?.length >= 1 && (
                    <div>
                      <h4>Writer:</h4>
                      {writer.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  )}
                  {penciler?.length >= 1 && (
                    <div>
                      <h4>Penciler:</h4>
                      {penciler.map((item) => (
                        <p>{item}</p>
                      ))}
                    </div>
                  )}
                  {editor?.length >= 1 && (
                    <div>
                      <h4>Editor:</h4>
                      {editor.map((item) => (
                        <p>{item}</p>
                      ))}
                    </div>
                  )}
                  {colorist?.length >= 1 && (
                    <div>
                      <h4>Colorist:</h4>
                      {colorist.map((item) => (
                        <p>{item}</p>
                      ))}
                    </div>
                  )}
                  {inker?.length >= 1 && (
                    <div>
                      <h4>Inker:</h4>
                      {inker.map((item) => (
                        <p>{item}</p>
                      ))}
                    </div>
                  )}
                </Creators>
                <div>
                  <Description>{serie?.description}</Description>
                </div>
              </div>
            </CardInformations>
          </Card>
          <>
            {!serie?.format && !serie?.upc && !serie?.prices?.length > 0 ? (
              <TitleDetails>No more details</TitleDetails>
            ) : (
              <TitleDetails>More details</TitleDetails>
            )}
            {serie?.format && (
              <h4>
                Format: <span>{serie?.format}</span>
              </h4>
            )}
            {serie?.prices?.length > 0 && (
              <h4>
                Price:{" "}
                {serie?.prices.map((item) => (
                  <span>${item.price}</span>
                ))}
              </h4>
            )}
            {serie?.upc && (
              <h4>
                UPC: <span>{serie?.upc}</span>
              </h4>
            )}
          </>
        </>
      )}
    </CharacterContainer>
  );
}
