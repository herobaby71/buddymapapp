import React, {Component} from 'react'
import {ScrollView, TouchableOpacity, TextInput, View, Text } from 'react-native'
import { Input, Icon, Slider } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Modal from 'react-native-modal'
import styles from './styles'

class SendMessageModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalVisible: false,
      message:"Hi! Good Day :)",
      value:0,
    }
  }

  componentWillReceiveProps(newProps) {
    //Handle props
    this.setState({modalVisible: newProps.modalVisible})
  }

  onButtonPressed = () => {
    this.props.messageFunc(this.state.message)
    this.props.hideModal()
  }

  _renderModalContent = () => (
    <View style = {styles.container}>
      <ScrollView>
        <TextInput style={styles.textInput} onChangeText={(text) => this.setState({email:text})} underlineColorAndroid='rgba(0,0,0,0)' placeholder='Enter A Message :)'/>
        <View
          style={styles.seperatorLine}
        />
        <TouchableOpacity style = {styles.sendButton} onPress = {this.onButtonPressed}>
          <Text style = {styles.sendButtonText}>Send Message</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  render(){
    return(
      <Modal
        isVisible={this.state.modalVisible}
        onBackdropPress={this.props.hideModal}
        backdropOpacity={.2}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onSwipe = {this.props.hideModal}
        swipeDirection="left"
        onRequestClose={() =>{
          console.log("Modal Create Radius Event Close")
        }}
      >
        {this._renderModalContent()}
      </Modal>
    )
  }
}


export default SendMessageModal
