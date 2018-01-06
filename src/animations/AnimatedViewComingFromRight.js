import * as React from "react";
import {Animated} from "react-native";

export class AnimatedViewComingFromRight extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            marginLeft: new Animated.Value(100)
        }
    }

    componentDidMount = () =>
        Animated.timing(this.state.marginLeft, {
            toValue: 0,
            duration: 2000
        }).start()

    render = () =>
        <Animated.View style={{
            ...this.props.style,
            marginLeft: this.state.marginLeft
        }}>
            {this.props.children}
        </Animated.View>
}