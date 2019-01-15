//Chaque image qui contient un tatouage
//reçoit des infos de TattooModal
import React, { Component } from 'react';
import '../Stylesheets/CardTatoo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';


class CardTatoo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickOnTattoo: false,
    };
  }


  handleClick = (props) => {
    this.setState({
      clickOnTattoo: !this.state.clickOnTattoo
    })
    let propsModal = {...props};
    propsModal.isOpen = true;
    this.props.openModalClick(propsModal);
    console.log(propsModal);
  }

  render(){
    return(
      <div className=" col-12 col-md-3 card-container" style={{minHeight: 290, minWidth: 290, maxHeight: 350, maxWidth: 350}}>
        <div className="img-container" onClick={() => this.handleClick(this.props)}>
          <img className="img-tatoo" src={this.props.tattooPhotoLink}/>
          <div className="card-hover">
            <FontAwesomeIcon className="hover-search" icon={faSearchPlus} />
            <p>En savoir plus ...</p>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    openModalClick: function(props) {
        dispatch({
          type: 'openModal',
          clickOnTattoo:props.isOpen,
          favTattooPhotoLink:props.tattooPhotoLink,
          favArtistID:props.artistId,
          favTattooID:props.tattooId,
          favTattooStyleList:props.tattooStyleList,
         })
    },
  }
}

function mapStateToProps(store) {
  return { userId: store.user._id,
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardTatoo);
