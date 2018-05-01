import * as React from "react";
import {Box} from "./Box";

export const CenterBox = (props) =>
	<Box flexDirection={'row'}
	     justifyContent={'center'}
	     alignItems={'center'} {...props}>
		{props.children}
	</Box>
