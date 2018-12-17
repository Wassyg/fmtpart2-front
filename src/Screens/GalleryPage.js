import React, { Component } from 'react';
import {  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Stylesheets/GalleryPage.css'


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
      pictureData:[]
    };
  }

  componentDidMount(){
    var ctx = this;
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
    // console.log("Je capte le back ?", this.state.pictureData);

    //create a CardTattoo for each tattoo picture in mLab 
    let pictureList = this.state.pictureData.map(function(map, i){
      return <CardTatoo
        key={i}
        tattooId={map._id}
        tattooPhotoLink={map.tattooPhotoLink}
        artistId={map.artistID}
        tattooStyleList={map.tattooStyleList}  />
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


export default GalleryPage;
