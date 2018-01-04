import {MarginContainer} from "../container/MarginContainer";
import {SystemIcon} from "../../icon/SystemIcon";
import * as React from "react";
import {AbsoluteContainer} from "../container/AbsoluteContainer";
import {Circle} from "../shape/Circle";

export const ActionButton = ({radius = 40, icon = {}, iconSize = 20, color = 'red',
	                             onPress = () => console.log("Action Button Press")}) =>
	<AbsoluteContainer
		style={{width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
		<MarginContainer margin={20}><Circle radius={radius} color={color}>
			<SystemIcon url={icon} onPress={onPress}/>
		</Circle></MarginContainer></AbsoluteContainer>