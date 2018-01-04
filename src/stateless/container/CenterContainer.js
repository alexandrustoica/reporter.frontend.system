import * as React from "react";
import {View} from "react-native";
import PropTypes from 'prop-types';

export const CenterContainer = ({style, children}) =>
	<View
		style={[{flex: 1, alignItems: 'center', justifyContent: 'center'}, style]}>
		{children}
	</View>

CenterContainer.defaultProps = {style: ""}
CenterContainer.propsTypes = {style: PropTypes.object}
