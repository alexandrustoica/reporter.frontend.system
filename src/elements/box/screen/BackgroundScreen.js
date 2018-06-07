import {Image, ImageBackground} from "react-native";
import * as React from "react";
import {Screen} from "./Screen";

export const BackgroundScreen = () =>
    <Screen>
        <Image source={require("../../../../images/background.jpg")}/>
    </Screen>

