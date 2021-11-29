import { FC } from "react";
import { StyledItemTemper } from "./TemperComp.style";

const TemperComp: FC<number | any> = ({ temper }) => {
  return <StyledItemTemper>{temper}</StyledItemTemper>;
};

export default TemperComp;
