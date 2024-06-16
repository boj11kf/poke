import { services } from "../services/services.tsx";


const USER_LOG_IN = 'user/user-log-in';
const USER_LOG_OUT = 'user/user-log-out';

interface UserLogInAction {
    type: typeof USER_LOG_IN;
}
interface UserLogOutAction {
    type: typeof USER_LOG_OUT;
}

export type AuthenticationActions = UserLogInAction | UserLogOutAction;

export const actionCreators = {

    /***** THUNK ACTIONS *****/
    thunkLogIn: (payload: any) => (async (dispatch: any) => {
        try {
            const response = await services.postData('http://localhost:8080/login', payload)
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
}