import * as React from "react";
import {Animated} from "react-native";

export class AnimatedViewComingFromRight extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            marginLeft: new Animated.Value(300),
            marginRight: new Animated.Value(-300),
        }
    }

    componentDidMount = () => {
        Animated.timing(this.state.marginLeft, {
            toValue: this.props.marginLeft,
            duration: 1500
        }).start()
        Animated.timing(this.state.marginRight, {
            toValue: this.props.marginRight,
            duration: 1500
        }).start()
    }

    render = () =>
        <Animated.View style={{
            ...this.props.style,
            marginLeft: this.state.marginLeft,
            marginRight: this.state.marginRight,
        }}>
            {this.props.children}
        </Animated.View>
}