import { StyleSheet } from 'react-native';
import { Constants } from '../../themes/';
export default styles = StyleSheet.create({
	groupEntry: {
		alignItems: 'center',
		textAlign: 'center',
		borderWidth:1,
	  },
	title: {

		margin: 24,
		fontSize: 40,
		textAlign: 'center',
		color: 'rgb(111,187,215)',
	  },
	  container: {
		flex:3,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ecf0f1',
	  },
	  addGroupButton:{
			fontWeight:'bold',
			top:Constants.Harin3,
			bottom: Constants.Harin5,


	  },

});
