import * as React from "react";
import {Box} from "../box/Box";
import {Colors} from "../color/Colors";

export const Circle = (props) =>
	<Box flex={0}
	     alignItems={'center'}
	     justifyContent={'center'}
	     flexDirection={'row'}
	     style={[{
		     backgroundColor: props.color,
		     width: props.radius * 2,
		     height: props.radius * 2,
		     borderRadius: props.radius
	     }, props.style]}>
		<Box alignItems={'center'}
		     justifyContent={'center'}
		     flexDirection={'column'}>
			{props.children}
		</Box>
	</Box>

Circle.props = {
	style: null,
    radius: 30,
	color: Colors.BLUE,
}