import {Image} from "react-native";
import {BackgroundImageStyle} from "../styles/Styles";
import * as React from "react";

export const BackgroundImage = () =>
    <Image style={BackgroundImageStyle.backgroundImage}
           source={require("../../images/login_background.png")}/>
