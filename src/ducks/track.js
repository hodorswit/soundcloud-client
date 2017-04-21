import { findIndex } from "lodash";
import trackSchema from "../schemas/track";

// ACTION TYPES
const TRACKS_SET = "track/TRACKS_SET";
const TRACK_PLAY = "track/TRACK_PLAY";
const TRACK_LIKE = "track/TRACK_LIKE";

// ACTION CREATORS
function doSetTracks(trackEntities, trackIds) {
  return {
    type: TRACKS_SET,
    trackEntities,
    trackIds
  };
}

function doPlayTrack(trackId) {
  return {
    type: TRACK_PLAY,
    trackId
  };
}

function doLikeTrack(trackId) {
  return {
    type: TRACK_LIKE,
    trackId
  };
}

// REDUCER
const initialState = {
  trackEntities: {},
  trackIds: [],
  activeTrackId: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case TRACKS_SET:
      return applySetTracks(state, action);
    case TRACK_PLAY:
      return applySetPlay(state, action);
    case TRACK_LIKE:
      return applySetLike(state, action);
    default:
      return state;
  }
}

function applySetTracks(state, action) {
  const { trackEntities, trackIds } = action;
  return { ...state, trackEntities, trackIds };
}

function applySetPlay(state, action) {
  const { trackId } = action;
  return { ...state, activeTrackId: trackId };
}

function applySetLike(state, action) {
  const { trackId } = action;
  const newTrack = {
    ...state.trackEntities[trackId],
    user_favorite: !state.trackEntities[trackId].user_favorite
  };
  return {
    ...state,
    trackEntities: { ...state.trackEntities, [trackId]: newTrack }
  };
}

// EXPORTS
const actionCreators = {
  doSetTracks,
  doPlayTrack,
  doLikeTrack
};

const actionTypes = {
  TRACKS_SET,
  TRACK_PLAY,
  TRACK_LIKE
};

export { actionCreators, actionTypes, trackSchema };

export default reducer;
