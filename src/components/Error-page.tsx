interface ErrorPageProps {
    message: string;
}
const ErrorPage = (props: ErrorPageProps) => {

    return (
        <div className={"error-page"}>{props.message}</div>
    )
};

export default ErrorPage;