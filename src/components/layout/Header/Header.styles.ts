import { IconButton, MenuItem, Typography } from "@mui/material";
import styled from "styled-components";
import HeaderSwitch from "./HeaderSwitch.tsx";

export const StyledIconButton = styled(IconButton)`
  color: inherit;
  padding: 0px;
`;

export const Links = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  margin: 0 20px;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  & > *:not(:first-child) {
    margin-left: 20px;
  }
  flex: 1 1 0%;
`;

export const StyledMenuItem = styled(MenuItem)`
  display: flex;
  justify-content: space-around;
`;

export const MenuItemLabel = styled(Typography).attrs({
  variant: "body2",
  noWrap: true,
})`
  margin-right: 10px;
`;
export const MenuItemLink = styled(HeaderSwitch)`
  margin-left: 0;
  width: 100%;
`;
