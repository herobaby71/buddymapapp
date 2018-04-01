import React, {Component} from 'react'
import { TouchableOpacity, TextInput, View, Text } from 'react-native'
import { Input, Icon, Slider } from 'react-native-elements'
import Modal from 'react-native-modal'

class CreateRadiusEventModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalVisible: false,
      value:0,
    }
  }

  componentWillReceiveProps(newProps) {
    //Handle props
    this.setState({modalVisible: newProps.modalVisible})
  }

  _renderModalContent = () => (
    <View style = {this.props.containerStyle}>
      <Text>Create Radius Event Modal</Text>
      <View style={styles.sliderRadius}>
        <Slider
          value= {this.state.value}
          minimumValue={0}
          maximumValue={200}
          step = {20}
          minimumTrackTintColor='gray'
          thumbTintColor='gray'
          onValueChange={(value) => this.setState({value})}
        />
        <Text>                 </Text>
      </View>
      <Text>Radius:{this.state.value} m</Text>
      <TouchableOpacity onPress = {this.props.hideModal}>
        <Text>Hide Modal</Text>
      </TouchableOpacity>
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


export default CreateRadiusEventModal
