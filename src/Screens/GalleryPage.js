import React, { Component } from 'react';
import {  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Stylesheets/GalleryPage.css'

import {connect} from 'react-redux';

import HomePage from './HomePage.js'
import NavBar from '../Components/NavBar.js';
import CardTatoo from '../Components/CardTatoo.js';
import TattooModal from '../Components/TattooModal.js';


class GalleryPage extends Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      pictureData:[],
      artistData:[]
    };
  }

  componentDidMount(){
    var ctx = this;

    //collecter les artists pour les stocker dans Redux
   fetch('http://localhost:3000/artists')
   .then(function(response){
    return response.json();
   })
   .then(function(data){
    var artistsDataCopy = [...ctx.state.artistData]
    data.map(function(map){
      artistsDataCopy.push(map)
    })
    ctx.setState({
      artistData: artistsDataCopy
     });
   })
   .catch(function(error){
    console.log('Request failed', error)
   })

   // collecter les photos pour les stocker sur Redux et pour les afficher dans la galerie
   fetch('http://localhost:3000/tattoos')
   .then(function(response) {
     return response.json();
   })
   .then(function(data) {
     var pictureDataCopy = [...ctx.state.pictureData]
     data.map(function(map){
       pictureDataCopy.push(map)
     })
     ctx.setState({
       pictureData: pictureDataCopy
      });
   })
   .catch(function(error) {
     console.log('Request failed', error)
   });
 }

  toggle() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  render(){
    //console.log("artistData fetch depuis Galerie", this.state.artistData);

    //create a CardTattoo for each tattoo picture in mLab
    let pictureList = this.state.pictureData.map(function(tattoo, i){
      return <CardTatoo
        key={i}
        tattooId={tattoo._id}
        tattooPhotoLink={tattoo.tattooPhotoLink}
        artistId={tattoo.artistID}
        tattooStyleList={tattoo.tattooStyleList}
      />
    })
    return(
      <div>
        <NavBar />
        <HomePage />
        <TattooModal />
        <div className="container">
          <div className="row gallery-container">
          {pictureList}
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    collectedArtists: function() {
        dispatch( {
          type: 'fetchArtists',
          artistData: this.state.artistData
      } )
    }}}

export default connect(
    null,
    mapDispatchToProps)(GalleryPage);
