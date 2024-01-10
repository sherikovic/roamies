import { Form, NavLink } from 'react-router-dom';
import { useState } from 'react';
import APIFormTextInputLabel from './APIFormTextInputLabel';
import classes from './APInfoForm.module.css';

const AccountSettingsForm: React.FC = () => {
    const [changeEmail, setChangeEmail] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    return (
        <div className={classes.api_form}>
            <p className={classes.api_form_header}>What would you like to change?</p>
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
                        setChangeEmail(!changeEmail);
                        setChangePassword(false)
                    }
                }
                    className={classes.api_form_btn_sel}
                >
                    Update my email address
                </button>
                <button onClick={
                    () => {
                        setChangePassword(!changePassword);
                        setChangeEmail(false);
                    }
                }
                    className={classes.api_form_btn_sel}
                >
                    Update my password
                </button>
            </div>
            {changeEmail &&
                <Form method='patch'>
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
                <Form method='patch'>
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
    );
};

export default AccountSettingsForm;