import * as React from "react";
import {Animated} from "react-native";

export class AnimatedViewFadeIn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            opacity: new Animated.Value(0)
        }
    }

    componentDidMount = () =>
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 2000
        }).start()

    render = () =>
        <Animated.View style={{
            ...this.props.style,
            opacity: this.state.opacity
        }}>
            {this.props.children}
        </Animated.View>
}