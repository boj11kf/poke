

interface ErrorPageProps {
    message: string;
}

/*  Ha nem routolhato url-t adunk meg, akkor ez jelenik meg */
const ErrorPage = (props: ErrorPageProps) => {

    return (
        <div className={"error-page"}>{props.message}</div>
    )
};

export default ErrorPage;