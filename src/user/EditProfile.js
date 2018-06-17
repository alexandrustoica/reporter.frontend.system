import React from "react";
import {IconType} from "../elements/icon/IconType";
import {Screen} from "../elements/box/screen/Screen";
import {NavigationBar} from "../elements/components/NavigationBar";
import {store} from "../utils/store";
import {UserAction} from "../service/UserEpicAction";
import {EditText} from "../elements/components/EditText";
import {Colors} from "../elements/color/Colors";
import {Button} from "../elements/components/Button";
import * as R from "ramda";
import {KeyboardAvoidingView, StatusBar} from "react-native";
import {Box} from "../elements/box/Box";


export default class EditProfile extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)
        const {token} = store.getState().systemReducer
        this.state = {
            token: token,
            userReducer: store.getState().userReducer
        }
    }

    __unsubscribeCurrentUserObserver = store.subscribe(() =>
        this.setState({userReducer: store.getState().userReducer}))

    componentWillUnmount = () => this.__unsubscribeCurrentUserObserver()

    componentWillMount = () =>
        store.dispatch(new UserAction(this.state.token).getCurrentUser())

    render = () =>
        <Screen backgroundColor={'white'}>
            <NavigationBar
                text={"Edit Profile"}
                align={'left'}
                leftIcon={{name: 'arrow-back', color:'black'}}
                leftAction={() => this.props.navigation.goBack()}/>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"/>
            <Box flex={1}/>
            <KeyboardAvoidingView style={{flex: 2}}>
                <EditText
                    text={`${this.state.userReducer.currentUser.name}`}
                    onChangeText={(text) => this.setState({
                        userReducer: R.set(R.lensPath(['currentUser', 'name']),
                            text, this.state.userReducer)
                    })}
                    iconName={'perm-identity'}
                    iconColor={'black'}/>
                <EditText
                    text={`${this.state.userReducer.currentUser.username}`}
                    onChangeText={(text) => this.setState({
                        userReducer: R.set(R.lensPath(['currentUser', 'username']),
                            text, this.state.userReducer)
                    })}
                    iconName={'fingerprint'}
                    iconColor={'black'}/>
                <EditText
                    text={`${this.state.userReducer.currentUser.email}`}
                    iconName={'email'}
                    iconColor={'black'}
                    onChangeText={(text) => this.setState({
                        userReducer: R.set(R.lensPath(['currentUser', 'email']),
                            text, this.state.userReducer)
                    })}/>
                <Button
                    backgroundColor={Colors.SUMMER_BLUE}
                    text={"SAVE CHANGES"}
                    height={70}
                    flex={null}
                    onPress={() => {
                        store.dispatch(new UserAction(this.state.token)
                            .update(this.state.userReducer.currentUser))
                        this.props.navigation.navigate('MyProfile')
                    }}/>
            </KeyboardAvoidingView>

        </Screen>


}

