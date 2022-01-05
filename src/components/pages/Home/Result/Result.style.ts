import styled from "styled-components";
interface Props {
  isLoading: boolean;
}
export const LoadingWrapper = styled.div<Props>`
  position: absolute;
  display: ${({ isLoading }) => (isLoading ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
