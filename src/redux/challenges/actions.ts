import challengeConstants from './constants';
import challengeServices from './services';

const {
  SET_NEW_CHALLENGE,
  SET_ADD_CHALLENGE_ERROR,
  SET_LOADING_CHALLENGES,
  SET_CHALLENGES,
  SET_SELECTED_CHALLENGES,
  SET_EDIT_CHALLENGE_ERROR,
  SET_EDITED_CHALLENGE,
  SET_DELETING_CHALLENGE,
  REMOVE_CHALLENGE,
} = challengeConstants;

const setLoadingChallenges = (isLoadingChallenges: boolean) => ({
  type: SET_LOADING_CHALLENGES,
  isLoadingChallenges,
});
const setChallenges = (challenges: any) => ({
  type: SET_CHALLENGES,
  challenges,
});

export const fetchAllChallenges = (type: String) => {
  return (dispatch: any) => {
    dispatch(setLoadingChallenges(true));
    challengeServices
      .fetchAll(type)
      .then((res) => {
        dispatch(setLoadingChallenges(false));
        return dispatch(setChallenges(res.data.response));
      })
      .catch(() => {
        dispatch(setChallenges([]));
        dispatch(setLoadingChallenges(false));
      });
  };
};

const setAddChallengeError = (addChallengeError: String | null) => ({
  type: SET_ADD_CHALLENGE_ERROR,
  addChallengeError,
});

const setNewChallenge = (isNewChallenge: boolean) => ({
  type: SET_NEW_CHALLENGE,
  isNewChallenge,
});

export const newChallenge = (
  title: String,
  category: String,
  points: Number,
  image: String,
  text: String,
  type: String,
  callback?: any
) => {
  return (dispatch: any) => {
    dispatch(setNewChallenge(true));
    dispatch(setAddChallengeError(null));
    challengeServices
      .newChallenge(title, category, points, image, text, type)
      .then((res: any) => {
        if (callback) callback();
        dispatch(setNewChallenge(false));
        dispatch(fetchAllChallenges(type));
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status !== 500 &&
          err.response.data &&
          err.response.data.errors.message
        ) {
          dispatch(setAddChallengeError(err.response.data.errors.message));
        } else {
          dispatch(setAddChallengeError('Ha ocurrido un error'));
        }
        dispatch(setNewChallenge(false));
      });
  };
};

const setSelectedChallenge = (selectedChallenge: any) => ({
  type: SET_SELECTED_CHALLENGES,
  selectedChallenge,
});

export const fetchById = (id: String) => {
  return (dispatch: any) => {
    challengeServices.fetchById(id).then((res) => {
      return dispatch(setSelectedChallenge(res.data.response));
    });
  };
};

const setEditChallengeError = (editChallengeError: String | null) => ({
  type: SET_EDIT_CHALLENGE_ERROR,
  editChallengeError,
});

const setEditChallenge = (isEditedChallenge: boolean) => ({
  type: SET_EDITED_CHALLENGE,
  isEditedChallenge,
});

export const editChallenge = (
  id: String,
  title: String,
  category: String,
  points: Number,
  text: String,
  type: String,
  callback?: any
) => {
  return (dispatch: any) => {
    dispatch(setEditChallenge(true));
    dispatch(setEditChallengeError(null));
    challengeServices
      .updateChallenge(id, title, category, points, text)
      .then((res: any) => {
        if (callback) callback();
        dispatch(setEditChallenge(false));
        dispatch(fetchAllChallenges(type));
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status !== 500 &&
          err.response.data &&
          err.response.data.errors.message
        ) {
          dispatch(setEditChallengeError(err.response.data.errors.message));
        } else {
          dispatch(setEditChallengeError('Ha ocurrido un error'));
        }
        dispatch(setEditChallenge(false));
      });
  };
};

const setDeletingChallenge = (isDeletingChallenge: boolean) => ({
  type: SET_DELETING_CHALLENGE,
  isDeletingChallenge,
});
const removeChallenge = (deletedChallengeId: String) => ({
  type: REMOVE_CHALLENGE,
  deletedChallengeId,
});

export const deleteChallenge = (id: String, callback: any) => {
  return (dispatch: any) => {
    dispatch(setDeletingChallenge(true));
    challengeServices.delete(id).then((res) => {
      dispatch(setDeletingChallenge(false));
      if (callback) callback();
      return dispatch(removeChallenge(id));
    });
  };
};
