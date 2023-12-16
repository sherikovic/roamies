import { Form, useActionData } from 'react-router-dom';
import PIFormTextInputLabel from './PIFormTextInputLabel';
import classes from './PersonalInfoForm.module.css';
import ElementModel from '../models/element';

interface PersonalInfoFormProps {
    userData: ElementModel;
    children?: React.ReactNode;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = (props) => {
    const data: any = useActionData();
    const userInfo = props.userData;

    return (
        <Form method='patch'>
            <div className={classes.pi_form}>
                <p className={classes.pi_form_header}>Update your personal information</p>
                {data && data.fullname &&
                    <p style={{ color: 'orange' }}>{data.fullname}</p>
                }
                <PIFormTextInputLabel
                    name='full name'
                    value={props.userData ? userInfo.fullname : ''}
                    classDiv={classes.pi_form_item}
                    classInput={classes.pi_input_field}
                    classLabel={classes.pi_input_label}
                />
                <div className={classes.pi_form_group_cc}>
                    <PIFormTextInputLabel
                        name='city'
                        value={props.userData ? userInfo.city : ''}
                        classDiv={classes.pi_form_item}
                        classInput={classes.pi_input_field}
                        classLabel={classes.pi_input_label}
                    />
                    <PIFormTextInputLabel
                        name='country'
                        value={props.userData ? userInfo.country : ''}
                        classDiv={classes.pi_form_item}
                        classInput={classes.pi_input_field}
                        classLabel={classes.pi_input_label}
                    />
                </div>
                <div className={classes.pi_form_group_cc}>
                    <PIFormTextInputLabel
                        name='github'
                        value={props.userData ? userInfo.github : ''}
                        classDiv={classes.pi_form_item}
                        classInput={classes.pi_input_field}
                        classLabel={classes.pi_input_label}
                    />
                    <PIFormTextInputLabel
                        name='linkedin'
                        value={props.userData ? userInfo.linkedin : ''}
                        classDiv={classes.pi_form_item}
                        classInput={classes.pi_input_field}
                        classLabel={classes.pi_input_label}
                    />
                </div>
                <div className={classes.btn_save}>
                    <button name={'personal'}>Save</button>
                </div>
            </div>
        </Form >
    );
};

export default PersonalInfoForm;