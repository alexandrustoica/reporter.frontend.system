import {Logo} from "../elements/text/Logo";
import * as React from "react";
import {Box} from "../elements/box/Box";
import {StatusBar} from "react-native";
import {Screen} from "../elements/box/screen/Screen";
import {LinearGradient} from "expo";
import {CenterBox} from "../../lib/box/CenterBox";

export default class Intro extends React.Component {

    render = () =>
        <Box>
            <StatusBar
                backgroundColor="transparent"
                barStyle="light-content"/>
            <Screen>
                <LinearGradient
                    colors={['#171818', '#0b0b0b']}
                    style={{flex: 1, width:"100%", height:"100%", position: 'absolute'}}>
                    <CenterBox><Logo/></CenterBox>
                    {this.props.content}
                </LinearGradient>
            </Screen>
        </Box>
}
