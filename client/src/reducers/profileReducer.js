import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";

const innitialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = innitialState, action) {
  switch (action.type) {
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
