import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { RootState } from "store/reducers/root-reducer";
import { actionCreators as authenticationActions } from "../store/actions/authentication-actions";

const NavigationBar = () => {
    const location = useLocation();
    const isLoginPageActive = location.pathname === 'login';
    const isUserLoggedIn = useSelector((state: RootState) => state.authentication.isUserLoggedIn);
    const dispatch = useDispatch();

    const handleLogOut = (event: React.MouseEvent) => {
        event.preventDefault();
        dispatch<any>(authenticationActions.thunkLogOut());
    };


    return (
        <nav>
            <Link to={"/"}>@Poke</Link>
            {
                location.pathname !== "/login" &&
                <Link to={"/login"}>Log in</Link>
            }
            {
                (isUserLoggedIn && !isLoginPageActive) &&
                <Link to={"/login"} onClick={(e) => handleLogOut(e)}>Log out</Link>
            }
        </nav>
    )
};

export default NavigationBar;