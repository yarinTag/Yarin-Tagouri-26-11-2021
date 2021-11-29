import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  color: inherit;
  margin-left: 10px;
  font-weight: bold;
  text-decoration: none;
  &.active {
    color: #f570f78a;
  }
`;

export const LinkLabel = styled.label`
  margin-left: 5px;
  cursor: pointer;
`;