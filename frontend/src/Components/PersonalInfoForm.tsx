import { Form, useActionData } from "react-router-dom";
import APIFormTextInputLabel from "./APIFormTextInputLabel";
import classes from "./APInfoForm.module.css";
import ElementModel from "../models/element";

interface PersonalInfoFormProps {
  userData: ElementModel;
  children?: React.ReactNode;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = (props) => {
  const data: any = useActionData();
  const userInfo = props.userData;

  return (
    <Form method="patch">
      <div className={classes.api_form}>
        <p className={classes.api_form_header}>
          Update your personal information
        </p>
        {data && data.errorMessage && data.type === "personal" && (
          <p className={classes.api_form_header} style={{ color: "orange" }}>
            {data.errorMessage}
          </p>
        )}
        {data && data.successMessage && data.type === "personal" && (
          <p className={classes.api_form_header} style={{ color: "green" }}>
            {data.successMessage}
          </p>
        )}
        <APIFormTextInputLabel
          type="text"
          name="full name"
          value={props.userData ? userInfo.fullname : ""}
          classDiv={classes.api_form_item}
          classInput={classes.api_input_field}
          classLabel={classes.api_input_label}
        />
        <div className={classes.api_form_group_cc}>
          <APIFormTextInputLabel
            type="text"
            name="city"
            value={props.userData ? userInfo.city : ""}
            classDiv={classes.api_form_item}
            classInput={classes.api_input_field}
            classLabel={classes.api_input_label}
          />
          <APIFormTextInputLabel
            type="text"
            name="country"
            value={props.userData ? userInfo.country : ""}
            classDiv={classes.api_form_item}
            classInput={classes.api_input_field}
            classLabel={classes.api_input_label}
          />
        </div>
        <div className={classes.api_form_group_cc}>
          <APIFormTextInputLabel
            type="text"
            name="github"
            value={props.userData ? userInfo.github : ""}
            classDiv={classes.api_form_item}
            classInput={classes.api_input_field}
            classLabel={classes.api_input_label}
          />
          <APIFormTextInputLabel
            type="text"
            name="linkedin"
            value={props.userData ? userInfo.linkedin : ""}
            classDiv={classes.api_form_item}
            classInput={classes.api_input_field}
            classLabel={classes.api_input_label}
          />
        </div>
        <div className={classes.api_btn_save}>
          <button name={"personal"}>Save</button>
        </div>
      </div>
    </Form>
  );
};

export default PersonalInfoForm;
