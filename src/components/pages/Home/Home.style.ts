import styled from "styled-components";

export const StyledHome = styled.div`
  display: flex;
  width: 90%;
  height: 100%;
  max-width: 1000px;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 90%;
  }
  ${({ theme }) => theme.breakpoints.down("xs")} {
    width: 100%;
  }
`;
