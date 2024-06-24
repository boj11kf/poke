import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "store/store";
import { actionCreators as authenticationActions } from "../store/actions/authentication-actions";
import { SearchBar, SearchBarProps } from "./SearchBar";
import logo from '../poke-logo.png';

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
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <img src={logo} width="40" height="40" className="d-inline-block align-top" alt="" />
                <a className="navbar-brand" href="/">Poke App</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        {
                            (!isUserLoggedIn && !isLoginPageActive) &&
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                        }
                        {
                            isUserLoggedIn &&
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/pokemons">Pokemons</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/my-pokemons">My Pokemons</a>
                                </li>
                            </>
                        }

                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => handleSearchInputChange(e.target.value)}/>
                    </form>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        {
                            (isUserLoggedIn && !isLoginPageActive) &&
                            <li className="nav-item" onClick={handleLogOut}>
                                <a className="nav-link" href="/login">Log Out</a>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default NavigationBar;