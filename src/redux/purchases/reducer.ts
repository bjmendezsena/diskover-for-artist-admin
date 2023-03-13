import purchasesConstants from './constants';

const {
  SET_LOADING_PURCHASES,
  SET_PURCHASES,
  SET_EDIT_PURCHASE_ERROR,
  SET_EDITED_PURCHASE,
  SET_SELECTED_PURCHASES,
  SET_LOADING_EDIT_PURCHASES,
} = purchasesConstants;

const initialState = {
  loading: false,
  purchases: [],
};

const purchasesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOADING_PURCHASES: {
      return {
        ...state,
        isLoadingPurchases: action.isLoadingPurchases,
      };
    }
    case SET_PURCHASES: {
      return {
        ...state,
        purchases: action.purchases,
      };
    }
    case SET_SELECTED_PURCHASES: {
      return {
        ...state,
        selectedPurchase: action.selectedPurchase,
      };
    }
    case SET_EDIT_PURCHASE_ERROR: {
      return {
        ...state,
        editPurchaseError: action.editPurchaseError,
      };
    }
    case SET_EDITED_PURCHASE: {
      return {
        ...state,
        isEditedPurchase: action.isEditedPurchase,
      };
    }
    case SET_LOADING_EDIT_PURCHASES: {
      return {
        ...state,
        isLoadingEditPurchases: action.isLoadingEditPurchases,
      };
    }
    default: {
      return state;
    }
  }
};

export default purchasesReducer;
