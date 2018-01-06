import {SystemIcon} from "../icon/SystemIcon";
import * as React from "react";
import {Circle} from "../icon/Circle";
import {Colors} from "../color/Colors";
import {IconType} from "../icon/Icon";

export const ActionButton = (props) =>
	<Circle radius={props.radius} color={props.color}>
		<SystemIcon url={props.icon} onPress={props.onPress}/>
	</Circle>

ActionButton.defaultProps = {
	color: Colors.BLUE,
	radius: 40,
	onPress: null,
	icon: IconType.PLUS_LIGHT
}

