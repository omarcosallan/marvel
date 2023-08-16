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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingCircle = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f8f8f8;
  border-top: 5px solid #f2264b;
  border-left: 5px solid #f2264b;
  border-right: 5px solid #f2264b;
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
