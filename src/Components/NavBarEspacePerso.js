import React, { Component } from 'react'
import { Link } from 'react-router-dom'

//Import des composants externes
import AuthForm from '../Components/AuthForm.js';

//Import des librairies ou composants de style
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavbarToggler, Collapse, Button} from "mdbreact";
import '../Stylesheets/NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'

import {connect} from 'react-redux';

class NavBarEspacePerso extends Component {
  state = {
    isOpen: false,
    scroll: 0,
    clickOnForm : false
  };

  toggleAuth = () => {
    this.setState({
      clickOnForm: !this.state.clickOnForm
    })
  }

  componentDidMount() {
     window.addEventListener('scroll', this.handleScroll);
   }

   componentWillUnmount() {
     window.removeEventListener('scroll', this.handleScroll);
   }

   handleScroll = () => {
     this.setState({scroll: window.scrollY});
  }

  toggleCollapse = () =>{
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    
    return (
      <Navbar className="navbar-scrolled" dark expand="md">
        <NavbarBrand>
        <Link id="top" to={'/'}><strong className="logo-navbar-scrolled">Find my Tattoo</strong> </Link> 
        </NavbarBrand>
        <Button outline color="warning" onClick={()=>this.toggleAuth()}><FontAwesomeIcon icon={faUser} className="fa-lg"/></Button>
        <AuthForm clickOnForm={this.state.clickOnForm}/>
      <p className="nav-btn-scrolled">{this.props.user.userFirstName}</p>
        <NavbarToggler
          onClick={() => this.toggleCollapse()}
        />
      <Collapse id="navbarCollapse3"
            isOpen={this.state.isOpen}
            navbar>
          <NavbarNav left>

          </NavbarNav>

          <NavbarNav right>
            <NavItem>
              <Link className="nav-btn-scrolled" to={'/'}>Galerie</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-btn-scrolled" to={'/UserPage'}>Espace Perso</Link>
            </NavItem>
            <NavItem>

            </NavItem>
          </NavbarNav>
        </Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(
    mapStateToProps,
    null
)(NavBarEspacePerso);
