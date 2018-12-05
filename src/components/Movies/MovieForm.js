import React, { Component } from 'react';
import { Input } from './../../common/Input';
import FileUploader from 'react-firebase-file-uploader';
import firebaseConfig from './../../firebaseConfig';

class MovieForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      genre: '',
      director: '',
      cast: [],
      sinopsis: '',
      duration: '',
      release_date: '',
      rating: 0,
      rate: '',
      language: '',
      cover: '',
      movie_url: '',
      progress: 0,
      actor: {
        name: '',
        age: ''
      }
    }
  }

  handleInput = e => {
    const { id, value } = e.target;

    this.setState({
      [id]: value
    });
  }

  handleUploadError = error => {
    console.log(error);
  }

  progressFile = progress => {
    this.setState({
      progress
    });
  }

  handleUploadSuccess = filename => {
    this.setState({ progress: 100 });

    firebaseConfig.storage().ref('covers').child(filename).getDownloadURL().then(url => {
      return this.setState({ clver: url });
    }).catch(err => {
      console.log(err);
    })
  }

  addCast = () => {
    const newCast = this.state.actor;

    this.setState({
      cast: [ ...this.state.cast, newCast ],
      actor: {
        name: '',
        age: ''
      }
    });
  }

  handleCastInput = (e) => {
    const { id, value } = e.target;
    let newCast = { ...this.state.actor };
    newCast[id] = value;

    this.setState({
      actor: { ...newCast }
    })
  }

  CastInput = () => {
    return (
      <React.Fragment>
        <ul>
          {
            this.state.cast.map((actor, index) => (
              <li key={index}>{actor.name}</li>
            ))
          }
        </ul>
        <div className="col s6 input-field">
          <Input id="name" name="Nombre" type="text" value={this.state.actor.name} setInput={this.handleInput} required />
        </div>
        <div className="col s6 input-field">
          <Input id="age" name="Edad" type="text" value={this.state.actor.age} setInput={this.handleInput} required />
        </div>
        <button className="waves-effect waves-light btn btn-primary" onClick={this.addCast}>Agregar</button>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="container">
        <form>
          <div className="row">
            <div className="col s10 input-field">
              <Input id="name" name="Title" type="text" value={this.state.name} setInput={this.handleInput} required />
            </div>
            <div className="col s10 input-field">
              <select id="genre" value={this.state.genre} onChange={this.handleInput}>
                <option value="ACTION">Action</option>
                <option value="SCIFY">Scify</option>
                <option value="DRAMA">Drama</option>
                <option value="COMEDY">Comedy</option>
                <option value="HORROR">Horror</option>
              </select>
              <label htmlFor="genre">Genre</label>
            </div>
            <div className="col s10 input-field">
              <Input id="director" name="Director" type="text" value={this.state.director} setInput={this.handleInput} required />
            </div>
            {this.CastInput()}

            <div className="col s10 input-field">
              <textarea id="sinopsis" name="Sinopsis" cols="30" rows="10" value={this.state.sinopsis} onChange={this.handleInput}></textarea>
              <label htmlFor="sinopsis">Sinopsis</label>
            </div>
            <div className="col s10 input-field">
              <Input id="duration" name="Duration" type="text" value={this.state.duration} setInput={this.handleInput} required />
            </div>
            <div className="col s10 input-field">
              <Input id="release_date" name="Release Date" type="text" value={this.state.release_date} setInput={this.handleInput} required />
            </div>
            <div className="col s10 input-field">
              <select id="rate" value={this.state.rate} onChange={this.handleInput}>
                <option value="A">Clasificación A</option>
                <option value="B">Clasificación B</option>
                <option value="C">Clasificación C</option>
                <option value="B15">Clasificación B15</option>
              </select>
              <label htmlFor="rate">Rate</label>
            </div>
            <div className="col s10 input-field">
              <Input id="language" name="Language" type="text" value={this.state.language} setInput={this.handleInput} required />
            </div>
            <div className="col s10 input-field">
              <Input id="movie_url" name="Movie URL" type="text" value={this.state.movie_url} setInput={this.handleInput} required />
            </div>
            <div className="col s10">
              <label className="btn btn-primary">
                <FileUploader
                  hidden
                  accept="image/*"
                  randomizeFilename storage={firebaseConfig.storage().ref('covers')}
                  onUploadError={this.handleUploadError}
                  onProgress={this.progressFile}
                  onUploadSuccess={this.handleUploadSuccess} />
                Agregar Cover
              </label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default MovieForm;
