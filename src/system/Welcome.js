import React from "react";
import Intro from "./Intro";
import {Box} from "../elements/box/Box";
import {Colors} from "../elements/color/Colors";
import {HBox} from "../elements/box/HBox";
import {Button} from "../elements/components/Button";

const AccessButtons = (props) =>
    <Box justifyContent={'flex-end'} flex={0}>
        <HBox flex={null}>
            <Button height={70}
                    text={'Login'}
                    onPress={() => props.navigation.navigate('Login')}
                    backgroundColor={Colors.BLUE}/>
            <Button height={70}
                    onPress={() => props.navigation.navigate('Register')}
                    text={'Register'}/>
        </HBox>
    </Box>

export default class Welcome extends React.Component {
    static navigationOptions = {header: null};
    render = () => <Intro content={<AccessButtons {...this.props}/>}/>
}
