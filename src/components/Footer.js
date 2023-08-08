import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useCharacterContext } from "../contexts/CharactersContext";

const FooterContainer = styled.footer`
  background-color: var(--black);
  position: absolute;
  bottom: auto;
  width: 100%;
  height: 20vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p,
  a {
    text-decoration: none;
    color: var(--white);
  }
`;

export function Footer() {
  const { loading } = useCharacterContext();
  if (loading) {
    return;
  }

  return (
    <FooterContainer>
      <p>Desenvolvido por Marcos Allan</p>
      <Link to="http://marvel.com">
        Data provided by Marvel. © 2023 MARVEL{" "}
      </Link>
    </FooterContainer>
  );
}
