import styled from "styled-components";

interface NewEventProps {
	cancelHandler: () => void;
	children?: React.ReactNode;
}

const NewEvent: React.FC<NewEventProps> = ({ cancelHandler }) => {
	return (
		<Form method="post">
			<H4>Start a new event</H4>
			<XClose type="button" onClick={cancelHandler} />
			<FormContents></FormContents>
		</Form>
	);
};

export default NewEvent;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	max-width: 40rem;
`;

const H4 = styled.h4`
	font-size: 23px;
	font-weight: 550;
	color: black;
	margin: 0;
	text-align: center;
	padding-bottom: 30px;
	&:after {
		content: "______";
		display: block;
		/* transform: translateY(-15px); */
		color: #868080;
	}
`;

const XClose = styled.button`
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

const FormContents = styled.div`
	padding: 5px 40px;
`;
