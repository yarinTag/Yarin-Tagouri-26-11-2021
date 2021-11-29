import styled from "styled-components";
import TemperComp from "../../../../../../shared/TemperComp";

export const CurrentDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


export const StyledWTemper = styled(TemperComp)`
  font-size: 2rem;
  margin-left: 50px;
  ${({ theme }) => theme.breakpoints.down("xs")} {
    font-size: 500px;
  }
`;
