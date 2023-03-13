import feedbacksConstants from './constants';

const { SET_LOADING_FEEDBACKS } = feedbacksConstants;

const initialState = {
  loading: false,
  data: [],
};

const feedbacksReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOADING_FEEDBACKS: {
      return {
        ...state,
        loading: action.isLoadingFeedbacks,
      };
    }
    default: {
      return state;
    }
  }
};

export default feedbacksReducer;
