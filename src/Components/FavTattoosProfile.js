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
    fetch('http://localhost:3000/userFavTattoos?user_id='+this.props.userId)
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
      ctx.setState({
        tattoosList : tattoosListCopy,
               })
      console.log("tattoosList 36",this.state.tattoosList);
             })
    .catch(function(error) {
     console.log('Request failed', error);
   });
 }


  render() {
    console.log("tattoosList 45",this.state.tattoosList);
        var {tattoosList} = this.state;
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
