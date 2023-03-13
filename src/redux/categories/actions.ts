import categoriesConstants from './constants';
import categoriesServices from './services';

const {
  SET_LOADING_CATEGORIES,
  SET_CATEGORIES,
  SET_CREATING_CATEGORY,
  SET_CREATED_CATEGORY,
  SET_DELETING_CATEGORIES,
  REMOVE_CATEGORY,
} = categoriesConstants;

const setLoadingCategories = (isLoadingCategories: boolean) => ({
  type: SET_LOADING_CATEGORIES,
  isLoadingCategories,
});
const setCategories = (categories: any) => ({
  type: SET_CATEGORIES,
  categories,
});

export const fetchCategories = (query?: any) => {
  return (dispatch: any) => {
    dispatch(setLoadingCategories(true));
    categoriesServices.fetch(query).then((res) => {
      dispatch(setLoadingCategories(false));
      return dispatch(setCategories(res.data.categories));
    });
  };
};

const setCreatingCategory = (isCreatingCategory: boolean) => ({
  type: SET_CREATING_CATEGORY,
  isCreatingCategory,
});
const addCategory = (category: any) => ({
  type: SET_CREATED_CATEGORY,
  category,
});

export const createCategory = (data: any, callback: any) => {
  return (dispatch: any) => {
    dispatch(setCreatingCategory(true));
    categoriesServices.create(data).then((res) => {
      dispatch(setCreatingCategory(false));
      if (callback) callback();
      return dispatch(addCategory(res.data.category));
    });
  };
};

const setDeletingCategories = (isDeletingCategories: boolean) => ({
  type: SET_DELETING_CATEGORIES,
  isDeletingCategories,
});
const removeCategory = (deletedCategoryId: string) => ({
  type: REMOVE_CATEGORY,
  deletedCategoryId,
});

export const deleteCategory = (id: string, callback: any) => {
  return (dispatch: any) => {
    dispatch(setDeletingCategories(true));
    categoriesServices.delete(id).then((res) => {
      dispatch(setDeletingCategories(false));
      if (callback) callback();
      return dispatch(removeCategory(id));
    });
  };
};

const { SET_EDITING_CATEGORIES, SET_EDITED_CATEGORIES } = categoriesConstants;
const setEditingCategories = (isEditingCategory: boolean) => ({
  type: SET_EDITING_CATEGORIES,
  isEditingCategory,
});
const setEditedCategory = (editedCategory: string) => ({
  type: SET_EDITED_CATEGORIES,
  editedCategory,
});
export const editCategory = (id: string, data: any, callback: any) => {
  return (dispatch: any) => {
    dispatch(setEditingCategories(true));
    categoriesServices.edit(id, data).then((res: any) => {
      dispatch(setEditingCategories(false));
      if (callback) callback();
      return dispatch(setEditedCategory(id));
    });
  };
};
