import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View } from 'react-native'
import {GiftedChat, Actions, Bubble, SystemMessage} from 'react-native-gifted-chat'
import CustomActions from './CustomActions';
import CustomView from './CustomView';
import emojiUtils from 'emoji-utils';
import SlackMessage from './SlackMessage'
import styles from './styles'

import {WSService} from '../../services/websocket'//websocket call to server
import autobind from 'autobind-decorator';
class ChatScreen extends Component{

  constructor(props){
    super(props)
    this.state = {
      messages: [],
      messageType:{0:'MSG', 1:'WARNING', 2:'GLOBAL', 5:'ENTER', 6:'LEAVE', 7:'JOIN'},
      loadEarlier:false,
      typingText:null,
      isLoadingEarlier:false,
    }
    this._isMounted = false;
    this._isAlright = null;
    this.websocket = new WebSocket("wss://secure-brook-82949.herokuapp.com/chat/stream/?token=MxOcyQhLfLCZ82BZ5B9dZvYoBoMYNf")
    this.websocket.onopen = () =>{
      this.websocket.send(JSON.stringify({command:'join', group:this.props.group.id}))
      this.websocket.send(JSON.stringify({command:'history', group:this.props.group.id}))
    }
    this.websocket.onmessage = this.onReceive
    // this.ws = new WSService('chat/stream/')
    // this.ws.ws.onopen = () =>{
    //   this.ws.send(JSON.stringify({command:'join', group:this.props.group.id}))
    //   this.ws.send(JSON.stringify({command:'send', group:this.props.group.id, message: "last test"}))
    // }
    // // this.ws.send({command:'join', group:this.props.group.id})
    // this.ws.send({command:'history', group:this.props.group.id})
    // this.ws.ws.onmessage = this.onReceive
  }

  componentWillMount() {
    this._isMounted = true;
    this.setState(() => {
      return {
        messages: [] //mount old messages here or anything
      };
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSend = (messages=[]) =>{
    // this.setState((previousState) =>{
    //   return{
    //     messages: GiftedChat.append(previousState.messages, messages)
    //   }
    // })
    websocket = new WebSocket("wss://secure-brook-82949.herokuapp.com/chat/stream/?token=MxOcyQhLfLCZ82BZ5B9dZvYoBoMYNf")
    var len= messages.length
    for (var i=0; i<len; i++){
      com = JSON.stringify({command:'send', group:this.props.group.id, message:messages[i].text})
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
            createdAt: new Date(),
            user: {
              _id: 2,
              name: data.buddycode,
            },
          }),
        };
      });
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
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
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
    return (
      <GiftedChat
        messages = {this.state.messages}
        onSend = {this.onSend}
        loadEarlier = {this.state.loadEarlier}
        onLoadEarlier={this.state.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}

        user={{
          _id:1
        }}

        renderActions={this.renderCustomActions}
        renderMessage={this.renderMessage}
        renderSystemMessage={this.renderSystemMessage}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
      />
    )
  }
}

export default ChatScreen
