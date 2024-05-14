import { Form, useActionData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import APIFormTextInputLabel from "./APIFormTextInputLabel";
import classes from "./APInfoForm.module.css";
import { AuthContext } from "util/auth-context";
import { User } from "types/user";

const AccountSettingsForm: React.FC = () => {
  const [changeEmail, setChangeEmail] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
  const data: any = useActionData();

  const userContext = useContext(AuthContext);
  const userData = userContext.userInfo as User;

  useEffect(() => {
    if (data && data.ok) {
      const updateUser = userContext.updateUserInfo;
      console.log("data", data);
      const email = data.data.newEmail ?? userData.email;
      const password = data.data.newPassword ?? userData.password;
      updateUser({ email, password }, userData);
    }
  }, [data]);

  return (
    <div className={classes.api_form}>
      <p className={classes.api_form_header}>What would you like to change?</p>
      {data &&
        data.errorMessage &&
        ((changeEmail && data.type === "email") ||
          (changePassword && data.type === "password")) && (
          <p className={classes.api_form_header} style={{ color: "orange" }}>
            {data.errorMessage}
          </p>
        )}
      {data &&
        data.successMessage &&
        ((changeEmail && data.type === "email") ||
          (changePassword && data.type === "password")) && (
          <p className={classes.api_form_header} style={{ color: "green" }}>
            {data.successMessage}
          </p>
        )}
      <div className={classes.api_form_container}>
        <div className={classes.api_form_btns_sel}>
          <button
            onClick={() => {
              changePassword && setChangeEmail(true);
              setChangePassword(false);
            }}
            className={`${classes.api_form_btn_sel} ${
              changeEmail && classes.selected
            }`}
          >
            Update Email Address
          </button>
          <button
            onClick={() => {
              changeEmail && setChangePassword(true);
              setChangeEmail(false);
            }}
            className={`${classes.api_form_btn_sel} ${
              changePassword && classes.selected
            }`}
          >
            Update Password
          </button>
        </div>
        {changeEmail && (
          <Form method="patch" className={classes.api_form_fr}>
            <APIFormTextInputLabel
              type="email"
              name="old Email"
              value=""
              classDiv={classes.api_form_item}
              classInput={classes.api_input_field}
              classLabel={classes.api_input_label}
            />
            <APIFormTextInputLabel
              type="email"
              name="new Email"
              value=""
              classDiv={classes.api_form_item}
              classInput={classes.api_input_field}
              classLabel={classes.api_input_label}
            />
            <APIFormTextInputLabel
              type="email"
              name="confirm New Email"
              value=""
              classDiv={classes.api_form_item}
              classInput={classes.api_input_field}
              classLabel={classes.api_input_label}
            />
            <div className={classes.api_btn_save}>
              <button name={"accountEmail"}>Save</button>
            </div>
          </Form>
        )}
        {changePassword && (
          <Form method="patch" className={classes.api_form_fr}>
            <APIFormTextInputLabel
              type="password"
              name="old Password"
              value=""
              classDiv={classes.api_form_item}
              classInput={classes.api_input_field}
              classLabel={classes.api_input_label}
            />
            <APIFormTextInputLabel
              type="password"
              name="new Password"
              value=""
              classDiv={classes.api_form_item}
              classInput={classes.api_input_field}
              classLabel={classes.api_input_label}
            />
            <APIFormTextInputLabel
              type="password"
              name="confirm New Password"
              value=""
              classDiv={classes.api_form_item}
              classInput={classes.api_input_field}
              classLabel={classes.api_input_label}
            />
            <div className={classes.api_btn_save}>
              <button name={"accountPassword"}>Save</button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default AccountSettingsForm;
