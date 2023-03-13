import adminConstants from './constants';
import adminServices from './services';

const {
  SET_LOADING_ADMINS,
  SET_ADMINS,
  SET_EDITING_ADMIN,
  SET_NEW_ADMIN,
  SET_SIGNUP_ERROR,
} = adminConstants;

const setLoadingAdmins = (isLoadingAdmins: boolean) => ({
  type: SET_LOADING_ADMINS,
  isLoadingAdmins,
});
const setAdmins = (admins: any) => ({ type: SET_ADMINS, admins });

export const fetchAllAdmins = (filters?: any) => {
  return (dispatch: any) => {
    dispatch(setLoadingAdmins(true));
    adminServices.fetchAll(filters).then((res) => {
      dispatch(setLoadingAdmins(false));
      return dispatch(setAdmins(res.data.response));
    });
  };
};

const setEditingAdmin = (isEditingAdmin: boolean) => ({
  type: SET_EDITING_ADMIN,
  isEditingAdmin,
});

export const editAdmin = (id: any, data: any) => {
  return (dispatch: any) => {
    dispatch(setEditingAdmin(true));
    adminServices
      .editAdmin(id, data.email, data.password, data.name)
      .then((res: any) => {
        dispatch(setEditingAdmin(false));
        dispatch(fetchAllAdmins());
      });
  };
};

const setSignUpError = (logUpError: string | null) => ({
  type: SET_SIGNUP_ERROR,
  logUpError,
});

const setNewAdmin = (isNewAdmin: boolean) => ({
  type: SET_NEW_ADMIN,
  isNewAdmin,
});

export const newAdmin = (data: any, callback?: any) => {
  return (dispatch: any) => {
    dispatch(setNewAdmin(true));
    dispatch(setSignUpError(null));
    adminServices
      .newAdmin(data.email, data.password, data.name)
      .then((res: any) => {
        if (callback) callback();
        dispatch(setNewAdmin(false));
        dispatch(fetchAllAdmins());
      })
      .catch((err) => {
        if (
          // Messy
          err.response &&
          err.response.status !== 500 &&
          err.response.data &&
          err.response.data.errors.message
        ) {
          dispatch(setSignUpError(err.response.data.errors.message));
        } else {
          dispatch(setSignUpError('Ha ocurrido un error'));
        }
        dispatch(setNewAdmin(false));
      });
  };
};
