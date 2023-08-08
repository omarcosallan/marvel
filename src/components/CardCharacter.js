import { styled } from "styled-components";

const Card = styled.li`
  position: relative;
  width: 100%;
  height: 300px;

  color: var(--white);

  border-radius: 16px;
  line-height: 150%;

  box-shadow: 0 7px 17px -8px rgba(0, 0, 0, 0.8);

  figure {
    width: 100%;
    height: 210px;

    > img {
      width: 100%;
      height: 100%;

      border-radius: 16px;
      object-fit: cover;
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: end;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    border-radius: 16px;
    padding: 40px 20px;

    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 10%, #000 70%);
  }

  > p {
    font-size: 14px;
    font-weight: 500;
    text-align: justify;
  }
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 900;
`;

export function CardCharacter({ character }) {
  let names = [];
  if (character) names = character.name.split("(");
  return (
    <>
      {character && (
        <Card key={character.id}>
          <figure>
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt=""
            />
          </figure>
          <div>
            <span>{names[0]}</span>
            <CardTitle>{names[1]?.replace(")", "")}</CardTitle>
          </div>
        </Card>
      )}
    </>
  );
}
