import { StyleSheet } from 'react-native';
import { Constants } from '../../themes/';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  avatarView:{
    position:'absolute',
    top: Constants.Harin3,
    left: Constants.Marin3,
    backgroundColor:'rgba(0,0,0,0)'
  },
  bubbleView1:{position:'absolute'},
  bubbleView2:{position:'absolute'},
  bubbleView3:{position:'absolute'},
  bubble1:{
    top: Constants.Harin15,
    left: Constants.Marin20,
    backgroundColor:'rgba(0,0,0,0)'
  },
  bubble2:{
    top: Constants.Harin17,
    left: Constants.Marin2,
    backgroundColor:'rgba(0,0,0,0)'
  },
  bubble3:{
    top: Constants.Harin6,
    left: Constants.Marin28,
    backgroundColor:'rgba(0,0,0,0)'
  },
  textPopoverView:{
    position:'absolute',
  },
  infoBox:{
    position:'absolute',
    top: Constants.Harin3,
    right: Constants.Marin3,
    borderRadius:5,
    alignItems:'center',
    backgroundColor: 'rgba(160,160,160,.6)'
  },
  infoBoxTextView:{
    margin: 5,
  },
  infoBoxText:{
    fontSize: Constants.Font20,
  },
  groupSelect:{
    position:'absolute',
    // left: Constants.Marin25,
    // right: Constants.Marin25,
    // bottom: Constants.Harin10,
    left:  0,
    right: 0,
    bottom:0,
    paddingVertical: Constants.Harin1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    backgroundColor: 'rgba(160,160,160,.6)',
    flexDirection: 'row',
  },
  groupSelectTextView:{
    margin: 7,
  },
  groupSelectText:{
    fontSize: Constants.Font25,
  },
  leftChevron:{
    position:'absolute',
    left: Constants.Marin2
  },
  rightChevron:{
    position:'absolute',
    right: Constants.Marin2
  },
  popoverBackground:{
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  popoverContent:{
    borderRadius: 7,
  }
});
