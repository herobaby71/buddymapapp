import { StyleSheet } from 'react-native';
import { Constants } from '../../themes/';
export default styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  textInput:{
    borderColor: '#696969',
    color: '#696969',
    paddingVertical: Constants.Harin2,

    marginTop:Constants.Marin2,

    borderWidth:0,
    borderRadius:3,
  },
  seperator:{
    marginTop: 10,
    height: 1.5,
    width: "96%",
    backgroundColor: "#CED0CE",
  },
  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Constants.Harin2,
    marginTop:Constants.Harin2,
    marginBottom:Constants.Harin2,
  },
})
