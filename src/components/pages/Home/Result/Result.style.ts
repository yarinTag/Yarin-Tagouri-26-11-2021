import styled from "styled-components";

export const LoadingWrapper = styled.div`
  position: absolute;
  display: ${({ isLoading }: any) => (isLoading ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
