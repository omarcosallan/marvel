import { styled } from "styled-components";

const Card = styled.li`
  display: flex;
  flex-direction: column;
  transition: all 0.17s ease-in-out;
  transform: translateZ(0);

  :hover h4 {
    color: var(--red);
  }

  div {
    position: relative;
    top: 0;
    transition: all 0.17s ease-in-out;
  }

  figure {
    width: 100%;
    height: 235px;
    object-fit: cover;

    box-shadow: 0 7px 17px -8px rgba(0, 0, 0, 0.8);
  }

  img {
    opacity: 0;
    transition: opacity 0.17s ease-in-out;
    width: 100%;
    height: 100%;
  }

  h4 {
    max-height: 40px;
    overflow: hidden;
    margin-top: 10px;
    font-size: 16px;
    color: var(--black);
  }

  span {
    margin-top: 5px;
    font-size: 14px;
    color: var(--dark);
  }
`;

export function CardSeriesAndComics({ data }) {
  const names = data?.title?.split("(") || [];

  return (
    <Card key={data.id}>
      <div>
        <figure>
          <img
            src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
            alt={data.name}
            loading="laze"
            onLoad={(e) => (e.target.style.opacity = 1)}
          />
        </figure>
      </div>
      <h4>{names[0]}</h4>
      <span>({names[1]}</span>
    </Card>
  );
}
