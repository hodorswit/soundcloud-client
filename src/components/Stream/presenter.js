import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";

class LikeButton extends Component {
  render() {
    const { track } = this.props;
    return (
      <span>
        {track.user_favorite
          ? <button type="button" onClick={() => this.likeTrack(track)}>
              Unlike
            </button>
          : <button type="button" onClick={() => this.likeTrack(track)}>
              Like
            </button>}
      </span>
    );
  }

  likeTrack = track => {
    this.props.onLike(track);
  };
}

@observer class Stream extends Component {
  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    if (!audioElement) return;

    const { activeTrackId } = this.props;

    if (activeTrackId) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  render() {
    const {
      me,
      tracks,
      activeTrack,
      clientId,
      onAuth,
      onPlay,
      onLike
    } = this.props;

    return (
      <div>
        <div>
          {me
            ? <div>{me.username}</div>
            : <button onClick={onAuth} type="button">Login</button>}
        </div>
        <br />
        <div>
          {tracks.map((track, key) => {
            return (
              <div className="track" key={key}>
                {track.title}
                <button type="button" onClick={() => onPlay(track)}>
                  Play
                </button>
                <LikeButton track={track} onLike={onLike} />
              </div>
            );
          })}
        </div>
        {activeTrack
          ? <div>
              <div>
                Playing: {activeTrack.title}
                <LikeButton track={activeTrack} onLike={onLike} />
              </div>
              <audio
                id="audio"
                ref="audio"
                src={`${activeTrack.stream_url}?client_id=${clientId}`}
              />
            </div>
          : null}
      </div>
    );
  }
}

export default Stream;
