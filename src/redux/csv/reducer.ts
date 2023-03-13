import adminConstants from './constants';

const initialState = {
  loading: false,
  error: "",
  history: [],
  loadingHistory: false,
  manualLoading: false,
};

const fileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_NEW_FILE': {
      return {
        ...state,
        loading: action.loading,
      }
    }
    case 'SET_ERROR_FILE': {
      return {
        ...state,
        error: action.error
      }
    }
    case 'LOAD_HISTORY': {
      return {
        ...state,
        loadingHistory: action.loading
      }
    }
    case 'SET_HISTORY': {
      return {
        ...state,
        history: action.history
      }
    }
    case 'MANUAL_LOADING': {
      return {
        ...state,
        manualLoading: action.manualLoading
      }
    }
    default: {
      return state;
    }
  }
};

export default fileReducer;
