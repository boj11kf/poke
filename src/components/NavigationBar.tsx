import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "store/reducers/root-reducer";
import { actionCreators as authenticationActions } from "../store/actions/authentication-actions";
import logo from '../poke-logo.jpeg';

const NavigationBar = () => {
    const location = useLocation();
    const isLoginPageActive = location.pathname === '/login';
    const isUserLoggedIn = useSelector((state: RootState) => state.authenticationState?.isUserLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = (event: React.MouseEvent) => {
        event.preventDefault();
        dispatch<any>(authenticationActions.thunkLogOut());
        navigate("/login");
    };
    <a className="navbar-brand poke-nav" href="#">

    </a>

    return (
        <nav>
            <Link to={"/"}>
                <img src={logo} width="40" height="40" className="d-inline-block align-top" alt="" />&nbsp;
                Poke App
            </Link>
            {
                (!isUserLoggedIn && !isLoginPageActive) &&
                <Link to={"/login"}>Log in</Link>
            }
            {
                isUserLoggedIn &&
                (
                    <>
                        <Link to={"/catchAndRelease"}>CatchAndRelease</Link>
                        <Link to={"/myPokemonList"}>MyPokemonList</Link>
                    </>
                )
            }
            {
                (isUserLoggedIn && !isLoginPageActive) &&
                <Link to={"/login"} onClick={(e) => handleLogOut(e)}>Log out</Link>
            }
        </nav>
    )
};

export default NavigationBar;