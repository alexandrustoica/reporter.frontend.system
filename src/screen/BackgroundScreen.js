import {Image} from "react-native";
import * as React from "react";
import {Screen} from "./Screen";

export const BackgroundScreen = () =>
    <Screen>
        <Image
            style={{flex: 1, resizeMode: 'cover', position: 'absolute'}}
            source={require('../../images/login_background.png')}/>
    </Screen>

