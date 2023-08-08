import { styled } from "styled-components";

const Card = styled.li`
  display: flex;
  flex-direction: column;

  figure {
    width: 100%;
    height: 235px;
    object-fit: cover;

    box-shadow: 0 7px 17px -8px rgba(0, 0, 0, 0.8);
  }

  img {
    width: 100%;
    height: 100%;
  }

  h4 {
    margin-top: 10px;
    font-size: 14px;
    color: var(--dark);
  }
`;

export function CardSeriesAndComics({ data }) {
  return (
    <Card key={data.id}>
      <figure>
        <img
          src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
          alt={data.name}
        />
      </figure>
      <h4>{data.title}</h4>
    </Card>
  );
}
