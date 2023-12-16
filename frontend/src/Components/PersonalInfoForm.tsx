import { Form, useActionData } from 'react-router-dom';
import PIFormTextInputLabel from './PIFormTextInputLabel';
import classes from './PersonalInfoForm.module.css';

const PersonalInfoForm: React.FC = () => {
    const data: any = useActionData();

    return (
        <Form method='post'>
            <div className={classes.pi_form}>
                <p className={classes.pi_form_header}>Update your personal information</p>
                {data && data.name &&
                    <p style={{ color: 'orange' }}>{data.name}</p>
                }
                <PIFormTextInputLabel
                    name='full name'
                    classDiv={classes.pi_form_item}
                    classInput={classes.pi_input_field}
                    classLabel={classes.pi_input_label}
                />
                <div className={classes.pi_form_group_cc}>
                    <PIFormTextInputLabel
                        name='city'
                        classDiv={classes.pi_form_item}
                        classInput={classes.pi_input_field}
                        classLabel={classes.pi_input_label}
                    />
                    <PIFormTextInputLabel
                        name='country'
                        classDiv={classes.pi_form_item}
                        classInput={classes.pi_input_field}
                        classLabel={classes.pi_input_label}
                    />
                </div>
                <div className={classes.pi_form_group_cc}>
                    <PIFormTextInputLabel
                        name='github'
                        classDiv={classes.pi_form_item}
                        classInput={classes.pi_input_field}
                        classLabel={classes.pi_input_label}
                    />
                    <PIFormTextInputLabel
                        name='linkedin'
                        classDiv={classes.pi_form_item}
                        classInput={classes.pi_input_field}
                        classLabel={classes.pi_input_label}
                    />
                </div>
                <div className={classes.btn_save}>
                    <button>Save</button>
                </div>
            </div>
        </Form>
    );
};

export default PersonalInfoForm;