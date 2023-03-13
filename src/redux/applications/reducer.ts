import applicationsConstants from "./constants";

const {
  SET_APPLICATIONS,
  SET_LOADING_APPLICATIONS,
  SET_SEND_CONTRACT_LOADING,
} = applicationsConstants;

const initialState = {
  isLoading: false,
  applications: [],
  sendContractLoading: false,
};

const applicationsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_APPLICATIONS: {
      return {
        ...state,
        applications: action.applications,
      };
    }
    case SET_LOADING_APPLICATIONS: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case SET_SEND_CONTRACT_LOADING:
      return {
        ...state,
        sendContractLoading: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default applicationsReducer;
