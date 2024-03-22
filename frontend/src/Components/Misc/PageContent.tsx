import classes from "./PageContent.module.css";

interface PageContentProps {
	headerText: String;
	children?: React.ReactNode;
}

const PageContent: React.FC<PageContentProps> = (props) => {
	return (
		<div className={classes.header_frame}>
			<p className={classes.header_text}>{props.headerText}</p>
			<p className={classes.header_content}>{props.children}</p>
		</div>
	);
};

export default PageContent;
