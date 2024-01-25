import { Form, NavLink } from 'react-router-dom';
import { useState } from 'react';
import APIFormTextInputLabel from './APIFormTextInputLabel';
import classes from './APInfoForm.module.css';

const AccountSettingsForm: React.FC = () => {
    const [changeEmail, setChangeEmail] = useState(true);
    const [changePassword, setChangePassword] = useState(false);

    return (
        <div className={classes.api_form}>
            <p className={classes.api_form_header}>What would you like to change?</p>
            <div className={classes.api_form_container}>
                <div className={classes.api_form_btns_sel}>
                    {/* <NavLink
                        to="#"
                        className={({ isActive }) =>
                        isActive ?
                        `${classes.listitem} ${classes.listitem_active}` : classes.listitem}
                        >
                        Update my email address
                    </NavLink> */}
                    <button onClick={
                        () => {
                            changePassword && setChangeEmail(true);
                            setChangePassword(false)
                        }
                    }
                    className={classes.api_form_btn_sel}
                    >
                        Update Email Address
                    </button>
                    <button onClick={
                        () => {
                            changeEmail && setChangePassword(true);
                            setChangeEmail(false)
                        }
                    }
                    className={classes.api_form_btn_sel}
                    >
                        Update Password
                    </button>
                </div>
                {changeEmail &&
                    <Form method='patch' className={classes.api_form_fr}>
                        <APIFormTextInputLabel
                            type='email'
                            name='old Email'
                            value=''
                            classDiv={classes.api_form_item}
                            classInput={classes.api_input_field}
                            classLabel={classes.api_input_label}
                        />
                        <APIFormTextInputLabel
                            type='email'
                            name='new Email'
                            value=''
                            classDiv={classes.api_form_item}
                            classInput={classes.api_input_field}
                            classLabel={classes.api_input_label}
                        />
                        <APIFormTextInputLabel
                            type='email'
                            name='confirm New Email'
                            value=''
                            classDiv={classes.api_form_item}
                            classInput={classes.api_input_field}
                            classLabel={classes.api_input_label}
                        />
                        <div className={classes.api_btn_save}>
                            <button>Save</button>
                        </div>
                    </Form>
                }
                {changePassword &&
                    <Form method='patch' className={classes.api_form_fr}>
                        <APIFormTextInputLabel
                            type='password'
                            name='old Password'
                            value=''
                            classDiv={classes.api_form_item}
                            classInput={classes.api_input_field}
                            classLabel={classes.api_input_label}
                        />
                        <APIFormTextInputLabel
                            type='password'
                            name='new Password'
                            value=''
                            classDiv={classes.api_form_item}
                            classInput={classes.api_input_field}
                            classLabel={classes.api_input_label}
                        />
                        <APIFormTextInputLabel
                            type='password'
                            name='confirm New Password'
                            value=''
                            classDiv={classes.api_form_item}
                            classInput={classes.api_input_field}
                            classLabel={classes.api_input_label}
                        />
                        <div className={classes.api_btn_save}>
                            <button>Save</button>
                        </div>
                    </Form>
                }
            </div>
        </div>
    );
};

export default AccountSettingsForm;
