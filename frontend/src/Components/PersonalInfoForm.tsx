import classes from './PersonalInfoForm.module.css';

const PersonalInfoForm: React.FC = () => {
    return (
        <div className={classes.form}>
            <button>Personal Information</button>
            <div>
                <div>
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" name="fullname" id="fullname" />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" id="city" />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" name="country" id="country" />
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoForm;