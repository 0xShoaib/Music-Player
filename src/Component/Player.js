import React from "react";

import classes from "./Player.module.css";

function Player(props) {
  return (
    <div className={classes.playerContainer}>
      <audio
        ref={props.audioRef}
        onTimeUpdate={props.songProgress}
        onEnded={props.songEnd}
      >
        <source src={props.currentSongTrack.file} />
      </audio>

      <img src={props.currentSongTrack.albumCover} alt="" />
      <div className={classes.progressBarWrapper} onClick={props.seekClick}>
        <div
          className={classes.progressBar}
          style={{ width: `${props.trackProgress}%` }}
        ></div>
      </div>
      <div className={classes.Icons}>
        <i
          className="fas fa-random"
          onClick={props.shuffleSong}
          style={{ color: props.shuffleBtnStyle }}
          title="shuffle"
        ></i>
        <i
          className="fas fa-step-backward"
          onClick={props.restartSong}
          title="restart"
        ></i>
        {props.SongPlayStatus ? (
          <i
            className="far fa-pause-circle"
            onClick={props.pauseSong}
            title="pause"
          ></i>
        ) : (
          <i
            className="far fa-play-circle pBtn"
            onClick={props.playSong}
            title="play"
          ></i>
        )}
        <i
          className="fas fa-step-forward"
          onClick={props.nextSong}
          title="next"
        ></i>
        <i
          className="fas fa-undo"
          onClick={props.repeatSong}
          style={{ color: props.repeatBtnStyle }}
          title="repeat"
        ></i>
      </div>
      <div className={classes.Info}>
        <h3>{props.currentSongTrack.track}</h3>
        <h4>{props.currentSongTrack.artist}</h4>
      </div>
    </div>
  );
}

export default Player;
