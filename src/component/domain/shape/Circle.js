import {CenterObject} from "../decorators/CenterObject";
import * as React from "react";

export const Circle = ({radius, color, children}) =>
	<CenterObject style={{
		flexDirection: 'row',
		backgroundColor: color, width: radius * 2,
		height: radius * 2, borderRadius: radius}}>
		<CenterObject style={{flex: 1, flexDirection: 'column'}}><CenterObject>
			{children}</CenterObject></CenterObject></CenterObject>