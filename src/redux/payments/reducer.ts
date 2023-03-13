
const initialState = {
  requests: [],
  loading: false,
  loadingNewRequest: false,
  response: {},
  token: "",
  splits: []
};

const paymentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_LOADING_REQUESTS': {
      return {
        ...state,
        loading: action.isLoading,
      };
    }
    case 'SET_LOADING_NEW_REQUEST': {
      return {
        ...state,
        loadingNewRequest: action.isLoadingNewRequest,
      };
    }
    case 'SET_REQUESTS': {
      return {
        ...state,
        requests: action.requests,
      };
    }
    case 'SET_RESPONSE': {
      return {
        ...state,
        response: action.response,
      };
    }
    case 'SET_TOKEN': {
      return {
        ...state,
        token: action.token,
      };
    }
    case 'SET_NOTIFICATIONS': {
      return {
        ...state,
        notifications: action.notifications,
      };
    }
    case 'SET_SPLITS': {
      return {
        ...state,
        splits: action.splits,
      };
    }
    default: {
      return state;
    }
  }
};

export default paymentReducer;
