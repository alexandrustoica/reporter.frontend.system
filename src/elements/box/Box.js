import * as React from "react";
import {View} from "react-native";

export const Box = (props) =>
	<View pointerEvents={props.pointerEvents} style={[{
		flex: props.flex,
		width: props.width,
		height: props.height,
		flexDirection: props.flexDirection,
		justifyContent: props.justifyContent,
		alignItems: props.alignItems,
		alignSelf: props.alignSelf,
	}, props.style]}>
		{props.children}
	</View>

Box.defaultProps = {
	flex: 1,
    pointerEvents: 'auto',
	flexDirection: null,
	justifyContent: null,
	alignItems: null,
	alignSelf: null,
	width: null,
	height: null,
	style: {},
}