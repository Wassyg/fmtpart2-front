import React from 'react';

//Import des librairies ou composants de style
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Alert } from 'reactstrap';
import '../Stylesheets/SignUpAndInForm.css';

import {  } from '@fortawesome/free-solid-svg-icons'

import {connect} from 'react-redux';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      lastName: '',
      firstName: '',
      signUpEmail: '',
      signUpPassword: '',
      signInEmail: '',
      signInPassword: '',
      user : {},
      alreadyInDB : false,
      wrongPassword : false,
      errorSignUp : false,
      errorSignIn : false,
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  componentDidUpdate(prevProps){
    if (this.props.clickOnForm!==prevProps.clickOnForm) {
      this.setState({
        modal : true,
      });
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      alreadyInDB : false,
      wrongPassword : false,
      errorSignUp : false,
      errorSignIn : false,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //Method to create user in database
  handleSignUp(event) {
    var ctx = this;
    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: "userFirstName=" + ctx.state.firstName + "&userLastName=" + ctx.state.lastName + "&userEmail=" + ctx.state.signUpEmail + "&userPassword=" + ctx.state.signUpPassword
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.signup === true) {
          this.setState({
            modal: !ctx.state.modal,
            user : data.result
          });
          this.props.signUpClick(ctx.state.user);
        } else if (data.result === "alreadyInDB") {
          this.setState({
            alreadyInDB : true
          });
        } else {
          this.setState({
            errorSignUp : true
          });
        }
      })
      .catch((error) => console.log("request failed :", error))
    event.preventDefault();
  }

  //Method to check if user is in database
  handleSignIn(event) {
    var ctx = this;
    fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'userEmail=' + ctx.state.signInEmail + "&userPassword=" + ctx.state.signInPassword
      })
      .then((response) => response.json()
      )
      .then((data) => {
        console.log("data 102", data)
        if(data.signin === true){
          this.setState({
             modal: !ctx.state.modal,
             user : data.result
         })
         this.props.signInClick(ctx.state.user);
        } else if(data.result === "wrongPassword") {
          this.setState({
            wrongPassword : true
          });
        } else {
          this.setState({
            errorSignIn : true
          });
        }
      })
      .catch((error) => console.log("request failed :", error))
    event.preventDefault();
  }
  render() {
    console.log("firstName", this.state.firstName, "signUpEmail", this.state.signUpEmail);

    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <ModalBody>
            <Form>
              <Row className="formRowForSignin">
                <Col xs = "12">
                  <h4 className="signCatForm">Connexion</h4>
                  {this.state.errorSignIn ?
                  <Alert color="danger">Il semblerait que nous vous connaissions pas encore. Pourriez-vous vous inscrire avant? </Alert> : null }
                  {this.state.wrongPassword ?
                  <Alert color="warning">Mince, le mot de passe n'est pas correct, pourriez-vous réessayer? </Alert> : null }
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="signInEmail">Votre email</Label>
                    <Input className="inputFormSignIn" type="email" name="signInEmail" id="signInEmail" onChange={this.handleChange}/>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="signInPassword">Entrez votre mot de passe</Label>
                    <Input className="inputFormSignIn" type="password" name="signInPassword" id="signInPassword" onChange={this.handleChange}/>
                  </FormGroup>
                </Col>
              </Row>
              <Button outline color="success" onClick={this.handleSignIn}>Connectez-vous</Button>
            </Form>
            <hr/>
            <Form>
              <Row className="formRowForSignin">
                <Col xs = "12">
                  <h4 className="signCatForm">Inscription</h4>
                  {this.state.errorSignUp ?
                  <Alert color="danger">Oops, un bug! Est-ce que vous pourriez vous inscrire de nouveau? </Alert> : null }
                  {this.state.alreadyInDB ?
                  <Alert color="warning">Il semblerait que vous soyez déjà un des notres, pourriez-vous vous connecter directement? </Alert> : null }
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="lastName">Votre nom</Label>
                    <Input className="inputFormSignIn" type="text" name="lastName" id="lastName" onChange={this.handleChange}/>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="firstName">Votre prénom</Label>
                    <Input className="inputFormSignIn" type="text" name="firstName" id="firstName" onChange={this.handleChange}/>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="signUpEmail">Votre email</Label>
                    <Input className="inputFormSignIn" type="email" name="signUpEmail" id="signUpEmail" onChange={this.handleChange}/>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="signUpPassword">Créez un mot de passe</Label>
                    <Input className="inputFormSignIn" type="password" name="signUpPassword" id="signUpPassword" onChange={this.handleChange}/>
                  </FormGroup>
                </Col>
              </Row>
              <Button outline color="success" onClick={this.handleSignUp}>Inscrivez-vous</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signUpClick: function(user) {
        dispatch( {type: 'signup', userSignUp: user} )
    },
    signInClick: function(user) {
        dispatch( {type: 'signin', userSignIn: user} )
    }
  }
}

export default connect(
    null,
    mapDispatchToProps
)(AuthForm);
