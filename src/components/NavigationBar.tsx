import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "store/store";
import { actionCreators as authenticationActions } from "../store/actions/authentication-actions";
import { SearchBar, SearchBarProps } from "./SearchBar";
import logo from '../poke-logo.jpeg';

export interface NavigationBarProps extends SearchBarProps {
    
}

const NavigationBar: React.FC<NavigationBarProps> = (props: NavigationBarProps) => {

    const { handleSearchInputChange } = props;

    const location = useLocation();
    const isLoginPageActive = location.pathname === '/login';
    const isUserLoggedIn = useSelector((state: RootState) => state.authentication.isUserLoggedIn);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = (event: React.MouseEvent) => {
        event.preventDefault();
        dispatch(authenticationActions.thunkLogOut());
        navigate("/login");
    };
 
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
                        <Link to={"/pokemons"}>Pokemons</Link>
                        <Link to={"/my-pokemons"}>My Pokemons</Link>
                        <SearchBar handleSearchInputChange={handleSearchInputChange}/>
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