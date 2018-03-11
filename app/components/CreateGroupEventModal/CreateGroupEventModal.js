import React, {Component} from 'react'
import {TouchableOpacity, TextInput, View, Text} from 'react-native'
import Modal from 'react-native-modal'

class CreateGroupEventModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalVisible: false
    }
  }
  componentWillReceiveProps(newProps) {
    //Handle props
    this.setState({modalVisible: newProps.modalVisible})
  }
  render(){
    return(
      <Modal
        isVisible={this.state.modalVisible}
        onBackdropPress={this.props.hideModal}
        backdropOpacity={.2}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        onRequestClose={() =>{
          console.log("Modal Create Radius Event Close")
        }}
      >
        <View style = {styles.modalContent}>
          <Text>Create Group Event Modal</Text>
          <TouchableOpacity onPress = {this.props.hideModal}>
            <Text>Hide Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

}


export default CreateGroupEventModal
