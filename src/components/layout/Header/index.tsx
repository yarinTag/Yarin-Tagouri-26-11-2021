import { FC, useState } from "react";
import {
  AppBar,
  Divider,
  Hidden,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import paths from "../../../constants/constants";
import {
  Controls,
  Links,
  MenuItemLabel,
  MenuItemLink,
  StyledIconButton,
  StyledMenuItem,
} from "./Header.styles";
import HeaderSwitch from "./HeaderSwitch.tsx";
import { Favorite, Home } from "@mui/icons-material";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import BrightnessMediumIcon from "@mui/icons-material/BrightnessMedium";
import ListIcon from "@mui/icons-material/List";
import { useDispatch, useSelector } from "react-redux";
import { themeColor } from "../../../redux/slices/themeSlices";

const Header: FC = () => {
  const dispatch = useDispatch();
  const { themeControl } = useSelector((state: any) => state.themeSlices);
  const [menuButtons, setMenuButtons] = useState(null);

  const onChangeTheme = () => {
    if (themeControl) dispatch(themeColor(false));
    else dispatch(themeColor(true));
    closeHeaderMenu();
  };
  const onClickMoreButton = (event: any) => {
    setMenuButtons(event.currentTarget);
  };

  const closeHeaderMenu = () => {
    setMenuButtons(null);
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ whiteSpace: "nowrap" }}>
          <Typography variant="h6">App Weather</Typography>

          <Controls>
            <Hidden xsDown={true} lgDown={true} xlUp={false}>
              <Links>
                <HeaderSwitch to={paths.HOME} label="Home" icon={<Home />} />
                <HeaderSwitch
                  to={paths.FAVORITES}
                  label="Favorites"
                  icon={<Favorite />}
                />
              </Links>
            </Hidden>

            <Hidden xsDown={false} lgDown={true} xlUp={false}>
              <Tooltip title=" Light / Dark theme">
                <StyledIconButton onClick={onChangeTheme}>
                  {themeControl ? (
                    <BrightnessHighIcon />
                  ) : (
                    <BrightnessMediumIcon />
                  )}
                </StyledIconButton>
              </Tooltip>
            </Hidden>

            <Hidden mdUp lgUp xlUp>
              <StyledIconButton onClick={onClickMoreButton}>
                <ListIcon />
              </StyledIconButton>
            </Hidden>
          </Controls>

          <Menu
            anchorEl={menuButtons}
            open={Boolean(menuButtons)}
            onClose={closeHeaderMenu}
          >
            <StyledMenuItem>
              <MenuItemLink to={paths.HOME} label="Home" icon={<Home />} />
            </StyledMenuItem>

            <StyledMenuItem>
              <MenuItemLink
                to={paths.FAVORITES}
                label="Favorites"
                icon={<Favorite />}
              />
            </StyledMenuItem>

            <Divider />

            <StyledMenuItem>
              <MenuItemLabel>Theme</MenuItemLabel>
              <StyledIconButton onClick={onChangeTheme}>
                {themeControl ? (
                  <BrightnessHighIcon />
                ) : (
                  <BrightnessMediumIcon />
                )}
              </StyledIconButton>
            </StyledMenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
