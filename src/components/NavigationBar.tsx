import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "store/reducers/root-reducer";
import { actionCreators as authenticationActions } from "../store/actions/authentication-actions";

const NavigationBar = () => {
    const location = useLocation();
    const isLoginPageActive = location.pathname === '/login';
    const isUserLoggedIn = useSelector((state: RootState) => state.authentication.isUserLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = (event: React.MouseEvent) => {
        event.preventDefault();
        dispatch<any>(authenticationActions.thunkLogOut());
        navigate("/login");
    };


    return (
        <nav>
            <Link to={"/"}>@Poke</Link>
            {
                (!isUserLoggedIn && !isLoginPageActive) &&
                <Link to={"/login"}>Log in</Link>
            }
            {
                isUserLoggedIn &&
                <Link to={"/catchAndRelease"}>CatchAndRelease</Link>
            }
            {
                (isUserLoggedIn && !isLoginPageActive) &&
                <Link to={"/login"} onClick={(e) => handleLogOut(e)}>Log out</Link>
            }
        </nav>
    )
};

export default NavigationBar;