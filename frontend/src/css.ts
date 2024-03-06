import { MOBILE_WIDTH, TABLET_WIDTH } from "./constants";
import { Link as routerLink } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";

export const media = {
  mobile: `@media screen and (max-width: ${MOBILE_WIDTH}px)`,
  tablet: `@media screen and (max-width: ${TABLET_WIDTH}px)`,
  desktop: `@media screen and (min-width: ${TABLET_WIDTH + 1}px)`,
};

export const globalTransitionSettings =
  "all 0.2s ease;   -moz-transition-property: none;";

export const colors = {
  whiteMain: "#e8e9ea",
  white: "#ffffff",
  blue100: "#bbdefb",
  blue200: "#90caf9",
  blue300: "#64b5f6",
  blue400: "#1976d2",
  blue500: "#0353a4",
  blue600: "#023e7d",
  blue700: "#002855",
  blackMain: "#000a1c",

  colorPrimary100: "#fcf3e1",
  colorPrimary200: "#ffffff",
  colorPrimary300: "#0353a4",
  colorPrimary400: "#fbd997",
  colorPrimary500: "#2196f3",
  colorPrimary600: "#0466c8",
  colorPrimary700: "#0353a4",
  colorPrimary800: "#0353a4",
  colorPrimary900: "#0353a4",
};

export const fontWeights = {
  /** 200 */
  lightest: 200,
  /** 300 */
  light: 300,
  /** 500 */
  bold: 500,
  /** 700 */
  extraBold: 700,
  black: 800,
};

export const fontSizes = {
  /** 8px */
  size0: "8px",
  /** 10px */
  size1: "10px",
  /** 12px */
  size2: "12px",
  /** 14px */
  size3: "14px",
  /** 16px */
  size4: "16px",
  /** 18px */
  size5: "18px",
  /** 22px */
  size6: "22px",
  /** 24px */
  size7: "24px",
  /** 32px */
  size8: "32px",
  /** 40px */
  size9: "40px",
  /** 48px */
  size10: "48px",
  /** 64px */
  size20: "64px",
};

export const margins = {
  size1: "4px",
  size2: "8px",
  size3: "12px",
  size4: "16px",
  size5: "24px",
  size6: "32px",
  size7: "48px",
  size8: "64px",
  size9: "128px",
};

export const borders = {
  mainBorder: `1px solid ${colors.blue700}`,
  thickMain: `2px solid ${colors.blue700}`,
};

export const borderRadiuses = {
  standard: "7px",
};

export const BUTTON_HEIGHT = "40px";

export const shadows = {
  darkTopShadow: ` 0 -5px 10px ${colors.blackMain}`,
  darkBottomShadow: ` 0 5px 10px ${colors.blackMain}`,
  lightBottomShadow: `0 5px 10px ${colors.whiteMain}`,
  darkBoxShadow: `0px 0px 10px ${colors.blackMain}`,
  largeDark: "2px 4px 28px 1px rgba(0, 0, 0, 0.5)",
};

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Text0 = styled.p`
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size0};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.bold};
`;

export const Text1 = styled.p`
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size1};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.bold};
  ${media.mobile} {
    font-size: ${fontSizes.size0};
  }
`;

export const Text2 = styled.p`
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size2};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.bold};
  ${media.mobile} {
    font-size: ${fontSizes.size1};
  }
`;

export const Text3 = styled.p`
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size3};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.bold};
  ${media.mobile} {
    font-size: ${fontSizes.size2};
  }
`;

export const Text4 = styled.p`
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size4};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.bold};
  ${media.mobile} {
    font-size: ${fontSizes.size3};
  }
`;

export const Text5 = styled.p`
  white-space: nowrap;
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size5};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.bold};
  ${media.mobile} {
    font-size: ${fontSizes.size4};
  }
`;

export const Text6 = styled.p`
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size6};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.bold};
  line-height: 1;
  ${media.mobile} {
    font-size: ${fontSizes.size5};
  }
`;

export const Text7 = styled.p`
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size7};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.bold};
  ${media.mobile} {
    font-size: ${fontSizes.size5};
  }
`;

export const Text8 = styled.p`
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size8};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.bold};
  ${media.mobile} {
    font-size: ${fontSizes.size7};
  }
`;

export const Text9 = styled.p`
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size9};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.black};
  margin-bottom: ${margins.size2};
  ${media.mobile} {
    font-size: ${fontSizes.size7};
  }
`;

export const Text10 = styled.p`
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size10};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.bold};
  ${media.mobile} {
    font-size: ${fontSizes.size9};
  }
`;

export const LightText0 = styled.p`
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size1};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.light};
`;

export const LightText1 = styled.p`
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size2};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.light};
  ${media.mobile} {
    font-size: ${fontSizes.size0};
  }
`;

export const LightText2 = styled.p`
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size3};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.light};
  ${media.mobile} {
    font-size: ${fontSizes.size1};
  }
`;

export const LightText3 = styled.p`
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size4};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.light};
  ${media.mobile} {
    font-size: ${fontSizes.size2};
  }
`;

export const LightText4 = styled.p`
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size5};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.light};
  ${media.mobile} {
    font-size: ${fontSizes.size3};
  }
`;

export const LightText5 = styled.p`
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size6};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.light};
  ${media.mobile} {
    font-size: ${fontSizes.size5};
  }
`;

