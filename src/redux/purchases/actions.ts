import purchasesConstants from './constants';
import purchasesServices from './services';

const {
  SET_LOADING_PURCHASES,
  SET_PURCHASES,
  SET_EDIT_PURCHASE_ERROR,
  SET_EDITED_PURCHASE,
  SET_LOADING_EDIT_PURCHASES,
  SET_SELECTED_PURCHASES,
} = purchasesConstants;

const setLoadingPurchases = (isLoadingPurchases: boolean) => ({
  type: SET_LOADING_PURCHASES,
  isLoadingPurchases,
});
const setPurchases = (purchases: any) => ({
  type: SET_PURCHASES,
  purchases,
});

export const fetchAllPurchases = () => {
  return (dispatch: any) => {
    dispatch(setLoadingPurchases(true));
    purchasesServices
      .fetchAll()
      .then((res) => {
        dispatch(setLoadingPurchases(false));
        return dispatch(setPurchases(res.data.response));
      })
      .catch(() => {
        dispatch(setPurchases([]));
        dispatch(setLoadingPurchases(false));
      });
  };
};

const setEditPurchaseError = (editPurchaseError: String | null) => ({
  type: SET_EDIT_PURCHASE_ERROR,
  editPurchaseError,
});

const setEditPurchase = (isEditedPurchase: boolean) => ({
  type: SET_EDITED_PURCHASE,
  isEditedPurchase,
});

export const editPurchase = (
  id: string,
  direction: string,
  status: string,
  callback?: any
) => {
  return (dispatch: any) => {
    dispatch(setEditPurchase(true));
    dispatch(setEditPurchaseError(null));
    purchasesServices
      .updatePurchase(id, direction, status)
      .then((res: any) => {
        if (callback) callback();
        dispatch(setEditPurchase(false));
        dispatch(fetchAllPurchases());
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status !== 500 &&
          err.response.data &&
          err.response.data.errors.message
        ) {
          dispatch(setEditPurchaseError(err.response.data.errors.message));
        } else {
          dispatch(setEditPurchaseError('Ha ocurrido un error'));
        }
        dispatch(setEditPurchase(false));
      });
  };
};

const setLoadingEditPurchases = (isLoadingEditPurchases: boolean) => ({
  type: SET_LOADING_EDIT_PURCHASES,
  isLoadingEditPurchases,
});

const setSelectedPurchase = (selectedPurchase: any) => ({
  type: SET_SELECTED_PURCHASES,
  selectedPurchase,
});

export const fetchById = (id: string) => {
  return (dispatch: any) => {
    dispatch(setLoadingEditPurchases(true));
    purchasesServices.fetchById(id).then((res) => {
      dispatch(setLoadingEditPurchases(false));
      return dispatch(setSelectedPurchase(res.data.response));
    });
  };
};
