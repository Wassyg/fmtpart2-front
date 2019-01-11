import React, {Component} from 'react'

// import des composants appelés
import NavBarEspacePerso from '../Components/NavBarEspacePerso.js'
import TabsProfile from '../Components/TabsProfile.js'

import {connect} from 'react-redux';

import '../Stylesheets/UserPage.css';

class UserPage extends Component{
  render(){
    return(
      <div className="userPage-container-fluid">
        <NavBarEspacePerso />
        <div className="mainContainer col-12">
          <div className="topContainer-row col-12 col-sm-10">
            <TabsProfile />
          </div>

        </div>
    </div>
  )}
}

function mapStateToProps(store) {
  return { userID: store.user._id
  }
}

export default connect(
    mapStateToProps,
    null
)(UserPage);
