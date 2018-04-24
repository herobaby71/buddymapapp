import React, {Component} from 'react'
import { connect } from 'react-redux'
import {TouchableOpacity, TextInput, View, Text} from 'react-native'
import Modal from 'react-native-modal'
import styles from './styles'
import _ from 'lodash'
import { fetchApi } from '../../services/api'


class CreateGroupModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalVisible: false,
      groupname: "",
    }
  }



  componentWillReceiveProps(newProps) {
    //Handle props
    this.setState({modalVisible: newProps.modalVisible})
  }

  _renderModalContent = () => (
    <View style = {this.props.containerStyle}>
		<Text style={styles.title}> CREATE GROUP</Text>
    <TextInput style={styles.groupEntry} onChangeText={(text) => this.setState({groupname:text})}  underlineColorAndroid='rgba(0,0,0,0)' placeholder='Group Name' />
		  <TouchableOpacity style = {styles.addGroupButton} onPress = {() => {this.addGroup(); }}>
				 <Text style={styles.addGroupButton}>Create Group</Text>
			</TouchableOpacity>
    </View>
  );

  addGroup(){
    if(!_.isEmpty(this.state.groupname)){
      fetchApi(`api/group/create/`,payload = {name:this.state.groupname, description:"Awesome Group", members:[this.props.user.user.email]}, method = 'post', headers = {})
      .then(response => {
        console.log("Response Add Group:", response)
        if(response.success){
          console.log("success")
        }
        else{
          console.log("failure")
        }
      })
      .catch(error => {
        console.log("error",error)
      })
    }
  }

  render(){
    //console.log(this.props.user)
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

function mapStateToProps(state){
  return {
    user: state.services.user.user,
  }
}

function mapDispatchToProps(dispatch){
  return{
    getUserInfo: () => dispatch(getUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupModal)
//export default CreateGroupModal
