import adminConstants from './constants';

const {
  SET_LOADING_ADMINS,
  SET_ADMINS,
  SET_EDITING_ADMIN,
  SET_NEW_ADMIN,
  SET_SIGNUP_ERROR,
} = adminConstants;

const initialState = {
  loading: false,
  data: [],
};

const adminsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOADING_ADMINS: {
      return {
        ...state,
        loading: action.isLoadingAdmins,
      };
    }
    case SET_ADMINS: {
      return {
        ...state,
        data: action.admins,
      };
    }
    case SET_EDITING_ADMIN: {
      return {
        ...state,
        isEditingAdmin: action.isEditingAdmin,
      };
    }
    case SET_NEW_ADMIN: {
      return {
        ...state,
        isNewAdmin: action.isNewAdmin,
      };
    }
    case SET_SIGNUP_ERROR: {
      return {
        ...state,
        logUpError: action.logUpError,
      };
    }
    default: {
      return state;
    }
  }
};

export default adminsReducer;
