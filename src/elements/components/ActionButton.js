import * as React from "react";
import {Circle} from "../icon/Circle";
import {Colors} from "../color/Colors";
import {Icon} from "react-native-elements";

export const ActionButton = (props) =>
    <Circle radius={props.radius} color={props.color}
            style={{
                shadowColor: Colors.BLUE,
                shadowOffset: {
                    width: 0,
                    height: 10
                },
                shadowRadius: 30,
                shadowOpacity: 0.5,
            }}>
        <Icon name={props.icon.name}
              color={props.icon.color}

              onPess={props.onPress}/>
    </Circle>

ActionButton.defaultProps = {
    color: Colors.BLUE,
    radius: 30,
    onPress: () => {},
    icon: {name:'add', color:'white'}
}

