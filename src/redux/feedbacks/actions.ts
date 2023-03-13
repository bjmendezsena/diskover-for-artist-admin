import feedbacksService from './services';
import feedbacksConstants from './constants';

const { SET_LOADING_FEEDBACKS } = feedbacksConstants;

export const setLoadingFeedbacks = (isLoadingFeedbacks: boolean) => ({ type: SET_LOADING_FEEDBACKS, isLoadingFeedbacks });

export const fetchFeedbacks = (query?: any) => {
  return feedbacksService.fetch().catch(() => []);
};
