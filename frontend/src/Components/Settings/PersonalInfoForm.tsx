import { Form, useActionData } from "react-router-dom";
import APIFormTextInputLabel from "./APIFormTextInputLabel";
import classes from "./APInfoForm.module.css";
import { User } from "types/user";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "util/auth-context";
import { FlexboxRow } from "util/common_styles";

interface PersonalInfoFormProps {
  children?: React.ReactNode;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = (props) => {
  const data: any = useActionData();
  const userContext = useContext(AuthContext);
  const userData = userContext.userInfo as User;
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data && data.ok) {
      const updateUser = userContext.updateUserInfo;
      updateUser(data.data, userData);
    }
  }, [data]);

  return (
    <Form method="patch">
      <div className={classes.api_form}>
        <p className={classes.api_form_header}>
          Update your personal information
        </p>
        <FlexboxRow>
          <button
            onClick={() => fileInput.current && fileInput.current.click()}
          >
            Upload image
          </button>
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            ref={fileInput}
          />
        </FlexboxRow>
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
        <div className={classes.api_form_group_cc}>
          <APIFormTextInputLabel
            type="text"
            name="first name"
            value={userData ? userData.firstname : ""}
            classDiv={classes.api_form_item}
            classInput={classes.api_input_field}
            classLabel={classes.api_input_label}
          />
          <APIFormTextInputLabel
            type="text"
            name="last name"
            value={userData ? userData.lastname : ""}
            classDiv={classes.api_form_item}
            classInput={classes.api_input_field}
            classLabel={classes.api_input_label}
          />
        </div>
        <div className={classes.api_form_group_cc}>
          <APIFormTextInputLabel
            type="text"
            name="age"
            value={userData ? userData.age : ""}
            classDiv={classes.api_form_item}
            classInput={classes.api_input_field}
            classLabel={classes.api_input_label}
          />
          <APIFormTextInputLabel
            type="text"
            name="country"
            value={userData ? userData.country : ""}
            classDiv={classes.api_form_item}
            classInput={classes.api_input_field}
            classLabel={classes.api_input_label}
          />
        </div>
        <APIFormTextInputLabel
          type="textarea"
          name="bio"
          value={userData ? userData.bio : ""}
          classDiv={classes.api_form_item}
          classInput={classes.api_input_field}
          classLabel={classes.api_input_label}
        />
        <p className={classes.api_form_header}>Socials</p>
        <div className={classes.api_form_group_cc}>
          <APIFormTextInputLabel
            type="text"
            name="instagram"
            value={userData ? userData.social?.instagram : ""}
            classDiv={classes.api_form_item}
            classInput={classes.api_input_field}
            classLabel={classes.api_input_label}
          />
          <APIFormTextInputLabel
            type="text"
            name="twitter"
            value={userData ? userData.social?.twitter : ""}
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
