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
const Routes = () => (
  <Router hideNavBar={true}>
    <Scene key = "root">
      <Scene key = "map" component = {MapScreen} hideNavBar={true} {...this.props} initial/>
    </Scene>
  </Router>
)
export default Routes
// <Scene key = "home" component = {Home} hideNavBar={true} {...this.props}/>
