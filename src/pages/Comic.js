import { useNavigate, useParams } from "react-router-dom";

import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { BackIcon } from "../components/icons/back-icon";
import { formatDate } from "../utils/formatDate";
import { useComic } from "../hooks/useComic";

import { Loading } from "../components/Loading";

const CharacterContainer = styled.section`
  padding: 61.5px 160px;

  svg {
    cursor: pointer;
  }
`;

const Card = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 40px;

  color: var(--white);

  border-radius: 16px;
  line-height: 150%;

  figure img {
    width: 350px;
    object-fit: cover;
    box-shadow: 0 7px 17px -8px rgba(0, 0, 0, 0.8);

    opacity: 0;
    transition: opacity, 0.1s ease-in-out;
    transform: translateZ(0);
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

const Published = styled.div`
  margin: 20px auto;
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

export function Comic() {
  const params = useParams();

  const { data: comicData, loading, error } = useComic(params.idComic, 1, 0);
  const [comic, setComic] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    setComic(comicData);
  }, [comicData]);

  const imageUrl =
    `${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}` ||
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  const [writer, setWriter] = useState(null);
  const [penciler, setPenciler] = useState(null);
  const [editor, setEditor] = useState(null);
  const [colorist, setColorist] = useState(null);
  const [inker, setInker] = useState(null);

  useEffect(() => {
    const writerCreators = comic?.creators?.items.filter(
      (item) => item.role === "writer"
    );
    const pencilerCreators = comic?.creators?.items.filter(
      (item) => item.role === "penciller"
    );
    const editorCreators = comic?.creators?.items.filter(
      (item) => item.role === "editor"
    );
    const coloristCreators = comic?.creators?.items.filter(
      (item) => item.role === "colorist"
    );
    const inkerCreators = comic?.creators?.items.filter(
      (item) => item.role === "inker"
    );

    setWriter(writerCreators?.map((creator) => creator.name) || null);
    setPenciler(pencilerCreators?.map((creator) => creator.name) || null);
    setEditor(editorCreators?.map((creator) => creator.name) || null);
    setColorist(coloristCreators?.map((creator) => creator.name) || null);
    setInker(inkerCreators?.map((creator) => creator.name) || null);
  }, [comic?.creators?.items]);

  useEffect(() => {
    if (!loading) {
      document.querySelector(".comic-section")?.classList?.add("show-section");
    }
  }, [loading]);

  return (
    <CharacterContainer className="comic-section">
      {loading && <Loading />}
      {error && <p className="error">{error}</p>}
      {comic && (
        <>
          <Card>
            <figure>
              <img
                src={imageUrl}
                alt={comic?.title}
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
                <Type>Comics</Type>
                <Title>{comic?.title}</Title>
                <Published>
                  <div>
                    <h4>Modified in:</h4>
                    <p>{formatDate(comic?.modified)}</p>
                  </div>
                </Published>
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
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  )}
                  {editor?.length >= 1 && (
                    <div>
                      <h4>Editor:</h4>
                      {editor.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  )}
                  {colorist?.length >= 1 && (
                    <div>
                      <h4>Colorist:</h4>
                      {colorist.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  )}
                  {inker?.length >= 1 && (
                    <div>
                      <h4>Inker:</h4>
                      {inker.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  )}
                </Creators>
                <div>
                  <Description>{comic?.description}</Description>
                </div>
              </div>
            </CardInformations>
          </Card>
          <>
            {!comic?.format && !comic?.upc && !comic?.prices?.length > 0 ? (
              <TitleDetails>No more details</TitleDetails>
            ) : (
              <TitleDetails>More details</TitleDetails>
            )}
            {comic?.format && (
              <h4>
                Format: <span>{comic?.format}</span>
              </h4>
            )}
            {comic?.prices?.length > 0 && (
              <h4>
                Price:{" "}
                {comic?.prices.map((item) => (
                  <span key={item}>${item.price}</span>
                ))}
              </h4>
            )}
            {comic?.upc && (
              <h4>
                UPC: <span>{comic?.upc}</span>
              </h4>
            )}
          </>
        </>
      )}
    </CharacterContainer>
  );
}
