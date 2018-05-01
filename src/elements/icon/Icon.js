import {Image, TouchableOpacity} from "react-native";
import * as React from "react";
import {IconType} from "./IconType";

export const Icon = ({url = null, size, margin, onPress}) =>
    <TouchableOpacity
        style={{width: size * 2, height: size * 2}}
        onPress={onPress}>
        <Image source={url} style={{
            width: url === null ? 0 : size.width,
            height: url === null ? 0 : size.height,
            margin: url === null ? 0 : margin
        }}/>
    </TouchableOpacity>

Icon.defaultProps = {
    url: IconType.EMPTY,
    size: 20,
    margin: 20,
    onPress: () => console.log("Button Press!")
}