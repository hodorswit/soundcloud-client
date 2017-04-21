// ACTION TYPES
const TRACKS_SET = "track/TRACKS_SET";
const TRACK_PLAY = "track/TRACK_PLAY";

// ACTION CREATORS
function doSetTracks(tracks) {
  return {
    type: TRACKS_SET,
    tracks
  };
}

function doPlayTrack(track) {
  return {
    type: TRACK_PLAY,
    track
  };
}

// REDUCER
const initialState = {
  tracks: [],
  activeTrack: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case TRACKS_SET:
      return applySetTracks(state, action);
    case TRACK_PLAY:
      return applySetPlay(state, action);
    default:
      return state;
  }
}

function applySetTracks(state, action) {
  const { tracks } = action;
  return { ...state, tracks };
}

function applySetPlay(state, action) {
  const { track } = action;
  return { ...state, activeTrack: track };
}

// EXPORTS
const actionCreators = {
  doSetTracks,
  doPlayTrack
};

const actionTypes = {
  TRACKS_SET,
  TRACK_PLAY
};

export { actionCreators, actionTypes };

export default reducer;
