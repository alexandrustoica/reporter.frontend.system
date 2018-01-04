import * as React from "react";
import {Box} from "../box/Box";

export const Circle = ({radius, color, children}) =>
	<Box flex={0}
	     alignItems={'center'}
	     justifyContent={'center'}
	     flexDirection={'row'}
	     style={{
		     backgroundColor: color,
		     width: radius * 2,
		     height: radius * 2,
		     borderRadius: radius
	     }}>
		<Box alignItems={'center'}
		     justifyContent={'center'}
		     flexDirection={'column'}>
			{children}
		</Box>
	</Box>