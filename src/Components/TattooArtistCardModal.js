//fiche artiste qui se trouve à l'intérieur du TattooModal lorsqu'on cherche à agrandir une photo
import React, { Component } from 'react';
import {connect} from 'react-redux';

//Import des librairies ou composants de style
import '../Stylesheets/TattooArtistCardModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Row, Col, Badge} from 'reactstrap';

import ProjectForm from '../Components/ProjectForm.js'
import AuthForm from '../Components/AuthForm.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faMapMarkerAlt, faHeart, faEnvelope, faTimesCircle } from '@fortawesome/free-solid-svg-icons'


class TattooArtistCardModal extends Component {
  constructor(props) {
    super(props);
    this.handleClickSend = this.handleClickSend.bind(this);
    this.state = {
      classLike : false,
      clickToSend: false,
      artistNickname: this.props.artistNickname,
      artistCompanyName: this.props.artistCompanyName,
      artistAddress: this.props.artistAddress,
      artistStyleList1: this.props.artistStyleList1,
      artistStyleList2: this.props.artistStyleList2,
      artistStyleList3: this.props.artistStyleList3,
      artistDescription:this.props.artistDescription,
      artistPhotoLink:this.props.artistPhotoLink,
      clickOnForm: false,
      artistsList: []
    }
  }
  handleClickSend(props){
    this.setState({
      clickToSend: !this.state.clickToSend
    })
  }

