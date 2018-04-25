import React, {Component} from 'react'
import {TouchableOpacity, Platform, StyleSheet, Text, View } from 'react-native'
import {GiftedChat, Actions, Bubble, SystemMessage} from 'react-native-gifted-chat'
import { Actions as Navigator} from 'react-native-router-flux'; //navigation
import CustomActions from './CustomActions';
import CustomView from './CustomView';
import emojiUtils from 'emoji-utils';
import SlackMessage from './SlackMessage';
import SideMenu from 'react-native-side-menu';
import { Icon } from 'react-native-elements'
import GroupSideMenu from '../../components/GroupSideMenu';
import styles from './styles'
import * as sessionSelectors from '../../services/session/selectors'
import {WSService, getWebSocket} from '../../services/websocket'//websocket call to server
import autobind from 'autobind-decorator';

import { connect } from 'react-redux'
import { update } from '../../services/messages/apis'
import _ from 'lodash'
class ChatScreen extends Component{

  constructor(props){
    super(props)
    this.state = {
      messages:[],
      messageType:{0:'MSG', 1:'WARNING', 2:'GLOBAL', 5:'ENTER', 6:'LEAVE', 7:'JOIN'}, //Type of messages the server send
      loadEarlier:false, //load earlier messages (when user scroll up) if true
      online:[],
      isLoadingEarlier:false,
      isOpen:false,
    }

    this._isMounted = false;
    this._isAlright = null;
    this.websocket = getWebSocket('chat/stream/')

    this.websocket.onopen = () =>{
      this.websocket.send(JSON.stringify({command:'join', group:this.props.group.id}))
    }
    //First time user opens the group chat
    //initialize with empty array and get message history for this specific group chat
    if(_.isEmpty(this.props.messages[this.props.group.id])){
      console.log("Message history is empty")
      this.props.updateMessages([],this.props.group.id)
      this.websocket.onopen = () =>{
        this.websocket.send(JSON.stringify({command:'join', group:this.props.group.id}))
        this.websocket.send(JSON.stringify({command:'history', group:this.props.group.id}))
      }
    }

    this.websocket.onmessage = this.onReceive //handle JSON recieves from the websocket server
  }

  componentWillMount() {
    this._isMounted = true;
    setTimeout(() =>{
      this.setState({messages:this.props.messages[this.props.group.id]});
    }, 50)
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSend = (messages=[]) =>{
    websocket = getWebSocket('chat/stream/')
    var len= messages.length
    for (var i=0; i<len; i++){
      com = JSON.stringify({command:'send', group:this.props.group.id, message:messages[i].text})
      console.log("send ",com)
      websocket.onopen = () =>{
        websocket.send(JSON.stringify({command:'join', group:this.props.group.id}))
        websocket.send(com)
      }
    }
  }

  onReceive = (event) =>{
    console.log("recv ",event.data)
    var data = JSON.parse(event.data)
    if(this.state.messageType[data.msg_type] == 'MSG'){
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, {
            _id: Math.round(Math.random() * 1000000),
            text: data.message,
            user: {
              _id: data.user_id,
              name: data.buddycode,
            },
          }),
        };
      });
      setTimeout(() => {this.props.updateMessages(
        this.state.messages,
        this.props.group.id
      )}, 100)
    }
    else if(this.state.messageType[data.msg_type] == 'JOIN' && !this.state.online.includes(data.buddycode)){
      console.log("user joined the chat:",data.buddycode)
      this.setState((previousState) =>{
        var joined = previousState.online
        joined.push(data.buddycode)
        return{
          online: joined
        }
      })
    }
    else if(this.state.messageType[data.msg_type] == 'LEAVE' && this.state.online.includes(data.buddycode)){
      console.log("user leaved the chat:",data.buddycode)
      this.setState((previousState) =>{
        var joined = previousState.online
        var index = joined.indexOf(data.buddycode)
        if(index > -1){
          joined.splice(index, 1)
        }
        return{
          online: joined
        }
      })
    }
  }

  onLoadEarlier = () =>{
    //When user scroll all the way up up
    console.log("Load Earlier")
  }

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderSystemMessage = () => {
    return (
      <SystemMessage
        {...this.props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    );
  }

  renderMessage(props){
    const { currentMessage: { text: currText } } = props;

    let messageTextStyle;

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30,
      };
    }

    return (
      <SlackMessage {...props} messageTextStyle={messageTextStyle} />
    );
  }

  renderCustomView = () =>{
    return (
      <CustomView
        {...this.props}
      />
    );
  }

  renderFooter = () => {
    let i = 0
    var online = this.state.online
    var onlineText = ''
    for(i=0;i<online.length;i++){
      onlineText+=online[i]+' '
    }
    return (
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          {onlineText}
        </Text>
      </View>
    );
  }

  renderCustomActions = () => {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...this.props}
        />
      );
    }
    const options = {
      'Action 1': () => {
        alert('option 1');
      },
      'Action 2': () => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...this.props}
        options={options}
      />
    );
  }

  render(){
    const menu = <GroupSideMenu />;
    return (
      <View style={{flex:1}}>
        <View style = {{backgroundColor: '#6fbbd7'}}>
          <View style={{height:15}} />
          <View style={styles.headerView}>
            <TouchableOpacity onPress={() => {Navigator.pop()}}>
              <Icon name='chevron-left' style={styles.searchImage} type='material-community' color = '#696969' />
            </TouchableOpacity>
            <Text style={styles.titleText}>{this.props.group.name}</Text>
            <TouchableOpacity onPress={() => {Navigator.drawerOpen()}}>
              <Icon name='menu' style={styles.searchImage} type='entypo' color = '#696969' />
            </TouchableOpacity>
         </View>
       </View>
        <GiftedChat
          messages = {this.state.messages}
          loop={true}
          onSend = {this.onSend}
          loadEarlier = {this.state.loadEarlier}
          onLoadEarlier={this.state.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}

          user={{
            _id:1
          }}

          renderMessage={this.renderMessage}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          renderSystemMessage={this.renderSystemMessage}
          renderFooter={this.renderFooter}

        />
      </View>
    )
  }
}
// renderBubble = {this.renderBubble}
function mapStateToProps(state){
  return {
    latest_group_id:state.services.messages.group_id,
    messages: state.services.messages.messages,
    groups: state.data.groups,
  }
}

function mapDispatchToProps(dispatch){
  return{
    updateMessages: (messages, group_id) => dispatch(update(messages, group_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
