import { act } from 'react-dom/test-utils';
import usersConstants from './constants';

const {
  SET_LOADING_USERS,
  SET_USERS,
  SET_LABEL,
  SET_LOADING_LABEL,
  SET_LABEL_ERROR,
  SET_LOADING_INCOME,
  SET_INCOME_DATA
} = usersConstants;

const initialState = {
  loading: false,
  loadingLabels: false,
  data: [],
  home: [],
  incomeData: [],
  editOk: false,
  labels: [],
  labelError: "",
  awaitingPercent: false,
  loadingIncome: true
};

const usersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOADING_USERS: {
      return {
        ...state,
        loading: action.isLoadingUsers,
      };
    }
    case SET_USERS: {
      return {
        ...state,
        users: action.users,
      };
    }
    case 'SET_LOAD_PERCENT': {
      return {
        ...state,
        awaitingPercent: action.isLoading,
      };
    }
    case SET_LOADING_LABEL: {
      return {
        ...state,
        loadingLabels: true,
      }
    }
    case SET_LABEL: {
      return {
        ...state,
        labels: action.labels,
        loadingLabels: false
      }
    }

    case SET_LOADING_INCOME: {
      return {
        ...state,
        loadingIncome: action.isLoadingIncome
      }
    }

    case SET_INCOME_DATA: {
      return {
        ...state,
        incomeData: action.incomeData
      }
    }

    case SET_LABEL_ERROR: {
      return {
        ...state,
        loadingLabels: false,
        labelError: action.error
      }
    }
    default: {
      return state;
    }
  }
};

export default usersReducer;
