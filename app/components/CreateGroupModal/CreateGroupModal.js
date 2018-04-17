import React, {Component} from 'react'
import {TouchableOpacity, TextInput, View, Text} from 'react-native'
import Modal from 'react-native-modal'

class CreateGroupModal extends Component{
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

  _renderModalContent = () => (
    <View style = {this.props.containerStyle}>
      <Text style={styles.title}>CREATE A GROUP</Text>
		<TextInput style={styles.groupEntry} underlineColorAndroid='rgba(0,0,0,0)' placeholder='Enter Group Name' />
	  
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


export default CreateGroupModal
