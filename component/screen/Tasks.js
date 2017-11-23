import {Image, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import FlexBuilder from "../styles/FlexBuilder";

class ActionButton extends React.Component {
    flexBuilder = new FlexBuilder().withColumnFlex().withJustifyContent("center").withItemAlignment("center");
    render = () =>
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[{elevation: 10, width: 70, height: 70, backgroundColor: 'red', borderRadius: 35, margin: 20},
                    this.flexBuilder.withSelfAlignment("flex-end").build(),]}>
                <Image source={this.props.icon} style={{width: 20, height: 20}}/>
            </TouchableOpacity>
}

export default class Tasks extends React.Component {
    static navigationOptions = {header: null};
    flexBuilder = new FlexBuilder().withFlexValue(1).withColumnFlex().withItemAlignment("center");
    render = () =>
        <View style={this.flexBuilder.withJustifyContent("space-between").build()}>
            <Text>Task</Text>
            <ActionButton
                onPress={() => console.log("Pressed")}
                icon={require('../../images/plus_icon.png')}/>
        </View>
}
