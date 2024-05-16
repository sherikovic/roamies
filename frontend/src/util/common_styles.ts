import styled from "styled-components/macro";
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

export const APIForm = styled.div`
	display: flex;
	flex-direction: column;
	padding: 15px 30px 15px 30px;
	margin: 0 auto 0;
	width: 100%;
`;

export const APIFormHeader = styled.p`
	margin: 0;
	padding: 0 0 30px;
	font-size: medium;
	font-weight: 500;
	letter-spacing: 0.1rem;
	color: var(--color-primary-200);
	width: 100%;
`;

export const APIFormItem = styled.div`
	display: flex;
	position: relative;
	padding: 20px 0;
	margin-top: 0;
	width: 100%;
`;

export const APIFormBtnsSelect = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	border-right: 1px solid var(--color-gray-700);
`;

export const APIFormBtnSelect = styled.button<{ $selected: boolean }>`
	display: flex;
	border: none;
	background: none;
	cursor: pointer;
	color: ${(p) =>
		p.$selected
			? "color: var(--color-primary-300)"
			: "var(--color-primary-100)"};
	font-size: medium;
	border-bottom: 1px solid var(--color-gray-700);
	padding: 0.5rem 1rem;
	width: 100%;
	&:last-child {
		border-bottom: none;
	}
	&:hover {
		background-color: var(--color-gray-800);
	}
`;

export const APIFormInputLabel = styled.label`
	position: absolute;
	top: 0;
	font-weight: 400;
	font-size: 0.9rem;
	text-transform: uppercase;
	letter-spacing: 0.15rem;
	transition: 0.2s;
	padding-left: 7px;
	color: var(--color-primary-200);
	cursor: pointer;
`;

export const APIFormInputField = styled.input`
	width: 100%;
	border: none;
	outline: 0;
	padding: 7px 0;
	padding-left: 5px;
	font-size: 0.9rem;
	border-bottom: 0.1rem solid var(--color-gray-700);
	background: transparent;
	transition: border-color 0s;
	color: var(--color-primary-200);
	cursor: pointer;

	&::placeholder {
		color: transparent;
	}

	&:hover {
		background-color: var(--color-gray-300);
		border-radius: 0.2rem;
		border-bottom: 0.1rem solid transparent;
	}

	&:placeholder-shown ~ ${APIFormInputLabel} {
		font-size: 0.9rem;
		cursor: text;
		top: 22px;
	}

	&:focus {
		~ ${APIFormInputLabel} {
			position: absolute;
			transition: 0.2s;
			font-size: 0.7rem;
			top: 0;
			color: var(--color-primary-600);
		}
		padding: 8px 0;
		border-color: var(--color-primary-600);
		border-width: 0.15rem;
		text-indent: 0.6rem;
	}
`;

export const APIBtnSave = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	& > button {
		font: inherit;
		cursor: pointer;
		margin: 1rem 0;
		padding: 0.7rem 2rem;
		border-radius: 4px;
		background-color: var(--color-primary-300);
		color: var(--color-gray-100);
		border: none;
		&:hover {
			background-color: var(--color-primary-500);
		}
	}
`;

export const APIGroupCC = styled.div`
	display: flex;
	/* justify-content: space-between; */
	width: 100%;
	gap: 10rem;
`;
