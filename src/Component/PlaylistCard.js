import React from "react";

import classes from "./PlaylistCard.module.css";

const PlaylistCard = props => {
  return (
    <div className={classes.PlaylistWrapper}>
      <div
        className={classes.Card}
        id={props.id}
        onClick={() => props.onCardClick(props.id)}
      >
        <img src={props.albumCover} alt="" />
        <div className={classes.Info}>
          <h3>{props.artist}</h3>
          <p>{props.track}</p>
        </div>
      </div>
    </div>
  );
};
export default PlaylistCard;
