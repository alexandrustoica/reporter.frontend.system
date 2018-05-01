import * as React from "react";
import {Icon} from "./Icon";

export const SystemIcon = ({url, onPress}) =>
	<Icon url={url}
		  size={{width: 20, height: 20}}
		  margin={20}
		  onPress={onPress}/>