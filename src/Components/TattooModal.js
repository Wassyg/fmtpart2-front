//contient CardTatoo de l'image clickée, TattooArtistCardModal de l'artiste de la photo et des CardTatoo de toutes les photos du même artiste
import React, { Component } from 'react';
import {connect} from 'react-redux';

//Import des composants externes
import CardTatoo from '../Components/CardTatoo.js';
import TattooArtistCardModal from '../Components/TattooArtistCardModal.js';
import AuthForm from '../Components/AuthForm.js';
import url from '../config.js';

//Import des librairies ou composants de style
import '../Stylesheets/TattooModal.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'reactstrap';

import 'antd/dist/antd.css';
import { Modal } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function checkAndAdd(idTattoo, array) {
  var found = array.some(function (el) {
    console.log('el', idTattoo);
    return el.favTattooID === idTattoo;
  });
  return found
}

//// Composant modal qui affiche le tatouage agrandi, les infos tatoueurs et la gallerie des tatouages du tatoueur en question ////

class TattooModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false ,
      pictureData:[],
      visible: false,
      classLike: false,
      clickOnForm : false,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    this.props.closeModalClick();
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
    this.props.closeModalClick();
  }

  handleTattooLike = (props) =>{
    if(!this.props.userId){
      this.setState({
        clickOnForm: !this.state.clickOnForm
      })
    }else{
      var ctx = this;
      if(this.state.classLike === false){
        fetch('https://glacial-sierra-22438.herokuapp.com/userliketattoo', {
        method: 'PUT',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: 'favTattooPhotoLink='+ctx.props.dataModal.favTattooPhotoLink+'&favTattooStyleList1='+ctx.props.dataModal.favTattooStyleList[0]+'&favTattooStyleList2='+ctx.props.dataModal.favTattooStyleList[1]+'&favTattooStyleList3='+ctx.props.dataModal.favTattooStyleList[2]+'&favArtistID='+ctx.props.dataModal.favArtistID+'&user_id='+ctx.props.userId+'&favTattooID='+ctx.props.dataModal.favTattooID
        });
        this.setState({classLike: !this.state.classLike});

      } else if(this.state.classLike === true){
        fetch('https://glacial-sierra-22438.herokuapp.com/userdisliketattoo', {
        method: 'PUT',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: 'favTattooID='+ctx.props.dataModal.favTattooID+'&user_id='+ctx.props.userId
        });
        this.setState({classLike: !this.state.classLike});
      }
    }
   }

  componentDidUpdate(prevProps){
    var ctx = this;
    // if(this.props.userId){
    //   console.log("didupdate",this.props.dataModal);
    //   fetch('https://glacial-sierra-22438.herokuapp.com/user?user_id='+this.props.userId)
    //   .then(function(response) {
    //    return response.json();
    //   })
    //   .then(function(data) {
    //     console.log(ctx.props.dataModal.favTattooID, data.result.userFavoriteTattoo);
    //     if (checkAndAdd(ctx.props.dataModal.favTattooID, data.result.userFavoriteTattoo)) {
    //       ctx.setState({
    //         classLike : true
    //       });
    //     }
    //   });
    // }

    if (this.props.dataModal.clickOnTattoo!==prevProps.dataModal.clickOnTattoo && this.props.dataModal.clickOnTattoo===true) {
      this.setState({
        visible : true,
      })
      // Récupération de la liste des tatouages du tatoueur en question
      fetch('https://glacial-sierra-22438.herokuapp.com/tattoosfromartist?artistID='+ctx.props.dataModal.favArtistID)
      .then(function(response) {
       return response.json();
      })
      .then(function(data) {
       var pictureDataCopy = [];
       data.map(function(map){
         pictureDataCopy.push(map)
       })
       ctx.setState({ pictureData: pictureDataCopy});
       console.log("picturedata",ctx.state.pictureData);
      })
      .catch(function(error) {
       console.log('Request failed', error)
      });
    }
  }

  render() {
    console.log('result reducer dataModal',this.props.dataModal);

    let pictureList = this.state.pictureData.map(function(map, i){
      return <CardTatoo
        key={i}
        tattooId={map._id}
        tattooPhotoLink={map.tattooPhotoLink}
        artistId={map.artistID}
        tattooStyleList={map.tattooStyleList} />
    })

    return (
      <Modal
        title= "INFO TATOUAGE"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width = "90%"
        footer = {null}
        centered = {true}
        bodyStyle = {{backgroundColor : "#F7F7F7", fontFamily: 'Roboto Condensed'}}
      >
        <Container>
          <AuthForm clickOnForm={this.state.clickOnForm}/>
          <Row id="tattooImageAndArtistInfoBoxModal">
          <Col xs="12" md="7" id="tattooImageBoxModal">
              <img src={this.props.dataModal.favTattooPhotoLink} id="tattooImageModal" alt=""/>
            <FontAwesomeIcon onClick={() => this.handleTattooLike(this.props)} icon={faHeart} className={this.state.classLike ? "tattooLikeModal tatoo-liked" : "tattooLikeModal"}/>
            </Col>
            <Col xs="12" md={{size: "5"}} >
              <TattooArtistCardModal artistId={this.props.dataModal.favArtistID} />
            </Col>
          </Row>
          <hr id="separationModal"/>
          <h1>AUTRES TATOUAGES DU MEME ARTISTE</h1>
          <Row id="otherArtistImagesBoxModal">
            {pictureList}
          </Row>
        </Container>
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    closeModalClick: function() {
        dispatch({
          type: 'closeModal',
          clickOnTattoo: false,
          favTattooPhotoLink:[],
          favArtistID:"",
          favTattooID:"",
          favTattooStyleList:"",
         })
    }
  }
}

function mapStateToProps(store) {
  return {
     userId: store.user._id,
     dataModal: store.dataModal
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TattooModal);
