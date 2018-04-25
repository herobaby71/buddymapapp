import { StyleSheet } from 'react-native';
import { Constants } from '../../themes/';
export default styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  paragraph: {
    margin: 3,
    paddingTop: 1,
    fontSize: 18,
    textAlign: 'left',
  },
  paragraphBold: {
    margin: 3,
    paddingTop: 1,
    fontSize: 18,
    textAlign: 'left',
    fontWeight:'bold'
  },
  textInput: {
    borderColor: '#696969',
    color: '#696969',
    //paddingVertical:Constants.Harin2,
    //marginTop: Constants.Harin2,
    borderWidth:0,
    borderRadius: 3,
    fontSize: 18,
    marginTop: 3
  },
  textInput2: {
    borderColor: '#696969',
    color: '#696969',
    //paddingVertical:Constants.Harin2,
    //marginTop: Constants.Harin2,
    borderWidth:0,
    borderRadius: 3,
    fontSize: 18,
    marginLeft: 7,
  },
  title: {
    margin: 6,
    fontSize: 20,
    textAlign: 'center',
	  color: '#6fbbd7',
  },
  arrowContainer:{
    position: 'absolute',
    top: Constants.Harin3,
    left: 6
  },
  button:{
    backgroundColor: '#6fbbd7',
    color: '#FFFFFF',
    margin: 5,
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: 19,
    textAlign: 'center',
  }
})
