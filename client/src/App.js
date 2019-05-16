import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import "./App.css";
import Song from "./classes/Song.class.js";
import ControlsBar from "./components/ControlsBar";
import VisualizerComponent from "./components/VisualizerComponent";
import AuthComponent from "./components/AuthComponent";
import Services from "./tools/Services";
import CreatorComponent from "./components/CreatorComponent";
import LoadComponent from "./components/LoadComponent";
import SaveComponent from "./components/SaveComponent";

class App extends React.Component {
  constructor() {
    super();
    this.services = new Services();
  }

  state = {
    user: null,
    song: new Song(),
    userSongs: [],
    tempo: 130,
    isPlaying: false
  };

  componentDidMount() {
    this.fetchUser();
  }

  signup(credentials) {
    this.services.signup(credentials).then(data => {
      this.setState({
        ...this.state,
        user: data
      });
    });
  }

  login(credentials) {
    this.services.login(credentials).then(data => {
      const user = data;
      this.services.getUserSongs().then(data => {
        const newUserSongs = [...this.state.userSongs].concat(data);
        this.setState({
          ...this.state,
          user: user,
          userSongs: newUserSongs
        });
      });
    });
  }

  logout() {
    this.services.logout().then(data => {
      this.setState({
        ...this.state,
        user: null
      });
    });
  }

  fetchUser() {
    this.services
      .isLoggedIn()
      .then(data => {
        const user = data;
        this.services.getUserSongs().then(data => {
          const newUserSongs = [...this.state.userSongs].concat(data);
          this.setState({
            ...this.state,
            user: user,
            userSongs: newUserSongs
          });
        });
      })
      .catch(err => {
        this.setState({
          ...this.state,
          user: null
        });
      });
  }

  //SONG
  updateSongtempo(newTempo) {
    const tempo = newTempo;
    this.state.song.updateTempo(tempo);
    this.setState({
      ...this.state,
      tempo: tempo
    });
  }

  play() {
    this.state.song.play();
    this.setState({
      ...this.state,
      isPlaying: true
    });
  }

  stop() {
    this.state.song.stop();
    this.setState({
      ...this.state,
      isPlaying: false
    });
  }

  exportSongData(name) {
    console.log(this.state.song.exportSongData(name));
    this.services.saveSong(this.state.song.exportSongData(name)).then(data => {
      this.fetchUser();
      this.props.history.push("/creator");
    });
  }

  getUserSongs() {
    this.services.getUserSongs().then(data => {
      const newUserSongs = [...this.state.userSongs].concat(data);
      this.setState({
        ...this.state,
        userSongs: newUserSongs
      });
    });
  }

  newSong() {
    this.setState(
      {
        ...this.state,
        song: new Song(),
        tempo: 130,
        isPlaying: false
      },
      this.props.history.push("/creator")
    );
  }

  loadSongData(songData) {
    this.state.song.stop();

    const newSong = new Song();
    newSong.updateTempo(songData.tempo);

    const synthsData = songData.instruments.synths;
    synthsData.forEach((synthData, idx) => {
      const { oscillator, envelope } = { ...synthData };
      if (oscillator.oscType) {
        oscillator.type = oscillator.oscType;
        delete oscillator.oscType;
      }

      newSong.addBasicSynth(idx, oscillator.type);
      newSong.updateSynth(idx, { oscillator, envelope });
      newSong.updateSynthSequence(idx, synthData.notes);
    });

    const samplersData = songData.instruments.samplers;
    samplersData.forEach((samplerData, idx) => {
      newSong.addSampler(idx, samplerData.style);
      newSong.updateSamplerSequence(idx, samplerData.notes);
    });

    this.setState(
      {
        ...this.state,
        song: newSong,
        tempo: songData.tempo
      },
      () => {
        this.props.history.push("/creator");
      }
    );
  }

  //SYNTHS
  getSynths() {
    return this.state.song.getSynths();
  }

