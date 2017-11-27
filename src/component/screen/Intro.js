import {Logo} from "../domain/text/Logo";
import {View} from "react-native";
import * as React from "react";
import {BackgroundScreen} from "../domain/other/BackgroundScreen";
import FlexBuilder from "../styles/FlexBuilder";


export default class Intro extends React.Component {

    flexBuilder = new FlexBuilder().withFlexValue(1).withColumnFlex().withItemAlignment("center");

    render = () =>
        <View style={this.flexBuilder.withJustifyContent("space-between").build()}>
            <BackgroundScreen/>
            <View style={this.flexBuilder.withJustifyContent("center").build()}>
                <Logo/>
            </View>
            {this.props.content}
        </View>
}
