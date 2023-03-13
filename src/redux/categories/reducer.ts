import categoriesConstants from "./constants";

const {
  SET_LOADING_CATEGORIES,
  SET_CATEGORIES,
  SET_CREATING_CATEGORY,
  SET_CREATED_CATEGORY,
  SET_DELETING_CATEGORIES,
  REMOVE_CATEGORY,
} = categoriesConstants;

const initialState = {
  loading: false,
  data: [],
};

const categoriesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOADING_CATEGORIES: {
      return {
        ...state,
        loading: action.isLoadingCategories,
      };
    }
    case SET_CATEGORIES: {
      return {
        ...state,
        data: action.categories,
      };
    }
    case SET_CREATING_CATEGORY: {
      return {
        ...state,
        creating: action.isCreatingCategories,
      };
    }
    case SET_CREATED_CATEGORY: {
      let categories: any[] = state.data;
      let newCategory = action.category;
      // New category is a child
      if (newCategory.parent) {
        // Save categories in parent
        categories = categories.map((parentCategory) => {
          let parent = parentCategory;
          if (parent.id === newCategory.parent) {
            if (newCategory.children) {
              parent.children = [newCategory, ...parent.children]
            } else {
              parent.children = [newCategory]
            }
          }
          return parentCategory;
        })
      } else {
        // New category is a parent
        categories = [newCategory, ...categories]
      }
      return {
        ...state,
        data: categories
      };
    }
    case SET_DELETING_CATEGORIES: {
      return {
        ...state,
        deleting: action.isDeletingCategories,
      };
    }
    case REMOVE_CATEGORY: {
      const filteredParents = state.data.filter((category: any) => category.id !== action.deletedCategoryId);
      const filteredCategories = filteredParents.map((parent: any ) => {
        if (parent.children) parent.children = parent.children.filter((child: any) => child.id !== action.deletedCategoryId)
        return parent;
      })
      return {
        ...state,
        data: filteredCategories,
      };
    }
    default: {
      return state;
    }
  }
};

export default categoriesReducer;
