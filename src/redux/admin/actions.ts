import { fetchAll } from 'redux/payments/actions';
import { fetchAllLabels } from 'redux/users/actions';
import adminConstants from './constants';
import adminServices from './services';

const { SET_LOADING_ADMINS, SET_ADMINS } = adminConstants

const setLoadingAdmins = (isLoadingAdmins: boolean) => ({
  type: SET_LOADING_ADMINS,
  isLoadingAdmins,
});
const setAdmins = (admins: any) => ({ type: SET_ADMINS, admins });

export const fetchAllAdmins = (filters?: any) => {
  return (dispatch: any) => {
    dispatch(setLoadingAdmins(true));
    adminServices.fetchAllAdmins(filters).then((res: any) => {
      dispatch(setLoadingAdmins(false));
      return dispatch(setAdmins(res.data.admins));
    });
  };
};

const { SET_NEW_ADMIN, NEW_ADMIN_ERROR } = adminConstants

const setNewAdmin = (isNewAdmin: boolean) => ({
  type: SET_NEW_ADMIN,
  isNewAdmin,
});
export const editOneAdmin = (data: any, cb: any) => {
  return (dispatch: any) => {
    adminServices
      .editAdmin(
        data.id,
        data.name,
        data.last_name,
        data.email,
      )
      .then((res: any) => {
        dispatch(fetchAllAdmins());
        return cb("");
      })
      .catch((err: any) => {
        if (
          // Messy
          err.response &&
          err.response.status !== 500 &&
          err.response.data &&
          err.response.data.errors.message
        ) {
          return cb(err.response.data.errors);
        } else {
          return cb(err.response.data.errors);
        }
      });
  };

}
const setSignUpError = (logUpAdminError: string | null) => ({
  type: NEW_ADMIN_ERROR,
  logUpAdminError,
});

export const newAdmin = (data: any, callback?: any) => {
  return (dispatch: any) => {
    dispatch(setNewAdmin(true));
    adminServices
      .newAdmin(data.email, data.password, data.name, data.last_name)
      .then((res: any) => {
        if (callback) callback();
        dispatch(setNewAdmin(false));
        dispatch(fetchAllAdmins());
      })
      .catch((err) => {
        if (err?.response?.status === 401) dispatch(setSignUpError('Mot de passe incorrect'))
        else if (err?.response?.status === 404) dispatch(setSignUpError('Utilisateur non trouvé'))
        else dispatch(setSignUpError('Une erreur est survenue'));
        dispatch(setNewAdmin(false));
      });
  };
};

const { SET_DELETING_ADMIN } = adminConstants
const setDeletingAdmin = (isDeletingAdmin: boolean) => ({
  type: SET_DELETING_ADMIN,
  isDeletingAdmin,
});

export const deleteAdmin = (email: string, callback: any) => {
  return (dispatch: any) => {
    dispatch(setDeletingAdmin(true));
    adminServices
      .deleteAdmin(email)
      .then((res: any) => {
        dispatch(setDeletingAdmin(false));
        dispatch(fetchAllAdmins());
        callback("Eliminado con éxito!");
      });
  };
};

export const updateAccess = (admins: any, callback: any) => {
  return (dispatch: any) => {
    dispatch(setLoadingAdmins(true));
    adminServices.updateAccess(admins).then((res) => {
      dispatch(fetchAllAdmins())
      dispatch(setLoadingAdmins(false));
      callback("Actualizado con éxito!");

    })

  }
}


const { SET_EDITING_ADMIN } = adminConstants
const setEditingAdmin = (isEditingAdmin: boolean) => ({
  type: SET_EDITING_ADMIN,
  isEditingAdmin,
});