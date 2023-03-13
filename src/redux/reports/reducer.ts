import reportsConstants from './constants';

const { SET_LOADING_REPORTS, SET_REPORTS } = reportsConstants;

const initialState = {
  loading: false,
  data: [],
};

const reportsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOADING_REPORTS: {
      return {
        ...state,
        loading: action.isLoadingReports,
      };
    }
    case SET_REPORTS : {
      return {
        ...state,
        data: action.reports
      }
    }
    default: {
      return state;
    }
  }
};

export default reportsReducer;
