//Alimente UserPage

import React from 'react';
//import {Card, CardTitle, CardImg, CardSubtitle, Button, Container, Row, Col} from 'reactstrap';

import TattooArtistCardModal from '../Components/TattooArtistCardModal.js'
import 'bootstrap/dist/css/bootstrap.css';
import '../Stylesheets/FavArtistsProfile.css';

import {connect} from 'react-redux';


class FavArtistsProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistsList: []
    }
  }

  componentDidMount() {
      var ctx = this;
      fetch('http://localhost:3000/userFavArtists?user_id=' + ctx.props.userId)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var artistsListCopy =[...ctx.state.artistsList];
        var data = data.result;
        data.map(function(favArtists){
          artistsListCopy.push(favArtists);
                 })
        ctx.setState({artistsList: artistsListCopy});
        console.log("artistsList 34",this.state.tattoosList);
      })
      .catch(function(error) {
        console.log('Request failed', error);
      });
    }

  render() {
    console.log("artistsList 42",this.state.tattoosList);
    var {artistsList} = this.state;
    var artistsDisplayedCards = artistsList.map(function(artist, i) {
        return <FavArtistCard
        key={i}
        artistName={artist.artistNickname}
        artistImage={artist.artistPhotoLink}
        artistCompanyName={artist.artistCompanyName}
        artistDescription={artist.artistDescription}
        artistAddress={artist.artistAddress}
        artistStyleList1={artist.artistStyleList[0].style1}
        artistStyleList2={artist.artistStyleList[0].style2}
        artistStyleList3={artist.artistStyleList[0].style3}
        artistID={artist._id}
      />
    })
    //console.log("artistsDisplayedCards depuis FavArtistsProfile",artistsDisplayedCards)
    return (
      <div className="containerArtistProfile">
        <div className="row rowArtistProfile col-12">
          {artistsDisplayedCards}
        </div>
      </div>);
  }
}

class FavArtistCard extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      artistName : this.props.artistName,
      artistImage : this.props.artistImage,
      artistCompanyName : this.props.artistCompanyName,
      artistDescription : this.props.artistDescription,
      artistAddress : this.props.artistAddress,
      artistStyleList1 : this.props.artistStyleList1,
      artistStyleList2 : this.props.artistStyleList2,
      artistStyleList3 : this.props.artistStyleList3,
      artistID : this.props.artistID
    }
  }
  render() {
    return (
          <div className="tattooArtistCardProfile col-12 col-sm-6 col-md-4" style={{padding:5, height:400, minWidth:310}} >
            <TattooArtistCardModal
              artistNickname = {this.state.artistName}
              artistPhotoLink = {this.state.artistImage}
              artistCompanyName = {this.state.artistCompanyName}
              artistDescription = {this.state.artistDescription}
              artistAddress = {this.state.artistAddress}
              artistStyleList1 = {this.state.artistStyleList1}
              artistStyleList2 = {this.state.artistStyleList2}
              artistStyleList3 = {this.state.artistStyleList3}
              artistID = {this.state.artistID}
            />
          </div>
    );
  }
}

function mapStateToProps(store) {
  return { 
    userId: store.user._id,
    favArtistID: store.user.userFavoriteArtist,

  }
}

export default connect(
    mapStateToProps,
    null
)(FavArtistsProfile);
