import React from "react";
import Intro from "./Intro";
import {Colors} from "../elements/color/Colors";
import {IconType} from "../elements/icon/IconType";
import {Button} from "../elements/components/Button";
import {EditText} from "../elements/components/EditText";
import {KeyboardAvoidingView, ScrollView, StyleSheet} from "react-native";
import {NavigationBar} from "../elements/components/NavigationBar";
import {store} from "../utils/store";
import {SystemAction} from "../service/SystemEpicAction";
import RNPickerSelect from "react-native-picker-select";
import {Notifications, Permissions} from "expo";
import {Icon} from "react-native-elements";


// TODO DELETE THIS
export class LoginAfterRegister extends React.Component {

    __loginUnsubscribe = store.subscribe(() => {
        const token = store.getState().systemReducer.token
        if (token !== undefined) {
            this.__loginUnsubscribe()
            this.props.navigation.navigate('MyReports')
        }
    })

    render = () => null

    constructor(props) {
        super(props)
        const currentUser = store.getState().systemReducer.currentUser
        store.dispatch(SystemAction.login({
            username: currentUser.username,
            password: currentUser.password
        }))
    }

    componentWillUnmount() {
        this.__loginUnsubscribe();
    }
}

class RegisterForm extends React.Component {

    __registerUnsubscribe = store.subscribe(() => {
        const currentUser = store.getState().systemReducer.currentUser
        if (currentUser !== undefined) {
            this.__registerUnsubscribe();
            this.props.navigation.navigate('LoginAfterRegister')
        }
    })

    __registerForPushNotifications = async() => {
        const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') { return }
        return await Notifications.getExpoPushTokenAsync()
    }

    __getExpoNotificationToken = async () => {
        this.setState({expoToken: await this.__registerForPushNotifications()})
    }

    render = () =>
        <KeyboardAvoidingView
            behaviour={'padding'}
            style={{flex: this.state.flexValue}}>
            <NavigationBar
                text={""}
                leftIcon={{name: 'arrow-back', color: 'white'}}
                leftAction={() => this.props.navigation.goBack()}/>
            <ScrollView>
                <EditText
                    text={'Name'}
                    iconName={'perm-identity'}
                    iconColor={'black'}
                    onChangeText={async (name) =>
                        await this.setState({name: name})}/>
                <EditText
                    text={'Username'}
                    iconName={'fingerprint'}
                    iconColor={'black'}
                    onChangeText={async (username) =>
                        await this.setState({username: username})}/>
                <RNPickerSelect
                    placeholder={{
                        label: 'Normal Account',
                        value: "USER",
                    }}
                    style={{...pickerSelectStyles}}
                    items={[{label: 'Normal Account', value: 'USER'},
                        {label: 'Police Account', value: 'POLICE'}]}
                    onValueChange={(value) => this.setState({role: value})}
                    value={this.state.role}>
                </RNPickerSelect>
                <EditText
                    text={'Email'}
                    iconName={'email'}
                    iconColor={'black'}
                    onChangeText={async (email) =>
                        await this.setState({email: email})}/>
                <EditText
                    text={'Password'}
                    password={true}
                    iconName={'vpn-key'}
                    iconColor={'black'}
                    onChangeText={async (password) =>
                        await this.setState({password: password})}/>
                <EditText
                    text={'Confirm Password'}
                    password={true}
                    iconName={'vpn-key'}
                    iconColor={'black'}
                    onChangeText={async (confirmPassword) =>
                        await this.setState({confirmPassword: confirmPassword})}/>
                <Button
                    backgroundColor={Colors.BLACK}
                    height={70}
                    onPress={() => this.__onRegisterButtonClick()}
                    text='Register'/>
            </ScrollView>
        </KeyboardAvoidingView>

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            name: '',
            role: 'USER',
            flexValue: 10
        }
    }

    componentWillMount = async () =>
        await this.__getExpoNotificationToken()

    componentWillUnmount() {
        this.__registerUnsubscribe();
    }

    __onRegisterButtonClick = () => {
        store.dispatch(SystemAction.register({
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            email: this.state.email,
            name: this.state.name,
            role: this.state.role,
            expoNotificationToken: this.state.expoToken
        }))
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 10,
        backgroundColor: 'white',
        color: 'black',
    },
})

export default class Register extends React.Component {
    static navigationOptions = {header: null};
    render = () => <Intro content={<RegisterForm {...this.props}/>}/>
}
