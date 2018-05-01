import * as React from "react";
import {Box} from "./Box";

export const HBox = (props) =>
	<Box flexDirection={'row'} {...props}>
		{props.children}
	</Box>