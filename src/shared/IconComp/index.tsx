import { StyledIcon, StyledImage } from "./IconComp.style";

const IconComp = ({ src }: string | any) => {
  return (
    <StyledIcon>
      <StyledImage src={src} />
    </StyledIcon>
  );
};

export default IconComp;
