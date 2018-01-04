import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {SystemIcon} from "../../icon/SystemIcon";
import {Box} from "../../box/Box";



export class TextField extends React.Component {

    defaultProps = {
        password: false,
        input: 'Text',
        onChangeText: (text) => console.log(text),
        image: null
    }

    render = () =>
	    <Box>
            <TextInput
                placeholder={this.props.input}
                placeholderTextColor='#A2A2A2'
                style={style.field}
                secureTextEntry={this.props.password}
                underlineColorAndroid={'transparent'}
                onChangeText={this.props.onChangeText}/>
            <SystemIcon source={this.props.image}/>
	    </Box>
}


// TODO: Move this in the right place.
const style = StyleSheet.create({
    container: {
        height: 70,
        width: '100%',
        paddingRight: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#F9F9F9',
        backgroundColor: 'white',
    },
    field: {
        flexGrow: 1,
    }
});


