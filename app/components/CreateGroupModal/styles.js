import { StyleSheet } from 'react-native';
import { Constants } from '../../themes/';
export default styles = StyleSheet.create({
	groupEntry: {
		flex:3,
		borderColor: '#696969',
		color: '#696969',
		borderWidth:1,
		borderRadius:10,
	  },
	title: {
		margin: 24,
		fontSize: 30,
		textAlign: 'center',
		color: 'rgb(111,187,215)',
	  },
	  container: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ecf0f1',
	  },

}
