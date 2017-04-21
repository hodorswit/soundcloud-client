import SC from "soundcloud";
import * as actionTypes from "../constants/actionTypes";
import { setTracks } from "../actions/track";

function setMe(user) {
  return {
    type: actionTypes.ME_SET,
    user
  };
}

export function auth(e) {
  return function(dispatch) {
    SC.connect({ redirect_uri: "http://localhost:8080/callback" })
      .then(session => {
        dispatch(fetchMe(session));
        dispatch(fetchStream(session));
      })
      .catch(error => console.error(error));
  };
}

function fetchMe(session) {
  return function(dispatch) {
    fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
      .then(response => response.json())
      .then(data => {
        dispatch(setMe(data));
      });
  };
}

function fetchStream(session) {
  return function(dispatch) {
    fetch(
      `//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`
    )
      .then(response => response.json())
      .then(data => {
        dispatch(setTracks(data.collection));
      });
  };
}
