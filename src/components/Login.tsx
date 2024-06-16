import { useState } from "react"
import { useDispatch } from "react-redux";
import { actionCreators as authenticationActions} from "../store/actions/authentication-actions";



const Login = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(username);
        console.log(password);
        dispatch<any>(authenticationActions.thunkLogIn({'email': username, 'password': password}));
    };

    const handleRegistration = (event: React.MouseEvent) => {
        event.preventDefault();
        dispatch<any>(authenticationActions.thunkRegistration({'username':username, 'email': username, 'password': password}));
    };

    return (
        <>
            <div className="dropdown-menu">
                <form className="px-4 py-3" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleDropdownFormEmail1"
                            placeholder="email@example.com"
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleDropdownFormPassword1"
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)}/>
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

export default Login;