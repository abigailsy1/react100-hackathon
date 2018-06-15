import React, { Component } from 'react';
import axios from 'axios';
import List from './List';
import FilmList from './FilmList';
import PhotosList from './PhotosList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      films: [],
      photos: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.getPeople = this.getPeople.bind(this);
    this.getFilms = this.getFilms.bind(this);
    this.gettyImages = this.gettyImages.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  componentDidMount() {
    this.getPeople();
    this.getFilms();
    this.gettyImages();
  }
  getPeople() {
    axios.get("https://swapi.co/api/people/")
      .then((response) => {
        console.log(response.data.results);
        this.setState({ people: response.data.results })
      })
  }
  getFilms() {
    axios.get("https://swapi.co/api/films/")
      .then((response) => {
        console.log(response.data.results);
        this.setState({ films: response.data.results })
      })
  }
  gettyImages() {
    axios.get("https://pixabay.com/api/?key=9293006-5324a344b892df0457c4e1b0f&q="+encodeURIComponent('star wars'))
    .then((response)=> {
      console.log(response.data.hits);
      this.setState({photos: response.data.hits})
    })

  }


  render() {
    const { people } = this.state;
    const { films } = this.state;
    const { photos } = this.state;

    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="text-center display-1">STAR WARS</h1>
          <p className="text-center text-white">Star Wars photos, characters and films pulled from different APIs.</p>
        </div>

        {/* <div className="input-group">
        <input refs="searching" type="text" className="col-lg-4 col-lg-offset-4 bg-dark text-white" onChange={this.handleChange} placeholder="Search..."></input>
        <button type="submit" className="btn btn-link">
          <span className="glyphicon glyphicon-search " />
        </button>
      </div> */}
        <div className="card">
        <div className="card-header text-dark">PHOTOS:</div>
          <div className="card-body">
          
            <PhotosList photos={photos} />
          </div>
        </div>
        <br/>
        <br/>

        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header text-dark">CHARACTERS:</div>
              <div className="card-body">
                <List people={people} />
                <br />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-header text-dark">MOVIES:</div>
              <div className="card-body">
                <FilmList films={films} />
              </div>
            </div>
          </div>


        </div>
      </div>

    );
  }
}

export default App;

