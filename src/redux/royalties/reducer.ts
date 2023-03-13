const initialState = {
  loadingRoyalties: false,
  releases: [],
};

const royaltiesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_LOADING_ROYALTIES': {
      return {
        ...state,
        loadingRoyalties: action.loading,
      };
    }
    case 'SET_ROYALTIES': {
      return {
        ...state,
        royalties: [...action.royalties],
      };
    }
    default: {
      return state;
    }
  }
};

export default royaltiesReducer;
