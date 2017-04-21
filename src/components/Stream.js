import React from "react";

export default function Stream({ tracks = [] }) {
  return (
    <div>
      {tracks.map((track, key) => {
        return (
          <div className="track" key={key}>
            {track.title}
          </div>
        );
      })}
    </div>
  );
}
