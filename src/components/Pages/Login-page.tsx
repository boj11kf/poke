import { useState } from "react"
import { useDispatch } from "react-redux";
import { actionCreators as authenticationActions } from "../../store/actions/authentication-actions";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "store/store";
import { useLoading } from "../Loading";
import '../../App.css';



const LoginPage = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        await dispatch(authenticationActions.thunkLogIn({ 'email': username, 'password': password }));
        navigate("/pokemons");
        //setLoading(false);

    };

    const handleRegistration = async (event: React.MouseEvent) => {
        event.preventDefault();
        setLoading(true);
        await dispatch(authenticationActions.thunkRegistration({ 'username': username, 'email': username, 'password': password }));
        /* itt meg meg kell oldani, h tudja  felhasznalo h sikeresen regisztralt, es most be is kell jelentkeznie */
        navigate("/login");
        //setLoading(false);
    };

    return (
        <>
            <div className="dropdown-menu">
                <form className="px-4 py-3" onSubmit={handleSubmit}>
                    <div className="mb-3 sign-in-input">
                        <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleDropdownFormEmail1"
                            placeholder="email@example.com"
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-3 sign-in-input">
                        <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleDropdownFormPassword1"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="dropdownCheck" />
                            <label className="form-check-label" htmlFor="dropdownCheck">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </form>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#" onClick={handleRegistration}>New around here? Sign up</a>
                <br />
                <a className="dropdown-item" href="#">Forgot password?</a>
            </div>
        </>

    )
};

export default LoginPage;