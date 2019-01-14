//contient CardTatoo de l'image clickée,
//TattooArtistCardModal de l'artiste de la photo
//et des CardTatoo de toutes les photos du même artiste
import React, { Component } from 'react';
import {connect} from 'react-redux';

//Import des composants externes
import CardTatoo from '../Components/CardTatoo.js';
import TattooArtistCardModal from '../Components/TattooArtistCardModal.js';
import AuthForm from '../Components/AuthForm.js';

//Import des librairies ou composants de style
import '../Stylesheets/TattooModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'reactstrap';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import urlBackend from '../config.js';

// function checkAndAdd(idTattoo, array) {
//   var found = array.some(function (el) {
//     console.log('el', idTattoo);
//     return el.favTattooID === idTattoo;
//   });
//   return found
// }


class TattooModal extends Component {
  //on créé une var stateless => ne lance pas le render quand il se met à jour, est accessible uniquement dans le composant
  // like = false;

  constructor(props) {
    super(props);
    this.state = {
      collapse: false ,
      pictureData:[],
      visible: false,
      like: false,
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
      if(!this.state.like){
        fetch(urlBackend+'/userliketattoo', {
        method: 'PUT',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: 'user_id='+ctx.props.userId+'&favTattooID='+ctx.props.favTattooID
        });
        this.setState({like: true})

      } else {
        fetch(urlBackend+'/userdisliketattoo', {
        method: 'PUT',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: 'favTattooID='+ctx.props.favTattooID+'&user_id='+ctx.props.userId
        });
        this.setState({like: false})
      }
    }
   }


   componentDidMount=(props)=>{
      // if(this.props.userId){
      //  console.log("user is here 89");
      //  this.props.userFavoriteTattoo.map(function(tattoo, i){
      //    this.setState({
      //     classLike : true
      //    })
      //  })
      //  //console.log("this.props 89", this.props);
      // }


   }

  componentDidUpdate(prevProps){
    var ctx = this;
    // if(this.props.userId){
    //   console.log("didupdate",this.props.dataModal);
    //   fetch(urlBackend+'/user?user_id='+this.props.userId)
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

    if (this.props.clickOnTattoo!==prevProps.clickOnTattoo && this.props.clickOnTattoo===true) {
      this.setState({
        visible : true,
      })
      // Récupération de la liste des tatouages du tatoueur en question
      fetch('http://localhost:3000/tattoosfromartist?artistID='+ctx.props.favArtistID)
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
      })

      // recupère la liste des tattoos likés !! (prend en compte les dislike tattoo)
      fetch('http://localhost:3000/user?user_id='+this.props.userId)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
          // gestion du coeur liké
          if(data.result.userFavoriteTattoo){
            ctx.setState({
              like: false, // 'remise à jour' de l'etat like à false
            })
            for (var i = 0; i < data.result.userFavoriteTattoo.length; i++) {
              if(data.result.userFavoriteTattoo[i] === ctx.props.favTattooID){
                ctx.setState({like: true})
                break;
              }
            }
          }
      })
      .catch(function(error) {
        console.log('Request failed', error)
      });

    }
  }


  render() {

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
              <img src={this.props.favTattooPhotoLink} id="tattooImageModal" alt=""/>

              <FontAwesomeIcon
                onClick={() => this.handleTattooLike(this.props)}
                icon={faHeart}
                className={this.state.like ? "tattooLikeModal tattoo-liked" : "tattooLikeModal tattoo-disliked"}
              />
            </Col>

            <Col xs="12" md={{size: "5"}} >
              <TattooArtistCardModal artistId={this.props.favArtistID} />
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
          favTattooStyleList:[],
         })
    }
  }
}

function mapStateToProps(store) {
  return {
     userId: store.user._id,
     userFirstName : store.user.userFirstName,
     userLastName : store.user.userLastName,
     userEmail : store.user.userEmail,
     userFavoriteTattoo: store.user.userFavoriteTattoo,
     userFavoriteArtist: store.user.userFavoriteArtist,
     userPassword : store.user.userPassword,
     userTelephone : store.user.userTelephone,
     userTattooDescription : store.user.userTattooDescription,
     userAvailability : store.user.userAvailability,
     favTattooPhotoLink: store.dataModal.favTattooPhotoLink,
     clickOnTattoo: store.dataModal.clickOnTattoo,
     favArtistID: store.dataModal.favArtistID,
     favTattooID: store.dataModal.favTattooID,
     favTattooStyleList: store.dataModal.favTattooStyleList
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TattooModal);
