import { StyleSheet } from 'react-native';
import Constants from '../../themes/constants'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.Harin8,
	  paddingLeft: Constants.Marin8,
	  paddingRight: Constants.Marin8,
  },
  title: {
    margin: 5,
    fontSize: 30,
    textAlign: 'center',
	color: 'rgb(111,187,215)',
  },
  groupEntry: {
		alignItems: 'center',
		textAlign: 'center',
		borderWidth:1,
    margin: 5,
	  },
	addGroupButton:{
		top: responsiveHeight(85),
    left: responsiveWidth(12),
    position: 'absolute'

	},
	modalContent: {
		backgroundColor: 'white',
		padding: 22,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
		borderColor: "rgba(0, 0, 0, 0.1)"
  },
  paragraph2: {
    margin: 5,
    fontSize: 20,
    textAlign: 'left',
  },

});
