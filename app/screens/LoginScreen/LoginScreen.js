import React, { Component } from 'react'; //UI and components
import { Text, TextInput, Animated, ScrollView, Image, ImageBackground, Platform, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable'
import Fade  from '../../components/Fade'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Avatar, ButtonGroup } from 'react-native-elements'
import {Constants, Images} from '../../themes/'
// import { BlurView } from 'expo'
// import { BlurView, VibrancyView } from 'react-native-blur'

import { Actions, ActionConst } from 'react-native-router-flux'; //navigation

import { connect } from 'react-redux' //Interaction with server
import { fetchApi } from '../../services/api'
import { authenticate } from '../../services/session'
import * as sessionSelectors from '../../services/session/selectors'
import _ from 'lodash'
import styles from './styles'

class LoginScreen extends Component{

  constructor(props){
    super(props)
    this.state = {
      isLoading:true,
      email:"",
      password:"",
      buddycode:"",
      firstName:"",
      lastName:"",
      error_message:"",
      successAuth:false,
      selectedIndex:0,
      visibleLogin:true,
      visibleRegister:false,
    }
    setTimeout(() => {
      console.log('Prevent Leaking Login!');
    }, 200);
  }

  validateEmail = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return reg.test(email)
  }

  signIn = () => {
    const email = this.state.email
    const password = this.state.password
    var error_msg = ""
    if(this.validateEmail(email)){
      this.props.login(email, password)
      console.log("Credentials:",this.props.credentials)
      setTimeout(()=> {
        var credentials = sessionSelectors.get()
        console.log("Credentials after initial timeout:",credentials)
        if (!(_.isEmpty(credentials.tokens.access.value))){
          Actions.map({ type:ActionConst.RESET})
        }
        else{
          console.log("There is an error in the code")
        }
      }, 1000)
      clearTimeout(this.state.error_message)
    }
    else{
      this.setState({error_message:"Email or Password is not correct",successAuth:false})
    }
  }

  register = () =>{
    var payload = {
      email:this.state.email,
      email2:this.state.email,
      buddycode:this.state.buddycode,
      password:this.state.password,
      firstName:this.state.firstName,
      lastName:this.state.lastName
    }
    fetchApi(`api/account/register/`,payload = payload, method = 'post', headers = {})
    .then(response => {
      this.signIn()
    })
    .catch(error_msg => {
      this.setState({error_message:error_msg})
      throw error_msg
    })
  }


  redirectMap = () => {
    Actions.map({ type:'replace' })
  }

  redirectFriend = () => {
    Actions.friend()
  }

  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex})
    if(selectedIndex == 1){
      this.setState({visibleLogin:false}, function () {
        setTimeout(()=> this.setState({visibleRegister: !this.state.visibleLogin}), 325)
      })
    }
    else{
      this.setState({visibleRegister:false}, function () {
        setTimeout(()=> this.setState({visibleLogin: !this.state.visibleRegister}), 325)
      })
    }
  }

  loginView = () => {
    return <Text>LOGIN</Text>
  }

  registerView = () => {
    return <Text>REGISTER</Text>
  }

  render(){
    const selected_view = [{element: this.loginView}, {element: this.registerView}]
    const buttons = ['LOGIN', 'REGISTER']
    const {selectedIndex} = this.state
    return(
      <View style={styles.container}>
        <Image source={Images.GoogleMapBackground} style={styles.backgroundImage} blurRadius={7}/>
        <KeyboardAwareScrollView>
          <View style={styles.logoView}>
            <Avatar large icon={{name: 'face', color: 'gray', type: 'material-community', size:57}}  rounded activeOpacity = {0.85}/>
          </View>
          <View style={styles.contentContainer}>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={styles.buttonGroupContainer}
            />

            <Fade visible={this.state.visibleLogin}>
              <TextInput style={styles.textInput} autoFocus={true} onChangeText={(text) => this.setState({email:text})} underlineColorAndroid='rgba(0,0,0,0)' placeholder='Email Address' />
              <TextInput style={styles.textInput} onChangeText={(text) => this.setState({password:text})} underlineColorAndroid='rgba(0,0,0,0)' secureTextEntry={true} placeholder='Password' />
              <TouchableOpacity style={styles.signInButton} onPress={this.signIn}>
                <Text style={styles.signin} >Login to Buddymap</Text>
              </TouchableOpacity>
            </Fade>

            <Fade visible={this.state.visibleRegister}>
              <TextInput style={styles.textInput} autoFocus={true} onChangeText={(text) => this.setState({email:text})} underlineColorAndroid='rgba(0,0,0,0)' placeholder='Email Address' />
              <TextInput style={styles.textInput} onChangeText={(text) => this.setState({password:text})} underlineColorAndroid='rgba(0,0,0,0)' secureTextEntry={true} placeholder='Password' />
              <TextInput style={styles.textInput} onChangeText={(text) => this.setState({buddycode:text})}  underlineColorAndroid='rgba(0,0,0,0)' placeholder='BuddyCode' />
              <View style={styles.nameView}>
                <TextInput style={styles.nameTextInput} onChangeText={(text) => this.setState({firstName:text})}  underlineColorAndroid='rgba(0,0,0,0)' placeholder='First Name' />
                <View style={{flex:.1}}></View>
                <TextInput style={styles.nameTextInput} onChangeText={(text) => this.setState({lastName:text})}  underlineColorAndroid='rgba(0,0,0,0)' placeholder='Last Name' />
              </View>
              <TouchableOpacity style={styles.signInButton} onPress={this.register}>
                  <Text style={styles.signin} >Join Buddymap!!!</Text>
              </TouchableOpacity>
            </Fade>
            <Text>{this.state.error_message}</Text>
          </View>
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
