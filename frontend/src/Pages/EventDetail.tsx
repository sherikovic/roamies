import EventForm from "Components/Event/EventForm";
import { useRef, useState } from "react";
import { LoaderFunction, json, useRouteLoaderData } from "react-router-dom";
import { Broadcast } from "types/broadcast";
import { createDBEntry, getDBEntry, updateDBEntry } from "util/api";
import {
	CardOverlay,
	FlexboxCol,
	FlexboxRow,
	OverlayContent,
} from "util/common_styles";
import { useUser } from "util/auth-context";
import { User } from "types/user";
import { Comment } from "types/comment";

const EventDetailPage: React.FC = () => {
	const eventData = useRouteLoaderData("event-detail") as Broadcast;
	const [showEventForm, setShowEventForm] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const user = useUser() as User;
	const commentTextRef = useRef<HTMLTextAreaElement>(null);

	const joinEvent = async () => {
		if (user) {
			eventData.participants.push(user);
			const response = await updateDBEntry<Broadcast>(
				"events",
				eventData._id,
				eventData
			);
			response.ok && window.location.reload();
		}
	};

	const leaveEvent = async () => {
		if (user) {
			const idx = eventData.participants.indexOf(user);
			eventData.participants.splice(idx, 1);
			const response = await updateDBEntry<Broadcast>(
				"events",
				eventData._id,
				eventData
			);
			response.ok && window.location.reload();
		}
	};

	const displayListOfParticipants = () => {
		console.log(eventData.participants);
		// create a dropdown list with nice transitioning, profile pic and name as a link to the profile
	};

	const postComment = async (event: any) => {
		event.preventDefault();
		const commentText = commentTextRef.current
			? commentTextRef.current.value
			: "";
		const response = await createDBEntry<Comment>("comments", {
			text: commentText,
			owner: user._id,
			event: eventData._id,
		});
		response.ok
			? window.location.reload()
			: setErrorMessage(response.getJson.message);
	};

	return (
		<FlexboxCol>
			<FlexboxRow style={{ justifyContent: "space-between" }}>
				<h1>{eventData.title}</h1>
				{/* TODO refer to the profile of that user, edit the be to receive user id */}
				<p>
					<a href="/profile">{eventData.owner.firstname}</a> is organizing this
					event
				</p>
			</FlexboxRow>
			<FlexboxRow style={{ justifyContent: "space-between" }}>
				{eventData.description}
				<button onClick={() => setShowEventForm(true)}>Edit</button>
			</FlexboxRow>
			<FlexboxRow
				style={{ justifyContent: "space-between", marginTop: "20px" }}
			>
				{`Participants: ${
					eventData.participants.length
				}/${eventData.rsvp.toString()}`}
				<button onClick={displayListOfParticipants}>
					Show me who's coming
				</button>
				{eventData.owner._id !== user?._id &&
					(eventData.participants.find((user) => user._id === user?._id) ? (
						<button onClick={leaveEvent}>Leave</button>
					) : (
						<button
							disabled={eventData.participants.length === eventData.rsvp}
							onClick={joinEvent}
						>
							Join
						</button>
					))}
			</FlexboxRow>
			<h3>Comments</h3>
			{errorMessage && <p style={{ color: "orange" }}>{errorMessage}</p>}
			<FlexboxCol style={{ margin: "20px" }}>
				<p>Add a comment</p>
				<textarea
					name="comment"
					id="comment"
					cols={30}
					rows={10}
					ref={commentTextRef}
				/>
				<FlexboxRow style={{ justifyContent: "flex-end" }}>
					<button type="submit" onClick={postComment}>
						Post
					</button>
				</FlexboxRow>
				{eventData.comments.map((comment) => (
					<FlexboxRow
						style={{
							// justifyContent: "space-around",
							marginBottom: "20px",
							border: "1px solid gray",
							gap: "20px",
						}}
						key={comment._id}
					>
						<a href="#">{comment.owner.firstname}</a>
						<p style={{ margin: "0" }}>{comment.text}</p>
						{/* <button onClick={() => setEditComment(true)}>Edit</button> */}
					</FlexboxRow>
				))}
			</FlexboxCol>
			<h3>Related trip</h3>
			{eventData?.trip ? (
				<a href={`/trips/${eventData.trip._id}`}>{eventData.trip.title}</a>
			) : (
				<h6>No related trips</h6>
			)}
			{showEventForm && (
				<CardOverlay>
					<OverlayContent>
						<EventForm
							eventData={eventData}
							cancelHandler={() => setShowEventForm(false)}
						/>
					</OverlayContent>
				</CardOverlay>
			)}
		</FlexboxCol>
	);
};

export default EventDetailPage;

export const loader: LoaderFunction = async ({ params }) => {
	const id: any = params.id;
	const response = await getDBEntry<Broadcast>("events", id);
	if (response.ok) {
		return response.getJson.objects;
	} else {
		throw json(
			{ title: response.getJson.message, message: response.getJson.error },
			{ status: 500 }
		);
	}
};
