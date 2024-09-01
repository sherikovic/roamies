interface ErrorContentProps {
  title: string
  children?: React.ReactNode
}

const ErrorContent: React.FC<ErrorContentProps> = ({ title, children }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{title}</h1>
      <p>{children}</p>
    </div>
  )
}

export default ErrorContent
