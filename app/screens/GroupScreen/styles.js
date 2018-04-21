import { StyleSheet } from 'react-native';
import Constants from '../../themes/constants'

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.Harin8,
	paddingLeft: Constants.Marin8,
	paddingRight: Constants.Marin8,
  },
  title: {
    margin: 24,
    fontSize: 30,
    textAlign: 'center',
	color: 'rgb(111,187,215)',
  },
  groupEntry: {
		alignItems: 'center',
		textAlign: 'center',
		borderWidth:1,
	  },
	addGroupButton:{
		top: Constants.Harin60,
		
		
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 22,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
		borderColor: "rgba(0, 0, 0, 0.1)"
  },
	
});
