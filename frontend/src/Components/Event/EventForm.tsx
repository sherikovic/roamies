import { useState } from "react";
import styled from "styled-components/macro";
import { FlexboxCol, FlexboxRow, XClose } from "util/common_styles";
import warningIcon from "../../images/warningicon.png";
import { Broadcast } from "types/broadcast";
import { createDBEntry, deleteDBEntry, updateDBEntry } from "util/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface NewEventProps {
  cancelHandler: () => void;
  eventData?: Broadcast;
  children?: React.ReactNode;
}

const EventForm: React.FC<NewEventProps> = ({ eventData, cancelHandler }) => {
  const fields = {
    rsvp: {
      val: eventData ? eventData.rsvp : 0,
      valid: true,
      errorMessage: "",
    },
    images: {
      val: "",
      valid: true,
      errorMessage: "",
    },
    description: {
      val: eventData ? eventData.description : "",
      valid: true,
      errorMessage: "Description can't be empty",
    },
    datetime: {
      val: "",
      valid: true,
      errorMessage: "Date can't be empty",
    },
    category: {
      val: eventData ? eventData.category : "",
      valid: true,
      errorMessage: "Category can't be empty",
    },
    location: {
      val: eventData ? eventData.location : "",
      valid: true,
      errorMessage: "Location can't be empty",
    },
    title: {
      val: eventData ? eventData.title : "",
      valid: true,
      errorMessage: "Title can't be empty",
    },
  };

  const [formInputs, setFormInputs] = useState(fields);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  // TODO: if no id exists, then it must be coming from the home page and
  // should be retrieved from the ongoing trip instead

  const tripId: string | null | undefined = location.pathname.includes("trips")
    ? params.id
    : null;

  const validateInputsForSubmit = () => {
    let isValid: boolean = true;
    Object.keys(formInputs).forEach((key: any) => {
      const input = formInputs[key];
      if (
        (key === "title" ||
          key === "location" ||
          key === "datetime" ||
          key === "description" ||
          key === "category") &&
        input.val === ""
      ) {
        isValid = false;
        setErrorMessage(input.errorMessage);
        setFormInputs((prev) => ({
          ...prev,
          [key]: { ...input, valid: false },
        }));
      }
    });
    return isValid;
  };

  const sendEventRequestToBE = async (mode: String, data?: Broadcast | any) => {
    let response: any;
    if (mode === "create") {
      response = await createDBEntry<Broadcast>("events", data);
    } else if (mode === "update") {
      response = await updateDBEntry<Broadcast>("events", eventData!._id, data);
    } else {
      response =
        window.confirm("Operation irreversable, are you sure?") &&
        (await deleteDBEntry<Broadcast>("events", eventData!._id));
    }
    if (response) {
      if (response.ok) {
        cancelHandler();
        mode === "create"
          ? location.pathname.includes("trips")
            ? window.location.reload()
            : navigate(`/events/${response.getJson.objects._id}`)
          : mode === "update"
          ? window.location.reload()
          : navigate("/events");
      } else {
        setErrorMessage(response.getJson);
      }
    }
  };

  const submitEventForm = (event: any, mode: String) => {
    event.preventDefault();
    if (mode === "create" || mode === "update") {
      let formData: Broadcast | any = Object.fromEntries(
        new FormData(document.forms[0] as HTMLFormElement).entries()
      );
      formData.trip = tripId || eventData!.trip._id;
      const isValid = validateInputsForSubmit();
      isValid && sendEventRequestToBE(mode, formData);
    } else {
      sendEventRequestToBE(mode);
    }
  };

  const inputOnChange = ({
    type,
    value,
  }: {
    type:
      | "title"
      | "location"
      | "category"
      | "datetime"
      | "description"
      | "rsvp"
      | "images";
    value: String;
  }) => {
    setFormInputs({
      ...formInputs,
      [type]: {
        ...formInputs[type],
        val: value,
        valid:
          (type === "title" ||
            type === "location" ||
            type === "datetime" ||
            type === "category") &&
          value === ""
            ? false
            : true,
      },
    });
  };

  return (
    <FlexboxCol>
      <EventFormHeader>Start a new event</EventFormHeader>
      <XClose type="button" onClick={cancelHandler} />
      <EventFormContents method="post">
        {errorMessage && (
          <Error>
            <Img src={warningIcon} alt="warning icon" />
            {errorMessage}
          </Error>
        )}
        <FlexboxRow style={{ marginBottom: "10px" }}>
          <Label htmlFor="title">Title:</Label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={formInputs.title.val}
            onChange={(e) => {
              inputOnChange({ type: "title", value: e.target.value });
            }}
          />
        </FlexboxRow>
        <FlexboxRow style={{ marginBottom: "10px" }}>
          <Label htmlFor="location">Location:</Label>
          <input
            type="text"
            name="location"
            id="location"
            defaultValue={formInputs.location.val}
            onChange={(e) => {
              inputOnChange({ type: "location", value: e.target.value });
            }}
          />
        </FlexboxRow>
        <FlexboxRow style={{ marginBottom: "10px" }}>
          <Label htmlFor="datetime">Date:</Label>
          <input
            type="datetime-local"
            name="datetime"
            id="datetime"
            // TODO update the value of the date and time when the date picker is finished
            onChange={(e) => {
              inputOnChange({ type: "datetime", value: e.target.value });
            }}
          />
        </FlexboxRow>
        <FlexboxRow style={{ marginBottom: "10px" }}>
          <Label htmlFor="description">Description:</Label>
          <textarea
            name="description"
            id="description"
            defaultValue={formInputs.description.val}
            cols={30}
            rows={3}
            onChange={(e) => {
              inputOnChange({ type: "description", value: e.target.value });
            }}
          />
        </FlexboxRow>
        <FlexboxRow style={{ marginBottom: "10px" }}>
          <Label htmlFor="category">Category:</Label>
          <input
            list="categories"
            name="category"
            defaultValue={formInputs.category.val}
            onChange={(e) => {
              inputOnChange({ type: "category", value: e.target.value });
            }}
          />
          <datalist id="categories">
            <option value="Nature" />
            <option value="Ride Share" />
            <option value="City Walks" />
            <option value="Tour" />
          </datalist>
        </FlexboxRow>
        <FlexboxRow style={{ marginBottom: "10px" }}>
          <Label htmlFor="rsvp">Rsvp:</Label>
          <input
            type="number"
            name="rsvp"
            min={0}
            id="rsvp"
            defaultValue={Number(formInputs.rsvp.val)}
            onChange={(e) => {
              inputOnChange({ type: "rsvp", value: e.target.value });
            }}
          />
        </FlexboxRow>
        <FlexboxRow style={{ marginBottom: "10px" }}>
          <Label htmlFor="images">Images:</Label>
          <input
            type="file"
            name="images"
            id="images"
            onChange={(e) => {
              inputOnChange({ type: "images", value: e.target.value });
            }}
          />
        </FlexboxRow>
        {location.pathname.includes("events") ? (
          <FlexboxRow>
            <Submit
              type="button"
              onClick={(event) => submitEventForm(event, "delete")}
            >
              Delete
            </Submit>
            <Submit
              type="button"
              onClick={(event) => submitEventForm(event, "update")}
            >
              Save
            </Submit>
          </FlexboxRow>
        ) : (
          <Submit
            type="button"
            onClick={(event) => submitEventForm(event, "create")}
          >
            Create
          </Submit>
        )}
      </EventFormContents>
    </FlexboxCol>
  );
};

export default EventForm;

const EventFormHeader = styled.h4`
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

const EventFormContents = styled.form`
  display: flex;
  flex-direction: column;
  padding: 5px 40px;
`;

const Label = styled.label`
  margin-right: 10px;
`;

const Submit = styled.button`
  margin: 10px 40px;
`;

const Img = styled.img`
  height: 18px;
  width: 18px;
  min-height: 18px;
  min-width: 18px;
  margin-right: 8px;
  text-indent: 0px;
`;

const Error = styled.p`
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
