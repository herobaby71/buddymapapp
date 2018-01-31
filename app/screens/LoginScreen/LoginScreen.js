import React, { Component } from 'react';
import { Text, TextInput,View, ScrollView, Image, Platform, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import {authenticate} from '../../services/session'
import * as sessionSelectors from '../../services/session/selectors'

import _ from 'lodash'
import styles from './styles'

class LoginScreen extends Component{
  state = {email: "", password: "", error_message:"", successAuth:false}

  constructor(props){
    super(props)
    if(!_.isEmpty(this.props.credentials.tokens.access.value)){
      // Actions.map()

    }
  }

  validateEmail = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return reg.test(email)
  }

  signIn = () => {
    const email = this.state.email
    const password = this.state.password

    if(this.validateEmail(email)){
      this.props.login(email, password)
      Actions.map()
    }
    else{
      this.setState({error_message:"Authentication Failed"})
      this.setState({successAuth:false})
    }
  }

  redirectMap = () => {
    Actions.map()
  }

  redirectFriend = () => {
    Actions.friend()
  }

  render(){
    text = JSON.stringify(this.props.credentials)
    text2 = JSON.stringify(sessionSelectors.get())
    text3 = JSON.stringify(this.props.location)
    text4 = JSON.stringify(this.props.friends)
    return(
      <View style = {styles.container}>
        <KeyboardAwareScrollView>
          <Text style = {styles.promptText}>Sign in with email address</Text>
          <TextInput style={styles.textInput} onChangeText={(text) => this.setState({email:text})}  underlineColorAndroid='rgba(0,0,0,0)' placeholder='Email Address' />
          <TextInput style={styles.textInput} onChangeText={(text) => this.setState({password:text})} underlineColorAndroid='rgba(0,0,0,0)' secureTextEntry={true} placeholder='Password' />
          <TouchableOpacity style={styles.singinButton} onPress={this.signIn}>
              <Text style={styles.signin} > Click ME Sign in</Text>
          </TouchableOpacity>
          <Text>Credentials:</Text>
          <Text>{text}</Text>
          <TouchableOpacity style={styles.singinButton} onPress={this.redirectMap}>
              <Text>Click ME To Go to Map Screen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.singinButton} onPress={this.redirectFriend}>
              <Text>Click ME To Go To Add/Accept Friend Screen</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

function mapStateToProps(state){
  return {
    credentials: state.services.session,
    location: state.data.location,
    friends: state.data.friends
  }
}

function mapDispatchToProps(dispatch, email="", password="", token="", fbdata=null){
  return{
    login: (email, password) => dispatch(authenticate(email,password)),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
