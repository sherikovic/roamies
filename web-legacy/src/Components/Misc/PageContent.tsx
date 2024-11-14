import classes from './PageContent.module.css'

interface PageContentProps {
  headerText: string
  children?: React.ReactNode
}

const PageContent: React.FC<PageContentProps> = ({ headerText, children }) => {
  return (
    <div className={classes.header_frame}>
      <p className={classes.header_text}>{headerText}</p>
      <p className={classes.header_content}>{children}</p>
    </div>
  )
}

export default PageContent
