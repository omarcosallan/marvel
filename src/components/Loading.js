import React from "react";
import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingCircle = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(242, 38, 75, 0.2);
  border-top: 5px solid #f2264b;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;

export function Loading() {
  return (
    <LoadingContainer>
      <LoadingCircle />
    </LoadingContainer>
  );
}
