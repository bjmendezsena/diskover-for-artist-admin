import adminConstants from './constants';

const {
  SET_LOADING_ADMINS,
  SET_ADMINS,
  SET_NEW_ADMIN,
  NEW_ADMIN_ERROR,
} = adminConstants;

const initialState = {};

const adminReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOADING_ADMINS: {
      return {
        ...state,
        loadingAdmins: action.isLoadingAdmins,
      }
    }
    case SET_ADMINS: {
      return {
        ...state,
        dataAdmins: action.admins,
      }
    }
    case SET_NEW_ADMIN: {
      return {
        ...state,
        newAdmin: action.isNewAdmin
      }
    }
    case NEW_ADMIN_ERROR: {
      return {
        ...state,
        logUpAdminError: action.logUpAdminError
      }
    }
    default: {
      return state;
    }
  }
};

export default adminReducer;
