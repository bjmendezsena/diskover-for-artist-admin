import challengesConstants from './constants';

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
} = challengesConstants;

const initialState = {
  loading: false,
  challenges: [],
};

const challengesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_NEW_CHALLENGE: {
      return {
        ...state,
        isNewChallenge: action.isNewChallenge,
      };
    }
    case SET_ADD_CHALLENGE_ERROR: {
      return {
        ...state,
        addChallengeError: action.addChallengeError,
      };
    }

    case SET_LOADING_CHALLENGES: {
      return {
        ...state,
        isLoadingChallenges: action.isLoadingChallenges,
      };
    }
    case SET_CHALLENGES: {
      return {
        ...state,
        challenges: action.challenges,
      };
    }
    case SET_SELECTED_CHALLENGES: {
      return {
        ...state,
        selectedChallenge: action.selectedChallenge,
      };
    }
    case SET_EDIT_CHALLENGE_ERROR: {
      return {
        ...state,
        editChallengeError: action.editChallengeError,
      };
    }
    case SET_EDITED_CHALLENGE: {
      return {
        ...state,
        isEditedChallenge: action.isEditedChallenge,
      };
    }
    case SET_DELETING_CHALLENGE: {
      return {
        ...state,
        deleting: action.isDeletingChallenge,
      };
    }
    case REMOVE_CHALLENGE: {
      const filteredParents = state.challenges.filter(
        (challenges: any) => challenges.id !== action.deletedChallengeId
      );
      const filteredChallenges = filteredParents.map((parent: any) => {
        if (parent.children)
          parent.children = parent.children.filter(
            (child: any) => child.id !== action.deletedChallengeId
          );
        return parent;
      });
      return {
        ...state,
        challenges: filteredChallenges,
      };
    }
    default: {
      return state;
    }
  }
};

export default challengesReducer;
