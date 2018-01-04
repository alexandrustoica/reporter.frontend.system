import * as React from "react";
import {TouchableOpacity} from "react-native";

export const Box = (props) =>
	<TouchableOpacity style={{
		flex: props.flex,
		flexDirection: props.flexDirection,
		justifyContent: props.justifyContent,
		alignItems: props.alignItems,
		flexWrap: props.flexWrap
	}}/>

Box.defaultProps = {
	flex: 1,
	flexWrap: 'nowrap',
	flexDirection: 'row',
	alignItems: 'center',
	justifyItems: 'center'
}

