import {StyleSheet} from 'react-native'

export const withBackgroundColor = (color) => {
	return {
		backgroundColor: color
	}
}

export const withTextColor = (color) => {
	return {
		color: color
	}
}

export const FullButtonStyle = StyleSheet.create({
	button: {
		height: 70,
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

