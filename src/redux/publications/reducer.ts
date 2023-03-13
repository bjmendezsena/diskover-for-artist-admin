import publicationsConstants from './constants';

const {
  SET_NEW_PUBLICATION,
  SET_ADD_PUBLICATION_ERROR,
  SET_LOADING_PUBLICATIONS,
  SET_PUBLICATIONS,
  SET_SELECTED_PUBLICATIONS,
  SET_EDIT_PUBLICATION_ERROR,
  SET_EDITED_PUBLICATION,
  SET_DELETING_PUBLICATION,
  REMOVE_PUBLICATION,
} = publicationsConstants;

const initialState = {
  loading: false,
  publications: [],
};

const publicationsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_NEW_PUBLICATION: {
      return {
        ...state,
        isNewPublication: action.isNewPublication,
      };
    }
    case SET_ADD_PUBLICATION_ERROR: {
      return {
        ...state,
        addPublicationError: action.addPublicationError,
      };
    }

    case SET_LOADING_PUBLICATIONS: {
      return {
        ...state,
        isLoadingPublications: action.isLoadingPublications,
      };
    }
    case SET_PUBLICATIONS: {
      return {
        ...state,
        publications: action.publications,
      };
    }
    case SET_SELECTED_PUBLICATIONS: {
      return {
        ...state,
        selectedPublication: action.selectedPublication,
      };
    }
    case SET_EDIT_PUBLICATION_ERROR: {
      return {
        ...state,
        editPublicationError: action.editPublicationError,
      };
    }
    case SET_EDITED_PUBLICATION: {
      return {
        ...state,
        isEditedPublication: action.isEditedPublication,
      };
    }
    case SET_DELETING_PUBLICATION: {
      return {
        ...state,
        deleting: action.isDeletingPublication,
      };
    }
    case REMOVE_PUBLICATION: {
      const filteredParents = state.publications.filter(
        (publications: any) => publications.id !== action.deletedPublicationId
      );
      const filteredPublications = filteredParents.map((parent: any) => {
        if (parent.children)
          parent.children = parent.children.filter(
            (child: any) => child.id !== action.deletedPublicationId
          );
        return parent;
      });
      return {
        ...state,
        publications: filteredPublications,
      };
    }
    default: {
      return state;
    }
  }
};

export default publicationsReducer;