  // handleClick(props){
  //   if(this.props.userId == null){
  //     this.setState({
  //       clickOnForm: !this.state.clickOnForm,
  //     })
  //   } else if (this.props.userId){
  //     this.setState({
  //       clickToSend: !this.state.clickToSend
  //     })
  //   }
  // }

//grace au reducer récupérer l'ID de l'artiste pour fetcher ses informations
  componentDidMount(){
    var ctx = this;
    fetch('http://localhost:3000/artist?artist_id='+ this.props.dataModal.favArtistID)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log("TattooArstistCardModal data de l'artist", data.result);
       ctx.setState({
         clickToSend: false,
         artistNickname: data.result.artistNickname,
         artistCompanyName: data.result.artistCompanyName,
         artistAddress: data.result.artistAddress,
         artistStyleList1: data.result.artistStyleList[0].style1,
         artistStyleList2: data.result.artistStyleList[0].style2,
         artistStyleList3: data.result.artistStyleList[0].style3,
         artistDescription: data.result.artistDescription,
         artistPhotoLink: data.result.artistPhotoLink,
         artistNote: data.result.artistNote
         })
       })
     .catch(function(error) {
      console.log('Request failed', error);
    });
  }

  componentDidUpdate(prevProps){
    if (this.props.dataModal.clickOnTattoo!==prevProps.dataModal.clickOnTattoo && this.props.dataModal.clickOnTattoo=== true){
      console.log(this.props.dataModal.clickOnTattoo);
      console.log("update");
      var ctx = this;
      fetch('http://localhost:3000/artist?artist_id='+ this.props.dataModal.favArtistID)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
         ctx.setState({
           clickToSend: false,
           artistNickname: data.result.artistNickname,
           artistCompanyName: data.result.artistCompanyName,
           artistAddress: data.result.artistAddress,
           artistStyleList1: data.result.artistStyleList[0].style1,
           artistStyleList2: data.result.artistStyleList[0].style2,
           artistStyleList3: data.result.artistStyleList[0].style3,
           artistDescription: data.result.artistDescription,
           artistPhotoLink: data.result.artistPhotoLink,
           artistNote: data.result.artistNote
           })
         })
       .catch(function(error) {
        console.log('Request failed', error);
      });
    }
  }


  handleArtistLike = (props) =>{
    if(this.props.userId == null){
      this.setState({
        clickOnForm: !this.state.clickOnForm
      })
    }else{
      var ctx = this;
      if(this.state.classLike === false){
        fetch('http://localhost:3000/userlikeartist', {
        method: 'PUT',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: 'favArtistNickname='+ctx.state.artistNickname+'&favArtistCompanyName='+ctx.state.artistCompanyName+'&favArtistAddress='+ctx.state.artistAddress+'&favArtistDescription='+ctx.state.artistDescription+'&favArtistPhotoLink='+ctx.state.artistPhotoLink+'&favArtistStyleList1='+ctx.state.artistStyleList1+'&favArtistStyleList2='+ctx.state.artistStyleList2+'&favArtistStyleList3='+ctx.state.artistStyleList3+'&favArtistNote='+ctx.state.artistNote+'&favArtistID='+ctx.props.dataModal.favArtistID+'&user_id='+ctx.props.userId +'&userFirstName=' + ctx.props.userFirstName +'&userLastName=' + ctx.props.userLastName + '&userEmail=' + ctx.props.userEmail + '&userPassword='+ ctx.props.userPassword + '&userTelephone='+ ctx.props.userTelephone +'&userTattooDescription='+ ctx.props.userTattooDescription +'&userAvailability='+ ctx.props.userAvailability
        });
      } else {
        fetch('http://localhost:3000/userdislikeartist', {
        method: 'PUT',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: 'favArtistID='+ctx.props.dataModal.favArtistID+'&user_id='+ctx.props.userId
        });
      }
      this.setState({classLike: !this.state.classLike});
    }
   }

  render () {
    return (

      <Card id="artistInfoBoxModal">
        <CardBody>
          <Row>
            <AuthForm clickOnForm={this.state.clickOnForm}/>
            <Col xs="4" id="artistInfoLeftBoxModal">
              <img src={this.state.artistPhotoLink} alt="" id="artistImageModal" />
              <div id="artistStarRateModal">
                <FontAwesomeIcon icon={faStar} className="artistStarIconModal fa-xs"/>
                <FontAwesomeIcon icon={faStar} className="artistStarIconModal fa-xs"/>
                <FontAwesomeIcon icon={faStar} className="artistStarIconModal fa-xs"/>
                <FontAwesomeIcon icon={faStar} className="artistStarIconModal fa-xs"/>
                <FontAwesomeIcon icon={faStar} className="artistStarIconModal fa-xs"/>
              </div>
              {
                !this.state.classLike ?
                <Button outline color="success" size="sm" className="artistButtonModal" onClick={()=>this.handleArtistLike()}><FontAwesomeIcon icon={faHeart} className="fa-xs"/> Garder</Button>
                  :
                <Button outline color="secondary" size="sm" className="artistButtonModal" onClick={()=>this.handleArtistLike()}><FontAwesomeIcon icon={faTimesCircle} className="fa-xs"/> Retirer</Button>
              }
              <Button outline color="success" size="sm" className="artistButtonModal" onClick={this.handleClickSend}>
              <ProjectForm clickToSend={this.state.clickToSend} artistId={this.props.artistId}/> <FontAwesomeIcon icon={faEnvelope} className="fa-xs"/> Contacter</Button>
            </Col>
            <Col xs="8">
              <CardTitle id="artistNameModal">{this.state.artistNickname}</CardTitle>
            <CardSubtitle id="artistCompanyNameModal">{this.state.artistCompanyName}</CardSubtitle>
              <CardText>{this.state.artistDescription}</CardText>
              <div id = "artistAllBadgeModal">
                <Row>
                  <h6><Badge color="info" pill className="artistStyleBadgeModal">{this.state.artistStyleList1}</Badge></h6>
                <h6><Badge color="info" pill className="artistStyleBadgeModal">{this.state.artistStyleList2}</Badge></h6>
                  <h6><Badge color="info" pill className="artistStyleBadgeModal">{this.state.artistStyleList3}</Badge></h6>
                </Row>
              </div>
              <CardText><FontAwesomeIcon icon={faMapMarkerAlt} /> {this.state.artistAddress}</CardText>
            </Col>
          </Row>
        </CardBody>
      </Card>


    )
  }
};

function mapStateToProps(store) {
  return {
     userId: store.user._id,
     userFirstName : store.user.userFirstName,
     userLastName : store.user.userLastName,
     userEmail : store.user.userEmail,
     userPassword : store.user.userPassword,
     userTelephone : store.user.userTelephone,
     userTattooDescription : store.user.userTattooDescription,
     userAvailability : store.user.userAvailability,
     dataModal: store.dataModal
     
  }
}

export default connect(
    mapStateToProps,
    null
)(TattooArtistCardModal);
