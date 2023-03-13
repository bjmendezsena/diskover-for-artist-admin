import publicationsConstants from './constants';
import publicationsServices from './services';

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

const setLoadingPublications = (isLoadingPublications: boolean) => ({
  type: SET_LOADING_PUBLICATIONS,
  isLoadingPublications,
});
const setPublications = (publications: any) => ({
  type: SET_PUBLICATIONS,
  publications,
});

export const fetchAllPublications = (type: String) => {
  return (dispatch: any) => {
    dispatch(setLoadingPublications(true));
    publicationsServices
      .fetchAll(type)
      .then((res) => {
        dispatch(setLoadingPublications(false));
        return dispatch(setPublications(res.data.response));
      })
      .catch(() => {
        dispatch(setPublications([]));
        dispatch(setLoadingPublications(false));
      });
  };
};

const setAddPublicationError = (addPublicationError: String | null) => ({
  type: SET_ADD_PUBLICATION_ERROR,
  addPublicationError,
});

const setNewPublication = (isNewPublication: boolean) => ({
  type: SET_NEW_PUBLICATION,
  isNewPublication,
});

export const newPublication = (
  title: String,
  image: String,
  semillas: Number,
  url: String,
  type: String,
  callback?: any
) => {
  return (dispatch: any) => {
    dispatch(setNewPublication(true));
    dispatch(setAddPublicationError(null));
    publicationsServices
      .newPublication(title, image, semillas, url, type)
      .then((res: any) => {
        if (callback) callback();
        dispatch(setNewPublication(false));
        dispatch(fetchAllPublications(type));
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status !== 500 &&
          err.response.data &&
          err.response.data.errors.message
        ) {
          dispatch(setAddPublicationError(err.response.data.errors.message));
        } else {
          dispatch(setAddPublicationError('Ha ocurrido un error'));
        }
        dispatch(setNewPublication(false));
      });
  };
};

const setSelectedPublication = (selectedPublication: any) => ({
  type: SET_SELECTED_PUBLICATIONS,
  selectedPublication,
});

export const fetchById = (id: String) => {
  return (dispatch: any) => {
    publicationsServices.fetchById(id).then((res) => {
      return dispatch(setSelectedPublication(res.data.response));
    });
  };
};

const setEditPublicationError = (editPublicationError: String | null) => ({
  type: SET_EDIT_PUBLICATION_ERROR,
  editPublicationError,
});

const setEditPublication = (isEditedPublication: boolean) => ({
  type: SET_EDITED_PUBLICATION,
  isEditedPublication,
});

export const editPublication = (
  id: String,
  title: String,
  image: String,
  semillas: Number,
  url: String,
  type: String,
  callback?: any
) => {
  return (dispatch: any) => {
    dispatch(setEditPublication(true));
    dispatch(setEditPublicationError(null));
    publicationsServices
      .updatePublication(id, title, image, semillas, url)
      .then((res: any) => {
        if (callback) callback();
        dispatch(setEditPublication(false));
        dispatch(fetchAllPublications(type));
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status !== 500 &&
          err.response.data &&
          err.response.data.errors.message
        ) {
          dispatch(setEditPublicationError(err.response.data.errors.message));
        } else {
          dispatch(setEditPublicationError('Ha ocurrido un error'));
        }
        dispatch(setEditPublication(false));
      });
  };
};

const setDeletingPublication = (isDeletingPublication: boolean) => ({
  type: SET_DELETING_PUBLICATION,
  isDeletingPublication,
});
const removePublication = (deletedPublicationId: String) => ({
  type: REMOVE_PUBLICATION,
  deletedPublicationId,
});

export const deletePublication = (id: String, callback: any) => {
  return (dispatch: any) => {
    dispatch(setDeletingPublication(true));
    publicationsServices.delete(id).then((res) => {
      dispatch(setDeletingPublication(false));
      if (callback) callback();
      return dispatch(removePublication(id));
    });
  };
};
