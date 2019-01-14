//Alimente UserPage

import React from 'react';

import {connect} from 'react-redux';

import CardTatoo from '../Components/CardTatoo.js';

import 'bootstrap/dist/css/bootstrap.css';
import '../Stylesheets/FavTattoosProfile.css';
import urlBackend from '../config.js';

import TattooModal from './TattooModal';


class FavTattoosProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickOnTattoo: false,
      tattoosList: []
    }
  }

  componentDidMount() {
    var ctx= this;
    fetch(urlBackend+'/userFavTattoos?user_id='+this.props.userId)
    .then(function(response) {
     return response.json()
    })
    .then(function(data) {
      console.log("28 data", data);
      var tattoosListCopy =[...ctx.state.tattoosList];
      var data = data.result
      data.map(function(favTattoos){
        tattoosListCopy.push(favTattoos);
      })
      ctx.setState({tattoosList : tattoosListCopy,})
    })
    .catch(function(error) {
     console.log('Request failed', error);
   });
 }


  render() {
        var {tattoosList} = this.state;
        var tattoosDisplayedCards = tattoosList.map(function(tattoo, i){
          return <CardTatoo
             key={i}
             artistId={tattoo.artistID}
             tattooPhotoLink={tattoo.tattooPhotoLink}
             tattooStyleList={tattoo.tattooStyleList}
             tattooId={tattoo._id}
          />
       })
    return (
      <div className="containerTattoosProfile">
          <div className="row rowTattoosProfile col-12">
          <TattooModal/>
          {tattoosDisplayedCards}
          </div>
      </div>
    )
  }
}




function mapStateToProps(store) {
  return { userId: store.user._id,
  }
}

export default connect(
    mapStateToProps,
    null
)(FavTattoosProfile);
