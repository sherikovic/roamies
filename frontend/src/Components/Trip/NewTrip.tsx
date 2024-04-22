import styled from "styled-components";
import { XClose, FlexBoxRow } from "util/common_styles";

interface NewTripProps {
	cancelHandler: () => void;
	children?: React.ReactNode;
}

const NewTrip: React.FC<NewTripProps> = ({ cancelHandler }) => {
	const newTipSubmit = () => {};

	return (
		<TripForm method="post">
			<H4>Start a new trip</H4>
			<XClose type="button" onClick={cancelHandler} />
			<TripFormContents onSubmit={newTipSubmit}>
				<FlexBoxRow>
					<label htmlFor="title">Title:</label>
					<input type="text" name="title" id="title" />
				</FlexBoxRow>
				<FlexBoxRow>
					<label htmlFor="location">Location:</label>
					<input type="text" name="location" id="location" />
				</FlexBoxRow>
				<FlexBoxRow>
					<label htmlFor="description">Description:</label>
					<textarea name="description" id="description" cols={30} rows={3} />
				</FlexBoxRow>
				<FlexBoxRow>
					<label htmlFor="startdate">Start date:</label>
					<Date>
						<input type="date" name="startdate" id="startdate" />
					</Date>
				</FlexBoxRow>
				<FlexBoxRow>
					<label htmlFor="enddate">End date:</label>
					<Date>
						<input type="date" name="enddate" id="enddate" />
					</Date>
				</FlexBoxRow>
				<FlexBoxRow>
					<label htmlFor="images">Images:</label>
					<input type="file" name="images" id="images" />
				</FlexBoxRow>
				<Submit type="submit">Create</Submit>
			</TripFormContents>
		</TripForm>
	);
};

export default NewTrip;

const TripForm = styled.form`
	display: flex;
	flex-direction: column;
`;

const H4 = styled.h4`
	font-size: 23px;
	font-weight: 550;
	color: black;
	margin: 0;
	text-align: center;
	padding: 30px 0 30px 0;
	&:after {
		content: "______";
		display: block;
		/* transform: translateY(-15px); */
		color: #868080;
	}
`;

const TripFormContents = styled.form`
	display: flex;
	flex-direction: column;
	padding: 5px 40px;
`;

const Date = styled.div`
	display: flex;
`;

const Submit = styled.button`
	margin: 10px 40px;
`;
