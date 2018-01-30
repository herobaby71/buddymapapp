import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Router,  Scene, Stack} from 'react-native-router-flux'
import {Provider, connect} from 'react-redux'

import Home from './screens/Home'
import MapScreen from './screens/MapScreen'
import LoginScreen from './screens/LoginScreen'
import FriendScreen from './screens/FriendScreen'

const ConnectedRouter = connect()(Router)
const Routes = () => (
  <ConnectedRouter hideNavBar={true}>
    <Scene key = "root">
      <Scene key = "home" component = {Home} hideNavBar={true} {...this.props} />
      <Scene key = "login" component = {LoginScreen} hideNavBar={true} {...this.props} initial/>
      <Scene key = "map" component = {MapScreen} hideNavBar={true} {...this.props} />
      <Scene key = "friend" component = {FriendScreen} hideNavBar={true} {...this.props} />
    </Scene>
  </ConnectedRouter>
)
export default Routes
