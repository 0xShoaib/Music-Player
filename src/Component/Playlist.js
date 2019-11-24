import React from "react";

import classes from "./Playlist.module.css";

import PlaylistCard from "./PlaylistCard";

function Playlist(props) {
  const cards = props.playlistData.map(item => {
    return (
      <PlaylistCard
        key={item.id}
        id={item.id}
        albumCover={item.albumCover}
        artist={item.artist}
        track={item.track}
        onCardClick={props.onCardClick}
      />
    );
  });
  return <div className={classes.PlaylistWrapper}>{cards}</div>;
}

export default Playlist;
