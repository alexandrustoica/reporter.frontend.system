import * as React from "react";
import {VBox} from "./VBox";
import {HBox} from "./HBox";

export const CenterBox = (props) =>
	<HBox><VBox>{props.children}</VBox></HBox>