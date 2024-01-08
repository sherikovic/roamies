import { Form } from 'react-router-dom';
import { useState } from 'react';
import APIFormTextInputLabel from './APIFormTextInputLabel';
import classes from './APInfoForm.module.css';

const AccountSettingsForm: React.FC = () => {
    const [changeEmail, setChangeEmail] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    return (
        <div className={classes.api_form}>
            <div >
                <p className={classes.api_form_header}>What would you like to change?</p>
                <div>
                    <button onClick={
                        () => {
                            setChangeEmail(!changeEmail);
                            setChangePassword(false)
                        }
                    }>
                        Update my email address
                    </button>
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
                            <div className={classes.btn_save}>
                                <button>Save</button>
                            </div>
                        </Form>
                    }
                    <button onClick={
                        () => {
                            setChangePassword(!changePassword);
                            setChangeEmail(false);
                        }
                    }>
                        Update my password
                    </button>
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
                            <div className={classes.btn_save}>
                                <button>Save</button>
                            </div>
                        </Form>
                    }
                </div>
            </div>
        </div >
    );
};

export default AccountSettingsForm;