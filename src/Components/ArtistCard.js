import React, { Component } from 'react';

//Import des librairies ou composants de style
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button }  from 'reactstrap';
import '../Stylesheets/ArtistCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

class ArtistCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      classLike: "dislike",
      like: false
    }
  }
  handleClick = () => {
    if(this.state.like === false){
      this.setState({like: true, classLike: "like"});
    } else if(this.state.like === true){
      this.setState({like: false, classLike: "dislike"});
    }
  }

  render(){
    return(
      <Col xs="6" id="colCard">
        <Card id="ArtistCard">
          <div id="imgContainer">
            <CardImg id ="ArtistImg" src={this.props.artistPhotoLink} alt="Card image cap" />
          </div>
          <CardBody>
            <FontAwesomeIcon className={this.state.classLike} icon={faHeart} onClick={() => this.handleClick()} />
            <CardTitle>{this.props.artistNickname}</CardTitle>
            <CardSubtitle>{this.props.artistCompany}</CardSubtitle>
            <CardText>Styles : {this.props.artistStyle}</CardText>
            <Button>En savoir plus</Button>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

export default ArtistCard;
