import classes from './PageHeader.module.css';

interface PageHeaderProps {
    headerText: String;
    children?: React.ReactNode;
};

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <div className={classes.header_frame}>
            <p className={classes.header_text}>{props.headerText}</p>
        </div>
    );
};

export default PageHeader;