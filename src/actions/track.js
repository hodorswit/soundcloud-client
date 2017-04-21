import * as actionTypes from "../constants/actionTypes";

export function setTracks(tracks) {
  return {
    type: actionTypes.TRACKS_SET,
    tracks
  };
}

export function playTrack(track) {
  console.log(track);
  return {
    type: actionTypes.TRACK_PLAY,
    track
  };
}
