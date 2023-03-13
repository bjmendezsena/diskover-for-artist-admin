import deactivatedUsersConstants from './constants';

const { SET_LOADING_DEACTIVATED_USERS } = deactivatedUsersConstants;

const initialState = {
  loading: false,
  data: [],
};

const deactivatedUsersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOADING_DEACTIVATED_USERS: {
      return {
        ...state,
        loading: action.isLoadingDeactivatedUsers,
      };
    }
    default: {
      return state;
    }
  }
};

export default deactivatedUsersReducer;
