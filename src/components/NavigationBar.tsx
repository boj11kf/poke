import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "store/store";
import { actionCreators as authenticationActions } from "../store/actions/authentication-actions";
import { SearchBar, SearchBarProps } from "./SearchBar";
import logo from '../poke-logo.png';
import { useState } from "react";

export interface NavigationBarProps extends SearchBarProps {

}

const NavigationBar: React.FC<NavigationBarProps> = (props: NavigationBarProps) => {

    const { handleSearchInputChange } = props;

    const location = useLocation();
    const isLoginPageActive = location.pathname === '/login';
    const isUserLoggedIn = useSelector((state: RootState) => state.authentication.isUserLoggedIn);
    const [navbarCollapsed, setNavbarCollapsed] = useState(true);

    const handleMouseLeave = () => {
        setNavbarCollapsed(true);
    };

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = async (event: React.MouseEvent) => {
        event.preventDefault();
        await dispatch(authenticationActions.thunkLogOut());
        navigate("/login");
    };

    const navigationBar =
        <nav className={`navbar navbar-expand-lg bg-body-tertiary ${navbarCollapsed ? 'collapsed' : ''}`} onMouseLeave={handleMouseLeave}>
            <div className="container-fluid">
                <Link to={"/"}><img src={logo} width="40" height="40" className="d-inline-block align-top" alt="Poke logo" /></Link>
                <Link className="navbar-brand" to={"/"}>Poke App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation"
                    onClick={() => setNavbarCollapsed(!navbarCollapsed)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${navbarCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={"/"}>Home</Link>
                        </li>
                        {
                            isUserLoggedIn &&
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/pokemons"}>Pokemons</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/my-pokemons"}>My Pokemons</Link>
                                </li>
                            </>
                        }

                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => handleSearchInputChange(e.target.value)} />
                    </form>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        {
                            (!isUserLoggedIn && !isLoginPageActive) &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        }
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

    return (
        isUserLoggedIn
            ? navigationBar
            : <></>

    )
};

export default NavigationBar;