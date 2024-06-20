import { services } from "../../services/services";


const USER_LOG_IN = 'user/user-log-in';
const USER_LOG_OUT = 'user/user-log-out';
const USER_REGISTRATION = 'user/registration';

interface UserLogInAction {
    type: typeof USER_LOG_IN;
}
interface UserLogOutAction {
    type: typeof USER_LOG_OUT;
}
interface UserRegistraionAction {
    type: typeof USER_REGISTRATION;
}

export type AuthenticationActions = UserLogInAction | UserLogOutAction;

export const actionCreators = {

    /***** THUNK ACTIONS *****/
    thunkLogIn: (payload: any) => (async (dispatch: any) => {
        try {
            const response = await services.postData('http://localhost:3000/api/auth/login', payload);
            const text = await response.text();

            localStorage.setItem("token", String(text));

            dispatch(actionCreators.logIn());
        } catch (error) {
            console.error(error);
        }
    }),
    thunkLogOut: (/*payload: any*/) => (async (dispatch: any) => {
        try {
            localStorage.removeItem("token");

            dispatch(actionCreators.logOut());

        } catch (error) {
            console.error(error);
        }
    }),
    thunkRegistration: (payload: any) => (async (dispatch: any) => {
        try {
            const response = await services.postData('http://localhost:3000/api/auth/register', payload)
            const text = await response.text();

            dispatch(actionCreators.registration());
        } catch (error) {
            console.error(error);
        }
    }),


    /***** ACTIONS *****/
    logIn: (): UserLogInAction => ({
        type: USER_LOG_IN,
    }),
    logOut: (): UserLogOutAction => ({
        type: USER_LOG_OUT,
    }),
    registration: (): UserRegistraionAction => ({
        type: USER_REGISTRATION,
    }),
}