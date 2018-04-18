import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import {Drawer, Router,  Scene, Stack} from 'react-native-router-flux'
import {Provider, connect} from 'react-redux'
import { authenticate, refreshToken, validateAccessToken} from './services/session'
import { getUserInfo } from './services/user'
import Home from './screens/Home'
import MapScreen from './screens/MapScreen'
import LoginScreen from './screens/LoginScreen'
import CustomSideMenu from './components/CustomSideMenu'
import GroupSideMenu from './components/GroupSideMenu'
import FriendScreen from './screens/FriendScreen'
import ChatScreen from './screens/ChatScreen'
import GroupScreen from './screens/GroupScreen'
import _ from 'lodash'

const ConnectedRouter = connect()(Router)
class Routes extends Component {
  constructor(){
    super()
    this.state = {hasToken:false, isLoaded:false}
  }
  componentDidMount(){
    console.log("Initial Credentials Check",this.props.credentials)
    if(_.isEmpty(this.props.credentials.tokens.access.value)){
      this.setState({isLoaded:true, hasToken:false})
    }
    else{
      credentials = this.props.credentials
      // console.log("Difference in Time:", Date.now() - credentials.tokens.access.createdAt)
      // console.log("Margin of Reset:", Number(credentials.tokens.access.expiresIn)*1000 - 7200)
      if(Date.now() - credentials.tokens.access.createdAt > Number(credentials.tokens.access.expiresIn)*1000 - 7200){
        // console.log("Fresher than the Freshiest")
        refreshToken()
      }
      this.setState({isLoaded:true, hasToken:true})

    }
  }


  render(){
    if(!this.state.isLoaded){
      return (
        <ActivityIndicator />
      )
    }
    return (
      <ConnectedRouter hideNavBar={true}>
        <Stack hideNavBar={true} key="root">
          <Drawer key = "drawer" drawer={true} contentComponent={CustomSideMenu} drawerWidth={240}>
            <Scene key = "home" type="reset" component = {Home} hideNavBar={true} {...this.props} />
            <Scene key = "map" component = {MapScreen} hideNavBar={true} {...this.props} initial={this.state.hasToken} />
            <Scene key = "login" component = {LoginScreen} hideNavBar={true} {...this.props} initial={!this.state.hasToken} />
            <Scene key = "group" component = {GroupScreen} hideNavBar={true} {...this.props} />
            <Scene key = "friend" component = {FriendScreen} hideNavBar={true} {...this.props} />
          </Drawer>
          <Drawer key ="gdrawer" drawer={true} drawerPosition="right" contentComponent={GroupSideMenu} drawerWidth={200}>
            <Scene key = "chat" component = {ChatScreen} hideNavBar={true} {...this.props} />
          </Drawer>
        </Stack>
      </ConnectedRouter>
    )
  }
}

function mapStateToProps(state){
  return {
    credentials: state.services.session
  }
}

export default connect(mapStateToProps, null)(Routes)
