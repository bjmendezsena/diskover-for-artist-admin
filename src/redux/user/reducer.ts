import userConstants from './constants';

const {
  CHECKING_SESSION,
  CHEKED_SESSION,
  LOGGING_IN,
  LOGGING_OUT,
  SET_USER,
  SET_LOGIN_ERROR,
  FETCHING_USER,
  FETCH_USER_ERROR,
  SET_USER_INFO,
} = userConstants;

const initialState = {};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CHECKING_SESSION: {
      return {
        ...state,
        checkingSession: action.isChecking,
      };
    }
    case CHEKED_SESSION: {
      return {
        ...state,
        checked: action.isChecked
      }
    }
    case LOGGING_IN: {
      return {
        ...state,
        loggingIn: action.isLoggingIn,
      };
    }
    case LOGGING_OUT: {
      return {
        ...state,
        loggingOut: action.isLoggingOut,
      };
    }
    case SET_LOGIN_ERROR: {
      return {
        ...state,
        loginError: action.loginError,
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    case FETCHING_USER: {
      return {
        ...state,
        fetchingUser: action.isFetchingUser,
      }
    }
    case FETCH_USER_ERROR: {
      return {
        ...state,
        fetchUserError: action.fetchUserError
      }
    }
    case SET_USER_INFO: {
      return {
        ...state,
        userInfo: action.userInfo
      }
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
