import {Logo} from "../text/Logo";
import * as React from "react";
import {Box} from "../box/Box";
import {StatusBar} from "react-native";
import {BackgroundScreen} from "../screen/BackgroundScreen";

export default class Intro extends React.Component {
    render = () =>
        <Box>
            <StatusBar
                backgroundColor="transparent"
                barStyle="light-content"
            />
            <BackgroundScreen/>
            <Box flexDirection={'column'}
                 alignItems={'center'}
                 justifySelf={'space-around'}>
                <Logo/>
            </Box>
            {this.props.content}
        </Box>
}
