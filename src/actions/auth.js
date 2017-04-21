import SC from "soundcloud";
import * as actionTypes from "../constants/actionTypes";

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
