//Alimente UserPage

import React from 'react';

import {connect} from 'react-redux';

import CardTatoo from '../Components/CardTatoo.js';

import 'bootstrap/dist/css/bootstrap.css';
import '../Stylesheets/FavTattoosProfile.css';

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

    fetch('http://localhost:3000/user?user_id='+this.props.userId)
    .then(function(response) {
     return response.json()
    })
    .then(function(data) {
      var tattoosListCopy =[...ctx.state.tattoosList];
      var userFavoriteTattoo = data.result.userFavoriteTattoo;
      userFavoriteTattoo.map(function(favTattoos){
        tattoosListCopy.push(favTattoos);
               })
      ctx.setState({
        tattoosList : tattoosListCopy,
               })
             })
    .catch(function(error) {
     console.log('Request failed', error);
   });
 }


  render() {
        var tattoosList = this.state.tattoosList;
        console.log("tattoosList==>",tattoosList)

        var tattoosDisplayedCards = tattoosList.map(function(tattoo, i){
          return <CardTatoo
           key={i}
           artistID={tattoo.artistID}
           tattooPhotoLink={tattoo.tattooPhotoLink}
           tattooStyleList={tattoo.tattooStyleList}
           tattooPhotoID={tattoo.tattooPhotoID}
         />
       })
    return (
      <div className="containerTattoosProfile">
          <div className="row rowTattoosProfile col-12">
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
