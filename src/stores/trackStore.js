import { observable, action, computed } from "mobx";
import _ from "lodash";

class TrackStore {
  @observable tracks;
  @observable activeTrackId;

  constructor(tracks = []) {
    this.tracks = tracks;
    this.activeTrackId = null;
  }

  @computed get activeTrack() {
    let activeTrack = null;
    this.tracks.forEach(track => {
      if (track.id === this.activeTrackId) {
        activeTrack = track;
      }
    });
    console.log(activeTrack);
    return activeTrack;
  }

  @action likeTrack(track) {
    const index = this.tracks.findIndex(t => t.id === track.id);
    this.tracks[index] = { ...track, user_favorite: !track.user_favorite };
  }

  @action setTracks(tracks) {
    this.tracks = tracks;
  }

  @action playTrack(id) {
    this.activeTrackId = id;
  }
}

const trackStore = new TrackStore();

export default trackStore;
export { TrackStore };
