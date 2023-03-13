import userConstants from "./constants";
import userServices from "./services";
import api from "../../helpers/api";
const { SET_USER } = userConstants;
const setUser = (user: any) => ({ type: SET_USER, user });

const { CHECKING_SESSION } = userConstants;
const setCheckingMe = (isChecking: boolean) => ({
  type: CHECKING_SESSION,
  isChecking,
});
const setChecked = (isChecked: boolean) => ({
  type: "CHEKED_SESSION",
  isChecked,
});
export const fetchMe = () => {
  return async (dispatch: any) => {
    dispatch(setCheckingMe(true));
    try {
      const response = await userServices.me();
      if (response.data.admin) {
        api.defaults.headers.common["x-token"] = response.data.admin.token;
        localStorage.setItem("diskover-admin-token", response.data.admin.token);
        dispatch(setUser(response.data.admin));
      }
      dispatch(setChecked(true));
      dispatch(setCheckingMe(false));
    } catch (e) {
      dispatch(setChecked(false));
      dispatch(setCheckingMe(false));
    }
  };
};

const { LOGGING_IN, SET_LOGIN_ERROR } = userConstants;
const setLogging = (isLoggingIn: boolean) => ({
  type: LOGGING_IN,
  isLoggingIn,
});
const setLoggingError = (loginError: string | null) => ({
  type: SET_LOGIN_ERROR,
  loginError,
});

export const loginUser = (
  data: { email: string; password: string },
  remember: boolean,
  callback?: any
) => {
  return async (dispatch: any) => {
    dispatch(setLogging(true));
    dispatch(setLoggingError(null));
    try {
      const { email, password } = data;
      const response = await userServices.login(email, password, remember);
      const { admin } = response.data;
      console.log(admin)
      api.defaults.headers.common["x-token"] = admin.token;
      localStorage.setItem("diskover-admin-token", admin.token);
      dispatch(setUser(admin));
      if (callback) callback();
      dispatch(setLogging(false));
    } catch (err) {
      if (err?.response?.status === 401)
        dispatch(setLoggingError("Contraseña incorrecta"));
      else if (err?.response?.status === 404)
        dispatch(setLoggingError("Usuario no encontrado"));
      else dispatch(setLoggingError("Se ha producido un error"));
      dispatch(setLogging(false));
    }
  };
};

const { LOGGING_OUT } = userConstants;
const setLoggingOut = (isLoggingOut: boolean) => ({
  type: LOGGING_OUT,
  isLoggingOut,
});

export const logoutUser = (callback?: any) => {
  return async (dispatch: any) => {
    dispatch(setLoggingOut(true));
    await userServices.logout();
    localStorage.removeItem("diskover-admin-token");
    dispatch(setUser(null));
    dispatch(setLoggingOut(false));
    return callback();
  };
};

const { FETCHING_USER, FETCH_USER_ERROR, SET_USER_INFO } = userConstants;
const setUserInfo = (userInfo: any) => ({ type: SET_USER_INFO, userInfo });

const setfetchingUser = (isFetchingUser: boolean) => ({
  type: FETCHING_USER,
  isFetchingUser,
});
const setfetchUserError = (fetchUserError: string | null) => ({
  type: FETCH_USER_ERROR,
  fetchUserError,
});

/* export const fetchUser = (
  id: string,
  callback?: any
) => {
  return async (dispatch: any) => {
    dispatch(setfetchingUser(true));
    dispatch(setfetchUserError(null));
    try {
      const response = await userServices.userInfo(id);
      dispatch(setUserInfo(response?.data));
      if (callback) callback();
      dispatch(setfetchingUser(false));
    } catch (err) {
      if (err?.response?.status === 400) dispatch(setfetchUserError('Mauvaise demande'))
      else if (err?.response?.status === 404) dispatch(setfetchUserError('Utilisateur non trouvé'))
      else dispatch(setfetchUserError('Une erreur est survenue'));
      dispatch(setfetchingUser(false));
    }
  };
}; */
