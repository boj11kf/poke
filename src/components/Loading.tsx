import {HashLoader} from "react-spinners";
import {CSSProperties, useEffect, useState} from "react";
import {createPortal} from "react-dom";

const override: CSSProperties = {
    display: "block",
};

const containerStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
}
export const Loading = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);


    return (
        createPortal(
            <div className={"loading-container"} style={containerStyle}>
                <HashLoader
                    color={"#9EE8E1"}
                    loading={isLoading}
                    cssOverride={override}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
            ,
            document.body
        )
    );
};
