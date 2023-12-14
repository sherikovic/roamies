import PIFormTextInput from './PIFormTextInput';
import classes from './PersonalInfoForm.module.css';

const PersonalInfoForm: React.FC = () => {
    return (
        <div className={classes.pi_form}>
            <p className={classes.pi_form_header}>Update your personal information</p>
            <PIFormTextInput
                name='full name'
                CN_div={classes.pi_form_item}
                CN_input={classes.pi_input_field}
                CN_label={classes.pi_input_label}
            />
            <div className={classes.pi_form_group_cc}>
                <PIFormTextInput
                    name='city'
                    CN_div={classes.pi_form_item}
                    CN_input={classes.pi_input_field}
                    CN_label={classes.pi_input_label}
                />
                <PIFormTextInput
                    name='country'
                    CN_div={classes.pi_form_item}
                    CN_input={classes.pi_input_field}
                    CN_label={classes.pi_input_label}
                />
            </div>
            <div className={classes.pi_form_group_cc}>
                <PIFormTextInput
                    name='github'
                    CN_div={classes.pi_form_item}
                    CN_input={classes.pi_input_field}
                    CN_label={classes.pi_input_label}
                />
                <PIFormTextInput
                    name='linkedin'
                    CN_div={classes.pi_form_item}
                    CN_input={classes.pi_input_field}
                    CN_label={classes.pi_input_label}
                />
            </div>
        </div>
    );
};

export default PersonalInfoForm;