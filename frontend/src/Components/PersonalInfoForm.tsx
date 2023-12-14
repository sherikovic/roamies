import PIFormTextInput from './PIFormTextInput';
import classes from './PersonalInfoForm.module.css';

const PersonalInfoForm: React.FC = () => {
    return (
        <div className={classes.pi_form}>
            <p className={classes.pi_form_header}>Update your personal information</p>
            <PIFormTextInput name='full name' />
            <div className={classes.pi_form_group_cc}>
                <PIFormTextInput name='city' />
                <PIFormTextInput name='country' />
            </div>
            <div className={classes.pi_form_group_cc}>
                <PIFormTextInput name='github' />
                <PIFormTextInput name='linkedin' />
            </div>
        </div>
    );
};

export default PersonalInfoForm;