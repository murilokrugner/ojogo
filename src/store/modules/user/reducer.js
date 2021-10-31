import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  config: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        draft.config = action.payload.config;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        draft.config = action.payload.config;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null;
        draft.config = null;
        break;
      }
      default:
    }
  });
}