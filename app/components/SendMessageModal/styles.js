import { StyleSheet } from 'react-native';
import { Constants } from '../../themes/';
export default styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical:22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  textInput:{
    borderColor: '#696969',
    color: '#696969',
    paddingVertical: Constants.Harin2,
    alignItems: 'center',
    marginTop:Constants.Marin2,

    borderWidth:0,
    borderRadius:3,
  },
  seperatorLine:{
    marginTop:Constants.Harin2,
    height: 1.5,
    width: "96%",
    backgroundColor: "#CED0CE",
  },
  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: Constants.Harin2,
    marginTop:Constants.Harin1,
  },
  sendButtonText:{
    fontSize: 16
  }
})
