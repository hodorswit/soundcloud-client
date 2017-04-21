import SC from "soundcloud";
import { actionCreators as trackActionCreators } from "./track";
import trackSchema from "../schemas/track";
import { map } from "lodash";
import { schema, normalize } from "normalizr";

// ACTION TYPES
const ME_SET = "auth/ME_SET";

// ACTION CREATORS
function doSetMe(user) {
  return {
    type: ME_SET,
    user
  };
}

function doAuth() {
  return function(dispatch) {
    SC.connect().then(session => {
      dispatch(doFetchMe(session));
      dispatch(doFetchStream(session));
    });
  };
}

function doFetchMe(session) {
  return function(dispatch) {
    fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
      .then(response => response.json())
      .then(data => {
        dispatch(doSetMe(data));
      });
  };
}

function doFetchStream(session) {
  return function(dispatch) {
    fetch(
      `//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`
    )
      .then(response => response.json())
      .then(data => {
        const normalized = normalize(map(data.collection, "origin"), [
          trackSchema
        ]);
        dispatch(
          trackActionCreators.doSetTracks(
            normalized.entities.tracks,
            normalized.result
          )
        );
      });
  };
}

// REDUCERS
const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ME_SET:
      return applySetMe(state, action);
    default:
      return state;
  }
}

function applySetMe(state, action) {
  const { user } = action;
  return { ...state, user };
}

const actionCreators = {
  doAuth
};

const actionTypes = {
  ME_SET
};

export { actionCreators, actionTypes };

export default reducer;
