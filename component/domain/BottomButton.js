import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export class BottomButton extends React.Component {
    render = () =>
        <TouchableOpacity
            onPress={this.props.action}
            style={this.props.buttonStyle}>
            <Text style={this.props.textStyle}>{this.props.text}</Text>
        </TouchableOpacity>
}
