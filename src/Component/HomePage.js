import React, { Component } from "react";
import axios from "axios";

import classes from "./HomePage.module.css";
import Player from "./Player";
import Playlist from "./Playlist";
import Loader from "./Loader";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LoadingStatus: true,
      PlaylistData: [],
      SongPlayStatus: false,
      Progress: 0,
      currentSongPos: 0,
      repeatSongStatus: false,
      repeatBtnStyle: "",
      shuffleSongStatus: false,
      shuffleBtnStyle: ""
    };
    this.MusicPlayer = React.createRef();
  }

  playSong = () => {
    this.MusicPlayer.current.load();
    this.MusicPlayer.current.play();
    this.setState({ SongPlayStatus: true });
  };

  pauseSong = () => {
    this.MusicPlayer.current.pause();
    this.setState({ SongPlayStatus: false });
  };

  songProgress = e => {
    // const currentProgress = parseInt(
    //   (e.target.currentTime / e.target.duration) * 100,
    //   10
    // );
    // this.setState({ Progress: currentProgress });

    const currentTime = e.target.currentTime;
    const totalTime = e.target.duration;
    const currentProgress = parseInt((currentTime / totalTime) * 100, 10);
    this.setState({ Progress: currentProgress });
  };

  nextSong = e => {
    if (this.state.repeatSongStatus) {
      e.target.currentTime = 0;
      this.setState({ Progress: 0 });
    } else if (this.state.shuffleSongStatus) {
      this.setState({
        currentSongPos: Math.floor(
          Math.random() * this.state.PlaylistData.length
        ),
        SongPlayStatus: true
      });
    } else {
      if (this.state.currentSongPos <= 6) {
        this.setState({
          currentSongPos: this.state.currentSongPos + 1,
          SongPlayStatus: true
        });
      } else if (this.state.currentSongPos === 7) {
        this.setState({
          currentSongPos: 0,
          SongPlayStatus: true
        });
      }
    }
    this.MusicPlayer.current.load();
    this.MusicPlayer.current.play();
  };

  restartSong = e => {
    e.target.currentTime = 0;
    this.setState({ Progress: 0 });
    this.MusicPlayer.current.load();
    this.MusicPlayer.current.play();
  };

  repeatSong = () => {
    if (this.state.repeatSongStatus) {
      this.setState({ repeatSongStatus: false, repeatBtnStyle: "" });
    } else {
      this.setState({
        repeatSongStatus: true,
        repeatBtnStyle: "#000",
        shuffleSongStatus: false,
        shuffleBtnStyle: ""
      });
    }
  };

  shuffleSong = () => {
    if (this.state.shuffleSongStatus) {
      this.setState({ shuffleSongStatus: false, shuffleBtnStyle: "" });
    } else {
      this.setState({
        shuffleSongStatus: true,
        shuffleBtnStyle: "#000",
        repeatSongStatus: false,
        repeatBtnStyle: ""
      });
    }
  };

  songEnd = () => {
    if (this.state.repeatSongStatus) {
      this.setState({
        currentSongPos: this.state.currentSongPos,
        SongPlayStatus: true
      });
    } else if (this.state.shuffleSongStatus) {
      this.setState({
        currentSongPos: Math.floor(
          Math.random() * this.state.PlaylistData.length
        ),
        SongPlayStatus: true
      });
    } else if (this.state.currentSongPos <= 6) {
      this.setState({
        currentSongPos: this.state.currentSongPos + 1,
        SongPlayStatus: true
      });
    } else if (this.state.currentSongPos === 7) {
      this.setState({
        currentSongPos: 0,
        SongPlayStatus: true
      });
    }
    this.MusicPlayer.current.load();
    this.MusicPlayer.current.play();
  };

  seekClick = e => {
    const per = e.nativeEvent.offsetX / e.target.offsetWidth;
    const duration = per * this.MusicPlayer.current.duration;
    this.MusicPlayer.current.currentTime = duration;
    this.setState({
      Progress: duration
    });
  };

  cardClick = id => {
    this.setState({
      currentSongPos: id - 1,
      SongPlayStatus: true
    });
    this.MusicPlayer.current.load();
    this.MusicPlayer.current.play();
  };

  componentDidMount() {
    axios
      .get("https://5dd1894f15bbc2001448d28e.mockapi.io/playlist")
      .then(response => {
        this.setState({ PlaylistData: response.data, LoadingStatus: false });
      })
      .catch(() => {
        alert("Failed to load data from backend");
      });
  }

  render() {
    const currentSongTrack =
      this.state.PlaylistData.length === 0
        ? 0
        : this.state.PlaylistData[this.state.currentSongPos];
    return (
      <div className={classes.Container}>
        {this.state.LoadingStatus ? (
          <Loader />
        ) : (
          <div>
            <Player
              currentSongTrack={currentSongTrack}
              audioRef={this.MusicPlayer}
              playSong={this.playSong}
              pauseSong={this.pauseSong}
              nextSong={this.nextSong}
              restartSong={this.restartSong}
              repeatSong={this.repeatSong}
              repeatBtnStyle={this.state.repeatBtnStyle}
              shuffleSong={this.shuffleSong}
              shuffleBtnStyle={this.state.shuffleBtnStyle}
              songProgress={this.songProgress}
              trackProgress={this.state.Progress}
              seekClick={this.seekClick}
              songEnd={this.songEnd}
              SongPlayStatus={this.state.SongPlayStatus}
            />
            <Playlist
              playlistData={this.state.PlaylistData}
              onCardClick={this.cardClick}
            />
          </div>
        )}
      </div>
    );
  }
}
export default HomePage;
