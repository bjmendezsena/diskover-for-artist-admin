import { act } from 'react-dom/test-utils';
import releasesConstants from './constants';

const {
  SET_RELEASES,
  SET_LOADING_RELEASES,
  SET_ERROR_RELEASES,
  SET_LOADING_SPLITS,
  SET_ERROR_SPLITS,
  SET_SPLITS
} = releasesConstants;

const initialState = {
  loadingReleases: false,
  editOk: false,
  releases: [],
  releasesError: "",
  loadingSplits: false,
  splitsError: "",
  splits: []
};

const releasesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOADING_RELEASES: {
      return {
        ...state,
        loadingReleases: action.loading,
      };
    }
    case SET_RELEASES: {
      return {
        ...state,
        releases: [...action.releases],
      };
    }
    case SET_ERROR_RELEASES: {
      return {
        ...state,
        loadingReleases: false,
        releasesError: action.error
      }
    }
    case SET_ERROR_SPLITS: {
      return {
        ...state,
        loadingSplits: false,
        splitsError: action.error
      }
    }
    case SET_LOADING_SPLITS: {
      return {
        ...state,
        loadingSplits: action.loading
      }
    }
    case SET_SPLITS: {
      return {
        ...state,
        splits: action.splits
      }
    }
    default: {
      return state;
    }
  }
};

export default releasesReducer;
