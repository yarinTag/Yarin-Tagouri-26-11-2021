import { FC } from "react";
import { Link, LinkLabel } from "./HeaderSwitch.style";

interface HeaderSwitchProps {
  label: string;
  icon: JSX.Element;
  to: string;
}
const HeaderSwitch: FC<HeaderSwitchProps> = ({ label, icon, ...linkProps }) => {
  return (
    <Link {...linkProps}>
      {icon}
      <LinkLabel>{label}</LinkLabel>
    </Link>
  );
};

export default HeaderSwitch;
