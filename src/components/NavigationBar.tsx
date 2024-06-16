import { Link, NavLink, useLocation } from "react-router-dom";

const NavigationBar = () => {
    const location = useLocation();


    return (
        <nav>
            <Link to={"/"}>@Poke</Link>
            {
                location.pathname !== "/login" &&
                <Link to={"/login"}>Log in</Link>
            }
        </nav>
    )
};

export default NavigationBar;