import { useState } from "react";
import styled from "styled-components/macro";
import { Trip } from "types/trip";
import { createDBEntry, deleteDBEntry, updateDBEntry } from "util/api";
import { XClose, FlexboxRow, FlexboxCol } from "util/common_styles";
import warningIcon from "../../images/warningicon.png";
import { useLocation, useNavigate } from "react-router-dom";

interface TripFormProps {
  cancelHandler: () => void;
  tripData?: Trip;
  children?: React.ReactNode;
}

const TripForm: React.FC<TripFormProps> = ({ tripData, cancelHandler }) => {
  const fields = {
    images: {
      val: "",
      valid: true,
      errorMessage: "",
    },
    endDate: {
      val: "",
      valid: true,
      errorMessage: "",
    },
    startDate: {
      val: "",
      valid: true,
      errorMessage: "Start date can't be empty",
    },
    description: {
      val: tripData ? tripData.description : "",
      valid: true,
      errorMessage: "",
    },
    location: {
      val: tripData ? tripData.location : "",
      valid: true,
      errorMessage: "Location can't be empty",
    },
    title: {
      val: tripData ? tripData.title : "",
      valid: true,
      errorMessage: "Title can't be empty",
    },
  };

  const [formInputs, setFormInputs] = useState(fields);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const validateInputsForSubmit = () => {
    let isValid: boolean = true;
    Object.keys(formInputs).forEach((key: any) => {
      const input = formInputs[key];
      if (
        (key === "title" || key === "location" || key === "startDate") &&
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

  const sendEventRequestToBE = async (mode: String, data?: Trip | any) => {
    let response: any;
    if (mode === "create") {
      response = await createDBEntry<Trip>("trips", data);
    } else if (mode === "update") {
      response = await updateDBEntry<Trip>("trips", tripData!._id, data);
    } else {
      response =
        window.confirm("Operation irreversable, are you sure?") &&
        (await deleteDBEntry<Trip>("trips", tripData!._id));
    }
    if (response) {
      if (response.ok) {
        cancelHandler();
        mode === "create"
          ? navigate(`/trips/${response.getJson.objects._id}`)
          : mode === "update"
          ? window.location.reload()
          : navigate("/home");
      } else {
        setErrorMessage(response.getJson.error);
      }
    }
  };

  const submitTripForm = (event: any, mode: String) => {
    event.preventDefault();
    if (mode === "create" || mode === "update") {
      let formData: Trip | any = Object.fromEntries(
        new FormData(document.forms[0] as HTMLFormElement).entries()
      );
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
      | "description"
      | "startDate"
      | "endDate"
      | "images";
    value: String;
  }) => {
    setFormInputs({
      ...formInputs,
      [type]: {
        ...formInputs[type],
        val: value,
        valid:
          (type === "title" || type === "location" || type === "startDate") &&
          value === ""
            ? false
            : true,
      },
    });
  };

  return (
    <FlexboxCol>
      <TripFormHeader>Start a new trip</TripFormHeader>
      <XClose type="button" onClick={cancelHandler} />
      <TripFormContents method="post">
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
          <Label htmlFor="startDate">Start date:</Label>
          <FlexboxRow>
            <input
              type="date"
              name="startDate"
              id="startDate"
              onChange={(e) => {
                inputOnChange({ type: "startDate", value: e.target.value });
              }}
            />
          </FlexboxRow>
        </FlexboxRow>
        <FlexboxRow style={{ marginBottom: "10px" }}>
          <Label htmlFor="endDate">End date:</Label>
          <FlexboxRow>
            <input
              type="date"
              name="endDate"
              id="endDate"
              onChange={(e) => {
                inputOnChange({ type: "endDate", value: e.target.value });
              }}
            />
          </FlexboxRow>
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
        {location.pathname.includes("trips") ? (
          <FlexboxRow>
            <Submit
              type="button"
              onClick={(event) => submitTripForm(event, "delete")}
            >
              Delete
            </Submit>
            <Submit
              type="button"
              onClick={(event) => submitTripForm(event, "update")}
            >
              Save
            </Submit>
          </FlexboxRow>
        ) : (
          <Submit
            type="button"
            onClick={(event) => submitTripForm(event, "create")}
          >
            Create
          </Submit>
        )}
      </TripFormContents>
    </FlexboxCol>
  );
};

export default TripForm;

const TripFormHeader = styled.h4`
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

const TripFormContents = styled.form`
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
