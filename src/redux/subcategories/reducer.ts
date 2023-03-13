import subcategoriesConstants from "./constants";

const {
  SET_LOADING_SUBCATEGORIES,
  SET_SUBCATEGORIES,
} = subcategoriesConstants;

const initialState = {
  loading: false,
  data: [],
};

const subcategoriesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOADING_SUBCATEGORIES: {
      return {
        ...state,
        loading: action.isLoadingSubcategories,
      };
    }
    case SET_SUBCATEGORIES: {
      return {
        ...state,
        data: action.subcategories,
      };
    }
    default: {
      return state;
    }
  }
};

export default subcategoriesReducer;
