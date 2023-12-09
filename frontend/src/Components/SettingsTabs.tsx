import { useState } from "react";
import AccountSettingsForm from "./AccountSettingsForm";
import PersonalInfoForm from "./PersonalInfoForm";
import classes from './SettingsTabs.module.css';

const SettingsTabs: React.FC = () => {
    const [toggleTab, setToggleTab] = useState(1);

    function toggleTabHandler(index: number): void {
        setToggleTab(index);
    }

    return (
        <div className={classes.tabs_container}>
            <div className={classes.bloc_tabs}>
                <div className={`${classes.tab_indicator} ${toggleTab === 2 && classes.tab_indicator_2}`} />
                <button
                    onClick={() => toggleTabHandler(1)}
                    className={`${classes.tab} ${toggleTab === 1 && classes.active_tab}`}
                >
                    Personal Information
                </button>
                <button
                    onClick={() => toggleTabHandler(2)}
                    className={`${classes.tab} ${classes.tab_2} ${toggleTab === 2 && classes.active_tab}`}
                >
                    Account Settings
                </button>
            </div>
            <div className={classes.content}>
                {toggleTab === 1 && <PersonalInfoForm />}
                {toggleTab === 2 && <AccountSettingsForm />}
            </div>
        </div >

    );
};

export default SettingsTabs;
