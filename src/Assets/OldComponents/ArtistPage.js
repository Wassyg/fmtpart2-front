import React, { Component } from 'react';

//Import des composants externes
import NavBar from '../Components/NavBar.js';
import ArtistCard from '../Assets/OldComponents/ArtistCard.js';

//Import des librairies ou composants de style
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col}  from 'reactstrap';
import '../Stylesheets/ArtistPage.css';

//Import de la librairie leaflet / open street map
import L from 'leaflet';



//// Composant qui affiche tous ////

class ArtistPage extends Component{

  constructor(props) {
    super(props);
    this.state = { collapse: false , artistData:[]};
  }

  componentDidMount() {
    // find all artist
    var ctx = this;
    fetch('url/artists')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let artistDataCopy = [...ctx.state.artistData]
      data.map(function(map){
         artistDataCopy.push(map)

      })
      ctx.setState({artistData: artistDataCopy});

      for (var i = 0; i < ctx.state.artistData.length; i++) {
        // Add marker
        ctx.marker = L.marker([ctx.state.artistData[i].artistAddressLat, ctx.state.artistData[i].artistAddressLon]).addTo(ctx.map);
        // Add popup to marker with artistNickname
        ctx.marker.bindPopup(ctx.state.artistData[i].artistNickname);
      }

    })
    .catch(function(error) {
      console.log('Request failed', error)
    });

    // create map
    this.map = L.map('map', {
      center: [48.852969, 2.349903],
      zoom: 12,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });


  }
  render(){

    var artistListCards = this.state.artistData.map(function(artist,i){
      return <ArtistCard
        key={i}
        artistNickname={artist.artistNickname}
        artistCompany={artist.artistCompany}
        artistStyle={artist.artistStyleList.join(" ")}
        artistPhotoLink={artist.artistPhotoLink}/>
    });

    return(
      <div >
        <NavBar/>
        <Container>
          <Row>
            <Col xs="12" md="6">
              <Row>
                {artistListCards}
              </Row>
            </Col>
            <Col xs="12" md="6">
              <div id="map"></div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}




export default ArtistPage;
