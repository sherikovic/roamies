import styled from "styled-components";
import SVG from "react-inlinesvg";

export const CardOverlay = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.882);
	z-index: 10;
	transition: 0.2s ease;
`;

export const OverlayContent = styled.div`
	position: relative;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	width: 500px;
	float: left;
	border-radius: 15px;
`;

export const XClose = styled.button`
	background: none;
	color: #afb7c3;
	font-size: 30px;
	position: absolute;
	top: 30px;
	right: 30px;
	border: none;
	padding: 0;
	&:after {
		content: "\\00d7";
		cursor: pointer;
	}
	&:hover {
		color: #afb7c3bc;
	}
`;

export const LogoLink = styled.a`
	display: flex;
	align-items: center;
`;

export const LogoBlack = styled(SVG)`
	> g {
		fill: #000000;
	}
	max-width: 60px;
	max-height: 60px;
`;

export const LogoWhite = styled(SVG)`
	> g {
		fill: #ffffff;
	}
	max-width: 80px;
	max-height: 80px;
`;

export const FlexboxRow = styled.div`
	display: flex;
`;

export const FlexboxCol = styled.div`
	display: flex;
	flex-direction: column;
`;

export const SliderBtn = styled.div<{ $opacity: number; $cursor: string }>`
	> img {
		opacity: ${(p) => p.$opacity};
		display: flex;
		position: relative;
		z-index: 3;
		align-items: center;
		cursor: ${(p) => p.$cursor};
		height: 30px;
	}
`;