  addNewBasicSynth() {
    const newSong = { ...this.state.song };
    newSong.instruments = this.state.song.addBasicSynth(
      this.state.song.instruments.length
    );
    this.setState({
      ...this.state,
      song: newSong
    });
  }

  updateSynth(idx, props) {
    const newSong = { ...this.state.song };
    newSong.instruments = this.state.song.updateSynth(idx, props);
    this.setState({
      ...this.state,
      song: newSong
    });
  }

  updateSynthSequence(idx, notes) {
    this.state.song.updateSynthSequence(idx, notes);
  }

  activateSynth(idx) {
    this.state.song.activateSynth(idx);
  }

  //SAMPLER
  getSamplers() {
    return this.state.song.getSamplers();
  }

  addNewSampler() {
    const newSong = { ...this.state.song };
    newSong.instruments = this.state.song.addSampler(
      this.state.song.instruments.length
    );
    this.setState({
      ...this.state,
      song: newSong
    });
  }

  updateSampler(idx, style) {
    const newSong = { ...this.state.song };
    newSong.instruments = this.state.song.updateSampler(idx, style);
    this.setState({
      ...this.state,
      song: newSong
    });
  }

  updateSamplerSequence(idx, notes) {
    this.state.song.updateSamplerSequence(idx, notes);
  }

  activateSampler(idx) {
    this.state.song.activateSampler(idx);
  }

  renderAuthComponent() {
    return !this.state.user ? (
      <AuthComponent
        login={credentials => this.login(credentials)}
        signup={credentials => this.signup(credentials)}
      />
    ) : (
      <Redirect to="/creator" />
    );
  }

  renderCreatorComponent() {
    return !this.state.user ? (
      <Redirect to="/" />
    ) : (
      <CreatorComponent
        getSynths={() => this.getSynths()}
        getSamplers={() => this.getSamplers()}
        addNewBasicSynth={() => this.addNewBasicSynth()}
        updateSynth={(idx, props) => this.updateSynth(idx, props)}
        updateSynthSequence={(idx, notes) =>
          this.updateSynthSequence(idx, notes)
        }
        activateSynth={idx => this.activateSynth(idx)}
        addNewSampler={() => this.addNewSampler()}
        updateSampler={(idx, style) => this.updateSampler(idx, style)}
        updateSamplerSequence={(idx, notes) =>
          this.updateSamplerSequence(idx, notes)
        }
        activateSampler={idx => this.activateSampler(idx)}
      />
    );
  }

  renderVisualizerComponent() {
    return !this.state.user ? <Redirect to="/" /> : <VisualizerComponent />;
  }

  renderLoadComponent() {
    return !this.state.user ? (
      <Redirect to="/" />
    ) : (
      <LoadComponent
        userSongs={this.state.userSongs}
        loadSongData={songData => this.loadSongData(songData)}
      />
    );
  }

  renderSaveComponent() {
    return !this.state.user ? (
      <Redirect to="/" />
    ) : (
      <SaveComponent saveSongData={name => this.exportSongData(name)} />
    );
  }

  render() {
    return (
      <div className="App">
        <ControlsBar
          user={this.state.user}
          logout={() => this.logout()}
          isPlaying={this.state.isPlaying}
          tempo={this.state.tempo}
          play={() => this.play()}
          stop={() => this.stop()}
          newSong={() => this.newSong()}
          exportSongData={() => this.exportSongData()}
          updateSongTempo={newTempo => this.updateSongtempo(newTempo)}
        />
        <Switch>
          <Route exact path="/" render={() => this.renderAuthComponent()} />
          <Route
            path="/visualizer"
            render={() => this.renderVisualizerComponent()}
          />
          <Route
            path="/creator"
            render={() => {
              return this.renderCreatorComponent();
            }}
          />
          <Route
            path="/load"
            render={() => {
              return this.renderLoadComponent();
            }}
          />
          <Route
            path="/save"
            render={() => {
              return this.renderSaveComponent();
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
