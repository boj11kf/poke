import { useState } from "react"
import { useDispatch } from "react-redux";
import { actionCreators as authenticationActions } from "../../store/actions/authentication-actions";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "store/store";
import { useLoading } from "../Loader/PokeBallLoader";
import logo from '../../poke-logo.png';
import pikachu from '../../Pikachu-PNG-Download-Image.png';



const LoginPage = () => {

    const [emailAddress, setEmailAddress] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        await dispatch(authenticationActions.thunkLogIn({ 'email': emailAddress, 'password': password }));
        navigate("/pokemons");
        //setLoading(false);

    };

    const handleRegistration = async (event: React.MouseEvent) => {
        event.preventDefault();
        setLoading(true);
        await dispatch(authenticationActions.thunkRegistration({ 'username': emailAddress, 'email': emailAddress, 'password': password }));
        /* itt meg meg kell oldani, h tudja  felhasznalo h sikeresen regisztralt, es most be is kell jelentkeznie */
        navigate("/login");
        //setLoading(false);
    };

    return (
        <section className="vh-90">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src={pikachu} alt="login form pikachu img" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">

                                        <form>

                                            <div className="d-flex justify-content-center align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                <img src={logo} className="img-fluid" style={{ maxWidth: '25%', height: 'auto' }} alt="PokeBall" />
                                                <h5>Poke App</h5>
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="email" id="form2Example17" className="form-control form-control-lg" onChange={(e) => setEmailAddress(e.target.value)}/>
                                                <label className="form-label" htmlFor="form2Example17">Email address</label>
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="password" id="form2Example27" className="form-control form-control-lg" onChange={(e) => setPassword(e.target.value)}/>
                                                <label className="form-label" htmlFor="form2Example27">Password</label>
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" type="button" onClick={handleLogin}>Login</button>
                                            </div>

                                            <a className="small text-muted" href="#!">Forgot password?</a>
                                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account?
                                                <a href="#!" style={{ color: '#393f81' }} onClick={handleRegistration}>Register here</a>
                                            </p>
                                            <a href="#!" className="small text-muted">Terms of use.</a>
                                            <a href="#!" className="small text-muted">Privacy policy</a>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default LoginPage;