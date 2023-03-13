import subcategoriesConstants from "./constants";
import subcategoriesServices from './services'

const {
  SET_LOADING_SUBCATEGORIES,
  SET_SUBCATEGORIES,
} = subcategoriesConstants;


const setLoadingSubcategories = (isLoadingSubcategories: boolean) => ({ type: SET_LOADING_SUBCATEGORIES, isLoadingSubcategories });
const setSubcategories = (subcategories: any) => ({ type: SET_SUBCATEGORIES, subcategories });

export const fetchSubcategories = () => {
    return (dispatch: any) => {
        dispatch(setLoadingSubcategories(true));
				subcategoriesServices.fetchAll().then((res) => {
					dispatch(setLoadingSubcategories(false));
					return dispatch(setSubcategories(res.data.subcategories))
				});
    }
};