export const LightText6 = styled.p`
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size7};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.light};
  ${media.mobile} {
    font-size: ${fontSizes.size6};
  }
`;

export const LightText7 = styled.p`
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size8};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.light};
  ${media.mobile} {
    font-size: ${fontSizes.size7};
  }
`;

export const TitleText = styled.p`
  margin: 0;
  color: ${colors.whiteMain};
  font-size: ${fontSizes.size9};
  font-feature-settings: "tnum";
  font-variation-settings: "wght" ${fontWeights.light};
  ${media.mobile} {
    font-size: ${fontSizes.size7};
  }
`;

export const Clickable = styled.button<{ $shadowOnHover?: boolean }>`
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  padding: 0px;
  transition: transform 0.5s;
  will-change: transform;

  :focus {
    outline: none;
  }

  &:hover {
    ${(p) => p.$shadowOnHover && "background: rgb(0 0 0 / 20%)"};
    ${(p) => !p.$shadowOnHover && "transform: translateY(-1.5px);"};
    transition: transform 0.1s;
    color: ${colors.whiteMain};
  }

  &:active {
    outline: none;
    transform: translateY(-0.75px);
  }
`;

export const Link = styled(routerLink)`
  cursor: pointer;
  text-decoration: none;
  &:hover,
  &:active,
  &:visited,
  &:focus {
    text-decoration: none;
  }
`;

export type UnderlineAnimationProps = { isHovering?: boolean };

export const underlineHover = css`
  transform-origin: bottom left;
  transform: scaleX(1);
`;

export const underlineAnimation = css<UnderlineAnimationProps>`
  position: relative;

  &:before {
    content: "";
    width: 100%;
    position: absolute;
    height: 1px;
    bottom: 0;
    left: 0;

    background-color: ${colors.blue500};
    transform-origin: bottom right;

    transform: scaleX(0);
    transition: ${globalTransitionSettings};
    ${(p) =>
      p.isHovering && "transform-origin: bottom left; transform: scaleX(1);"}
  }

  &:hover:before {
    ${underlineHover}
  }
`;

export const AnimatedLink = styled.span<UnderlineAnimationProps>`
  color: ${colors.whiteMain};
  cursor: pointer;
  ${underlineAnimation}
`;

export const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  border: ${borders.mainBorder};
  border-right: none;
  border-top: none;
  &:first-child {
    border-left: none;
  }
`;

export const COMPONENTS_GAP = 0;

export const GridRow = styled.div<{ numColumns: number }>`
  display: grid;
  grid-template-columns: ${(p) => `repeat(${p.numColumns}, 1fr)`};
  text-align: start;
`;

export const GridColumn = styled.div<{ numRows: number }>`
  display: grid;
  grid-template-rows: ${(p) => `repeat(${p.numRows}, 1fr)`};
  text-align: start;
`;

export const HideMobile = styled.div<{ display?: string }>`
  display: ${(p) => p.display || "block"};
  ${media.mobile} {
    display: none;
  }
`;

export const ShowMobile = styled.div<{ display?: string }>`
  display: ${(p) => p.display || "block"};
  ${media.desktop} {
    display: none;
  }
`;

const shimmer = keyframes`
    100% {
      transform: translateX(100%);
    }
`;

const SkeletonAnimation = styled.div`
  display: inline-block;
  height: 1em;
  position: relative;
  overflow: hidden;
  background-color: ${colors.blue600};
  border-radius: inherit;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      #1f2128 0,
      #2f343e 20%,
      #3f444d 80%,
      #334155
    );
    animation: ${shimmer} 2s infinite;
    content: "";
    opacity: 0.5;
  }
`;

export const SkeletonCircle = styled(SkeletonAnimation)`
  border-radius: 50%;
  height: 32px;
  width: 32px;
`;

export const SkeletonRectangle = styled(SkeletonAnimation)`
  height: 100%;
  width: 100%;
`;

export const slideUp = keyframes`
0% {
      transform:  translateY(100%);
      opacity: 0;
  }
  100% {
      transform:  translateY(0px);
      opacity: 1;
  }
`;

export const slideDown = keyframes`
0% {
      transform:  translateY(0%);
      opacity: 0;
  }
  100% {
      transform:  translateY(100%);
      opacity: 1;
  }
`;

export const slideLeft = keyframes`
0% {
      transform:  translateX(100%);
      opacity: 0;
  }
  100% {
      transform:  translateX(0px);
      opacity: 1;
  }
`;

export const slideRight = keyframes`
0% {
      transform:  translateX(-100%);
      opacity: 0;
  }
  100% {
      transform:  translateX(0);
      opacity: 1;
  }
`;

export const AnimatedContainer = styled(FlexColumn)<{
  $isInView: boolean;
  $direction: "up" | "down" | "left" | "right";
}>`
  width: 100%;
  animation: ${(p) =>
      p.$isInView &&
      (p.$direction === "right"
        ? slideRight
        : p.$direction === "down"
        ? slideDown
        : p.$direction === "left"
        ? slideLeft
        : slideUp)}
    700ms linear;
  opacity: ${(p) => !p.$isInView && 0};
`;

export const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  min-height: 30px;
  min-width: 30px;
  &:hover {
    background-color: ${colors.blackMain};
  }
`;
