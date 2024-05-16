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

export const SettingsForm = styled(FlexboxCol)`
	padding: 15px 30px 15px 30px;
	margin: 0 auto 0;
	width: 100%;
`;

export const SettingsHeader = styled.p`
	margin: 0;
	padding: 0 0 30px;
	font-size: medium;
	font-weight: 500;
	letter-spacing: 0.1rem;
	color: var(--color-primary-200);
	width: 100%;
`;

export const SettingsItem = styled(FlexboxRow)`
	position: relative;
	padding: 20px 0;
	margin-top: 0;
	width: 100%;
`;

export const SettingsBtnsSelect = styled(FlexboxCol)`
	align-items: flex-start;
	border-right: 1px solid var(--color-gray-700);
`;

export const SettingsBtnSelect = styled.button<{ $selected: boolean }>`
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

export const SettingsInputLabel = styled.label`
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

export const SettingsInputField = styled.input`
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

	&:placeholder-shown ~ ${SettingsInputLabel} {
		font-size: 0.9rem;
		cursor: text;
		top: 22px;
	}

	&:focus {
		~ ${SettingsInputLabel} {
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

export const SettingsBtnSave = styled.div`
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

export const SettingsInputsRow = styled(FlexboxRow)`
	width: 100%;
	gap: 10rem;
`;

export const ContentBox = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	border: 1px solid #c2c2d1;
	border-radius: 8px;
	padding: 0px;
	margin-bottom: 25px;
	overflow: hidden;
	background-color: white;
`;

export const ListPageHeader = styled.section`
	display: flex;
	margin: 10px 0 10px 0;
	justify-content: space-between;
	align-items: center;
`;

export const PageHeaderText = styled(FlexboxRow)`
	align-items: center;
	> h4 {
		display: inline-flex;
		font-size: 15px;
		font-weight: 550;
		margin: 0;
		padding: 0px 15px 0px 20px;
	}
	> a {
		display: flex;
		font-size: 13px;
		text-decoration: none;
		color: black;
	}
`;

export const Img = styled.img<{
	$height?: number;
	$width?: number;
	$br?: number;
}>`
	height: ${(p) => p.$height ?? 18}px;
	width: ${(p) => p.$width ?? 18}px;
	min-height: 18px;
	min-width: 18px;
	text-indent: 0px;
	border-radius: ${(p) => p.$br ?? 0}px;
`;

export const ImgWithMargin = styled(Img)`
	margin-right: 8px;
`;

export const EventItemNameDate = styled(FlexboxCol)`
	overflow: hidden;
	width: 100%;
	> a {
		font-size: 14px;
		padding: 0px;
		font-weight: 550;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		text-decoration: none;
		color: black;
	}
	> h6 {
		font-size: 13px;
		color: grey;
		margin: 0px;
		font-weight: normal;
		line-height: 15px;
	}
`;

export const EventItemContent = styled(FlexboxRow)`
	align-items: flex-start;
	margin-top: 10px;
	height: 100%;
	> h4 {
		padding: 0px;
		margin: 0;
		font-size: 14px;
		font-weight: normal;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
`;

export const EventItemFooter = styled(FlexboxRow)`
	justify-content: space-between;
	align-items: center;
	> h6 {
		font-size: 11px;
		font-weight: normal;
		padding: 0px;
		margin: 0;
	}
	> a {
		text-decoration: none;
		cursor: pointer;
	}
`;

export const FormHeader = styled.h4`
	font-size: 23px;
	font-weight: 550;
	color: black;
	margin: 0;
	text-align: center;
	padding: 30px 0 30px 0;
	&:after {
		content: "______";
		display: block;
		color: #868080;
	}
`;

export const FormContents = styled.form`
	display: flex;
	flex-direction: column;
	padding: 5px 40px;
`;

export const Info = styled.p`
	border: 1px solid #9cae9c;
	background-color: #9cae9c;
	width: 100%;
	font-size: 14px;
	color: #152515;
	padding: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
	border-radius: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ErrorMessage = styled.p`
	border: 1px solid #eac8c8;
	background-color: #eac8c8;
	font-size: 14px;
	color: #6c2f2f;
	margin-top: 10px;
	padding: 10px;
	margin-bottom: 10px;
	border-radius: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const InputLabel = styled.label`
	margin-right: 10px;
`;

export const FormSubmitButton = styled.button`
	margin: 10px 40px;
`;

export const SliderContents = styled.section`
	overflow: hidden;
	padding-bottom: 20px;
`;

export const InnerSlider = styled(FlexboxRow)<{ $translate: number }>`
	padding: 0 20px 0 20px;
	transform: translateX(${(p) => p.$translate}px);
	transition: transform 0.5s ease-in-out;
`;
