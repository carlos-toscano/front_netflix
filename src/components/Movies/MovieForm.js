import React, { Component } from 'react';
import { Input } from './../../common/Input';
import FileUploader from 'react-firebase-file-uploader';
import firebaseConfig from './../../firebaseConfig';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'

const ADD_MOVIE = gql`
  mutation ADD_MOVIE($data: MovieInput!) {
    createMovie(data: $data) { _id, name }
  }
`;

class MovieForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      genre: 'ACTION',
      director: '',
      cast: [],
      sinopsis: '',
      duration: '',
      release_date: '',
      rating: 4.5,
      rate: 'A',
      language: '',
      cover: '',
      movie_url: '',
      progress: 0,
      actor: {
        castName: '',
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
      return this.setState({ cover: url });
    }).catch(err => {
      console.log(err);
    })
  }

  handleData = data => {
    this.props.history.push('/movies');
  }

  handleSubmit = (e, createMovie) => {
    e.preventDefault();

    let data = { ...this.state };

    delete data.progress;
    delete data.actor;

    createMovie({ variables: { data }});
  }

  addCast = e => {
    e.preventDefault();
    const newCast = {
      name: this.state.actor.castName,
      age: parseInt(this.state.actor.age)
    };

    this.setState({
      cast: [ ...this.state.cast, newCast ],
      actor: {
        castName: '',
        age: 0
      }
    });
  }

  handleCastInput = e => {
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
        <div className="col s10">
          <ul>
            {
              this.state.cast.map((actor, index) => (
                <li key={index}>{actor.name} - {actor.age}</li>
              ))
            }
          </ul>
        </div>
        <div className="col s5 input-field">
          <Input id="castName" name="Nombre" type="text" value={this.state.actor.castName} setInput={this.handleCastInput} />
        </div>
        <div className="col s5 input-field">
          <Input id="age" name="Edad" type="number" value={this.state.actor.age} setInput={this.handleCastInput} />
        </div>
        <div className="col s10">
          <a href="/" className="waves-effect waves-light btn btn-primary" onClick={this.addCast}>Agregar</a>
        </div>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="container">
        <Mutation mutation={ADD_MOVIE}>
          {
            (createMovie, { data, err }) => {
              if (err) console.log(err);
              if (data) this.handleData(data);

              return (
                <form onSubmit={e => this.handleSubmit(e, createMovie)}>
                  <div className="row">
                    <div className="col s10 input-field">
                      <Input id="name" name="Titulo" type="text" value={this.state.name} setInput={this.handleInput} required />
                    </div>
                    <div className="col s10">
                      <label>Genre</label>
                      <select id="genre" value={this.state.genre} onChange={this.handleInput} className="browser-default">
                        <option value="ACTION">Action</option>
                        <option value="SCIFY">Scify</option>
                        <option value="DRAMA">Drama</option>
                        <option value="COMEDY">Comedy</option>
                        <option value="HORROR">Horror</option>
                      </select>
                    </div>
                    <div className="col s10 input-field">
                      <Input id="director" name="Director" type="text" value={this.state.director} setInput={this.handleInput} required />
                    </div>
                    {this.CastInput()}

                    <div className="col s10 input-field">
                      <textarea id="sinopsis" name="Sinopsis" cols="30" rows="10" value={this.state.sinopsis} onChange={this.handleInput} className="materialize-textarea"></textarea>
                      <label htmlFor="sinopsis">Sinopsis</label>
                    </div>
                    <div className="col s10 input-field">
                      <Input id="duration" name="Duración" type="text" value={this.state.duration} setInput={this.handleInput} required />
                    </div>
                    <div className="col s10 input-field">
                      <Input id="release_date" name="Lanzamiento" type="text" value={this.state.release_date} setInput={this.handleInput} required />
                    </div>
                    <div className="col s10">
                    <label htmlFor="rate">Clasificación</label>
                      <select id="rate" value={this.state.rate} onChange={this.handleInput} className="browser-default">
                        <option value="A">Clasificación A</option>
                        <option value="B">Clasificación B</option>
                        <option value="C">Clasificación C</option>
                        <option value="B15">Clasificación B15</option>
                      </select>
                    </div>
                    <div className="col s10 input-field">
                      <Input id="language" name="Idioma" type="text" value={this.state.language} setInput={this.handleInput} required />
                    </div>
                    <div className="col s10 input-field">
                      <Input id="movie_url" name="Movie URL" type="text" value={this.state.movie_url} setInput={this.handleInput} required />
                    </div>
                    <div className="col s10">
                      <label className="btn btn-primary">
                        <FileUploader
                          hidden
                          accept="image/*"
                          randomizeFilename
                          storageRef={firebaseConfig.storage().ref('covers')}
                          onUploadError={this.handleUploadError}
                          onProgress={this.progressFile}
                          onUploadSuccess={this.handleUploadSuccess} />
                        Agregar Cover
                      </label>
                      <span>Progreso: {this.state.progress}%</span>
                    </div>
                  </div>
                  <button type="submit" className="wave-effect wave-light btn btn-primary"
                    disabled={this.state.progress === 100 ? false : true}
                  >Agregar Película</button>
                </form>
              )
            }
          }
        </Mutation>
      </div>
    );
  }
}

export default MovieForm;
