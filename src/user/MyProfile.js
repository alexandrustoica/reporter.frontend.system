import React from "react";
import {Box} from "../elements/box/Box";
import {IconType} from "../elements/icon/IconType";
import {Screen} from "../elements/box/screen/Screen";
import {StatusBar, Text, View} from "react-native";
import {NavigationBar} from "../elements/components/NavigationBar";
import {store} from "../utils/store";
import {UserAction} from "../service/UserEpicAction";
import moment from "moment/moment";
import {EditText} from "../elements/components/EditText";
import {Colors} from "../elements/color/Colors";
import {Icon} from "react-native-elements";

export default class Profile extends React.Component {

    static navigationOptions = {
        header: null,
        title: 'My Profile',
        drawerIcon: () => <Icon name={'face'} color={'black'}/>
    };

    constructor(props) {
        super(props)
        const {token} = store.getState().systemReducer
        const {userReducer} = store.getState()
        this.state = {
            token: token,
            userReducer: userReducer
        }
    }

    __unsubscribeCurrentUserObserver = store.subscribe(() => {
        this.setState({userReducer: store.getState().userReducer})
    })

    componentWillMount = () =>
        store.dispatch(new UserAction(this.state.token).getCurrentUser())

    componentWillUnmount = () => this.__unsubscribeCurrentUserObserver()

    render = () =>
        <Screen backgroundColor={'white'}>
            <NavigationBar
                text={"My Profile"} align={'left'}
                leftIcon={{name: "menu", color: "black"}}
                leftAction={() => this.props.navigation.navigate('DrawerOpen')}
                rightIcon={{name: "edit", color: "black"}}
                rightAction={() => this.props.navigation.navigate('EditProfile')}/>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"/>
            <Box flex={3} alignItems={'center'} flexDirection={'column'}
                 style={{margin: 20}}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    padding: 30
                }}>
                    {this.state.userReducer.currentUser.name}
                </Text>
                <View style={{
                    borderRadius: 5, padding: 10,
                    backgroundColor: Colors.SUMMER_BLUE
                }}>
                    <Text style={{fontSize: 16}}>
                        {this.state.userReducer.currentUser.role}
                    </Text>
                </View>
            </Box>
            <EditText
                text={`Username ${this.state.userReducer.currentUser.username}`}
                editable={false}
                iconName={'fingerprint'}
                iconColor={'black'}/>
            <EditText
                text={`Email ${this.state.userReducer.currentUser.email}`}
                editable={false}
                iconName={'email'}
                iconColor={'black'}/>
            <EditText
                text={`Account created ${moment(this.state.userReducer.currentUser.date).fromNow()}`}
                editable={false}
                iconName={'access-time'}
                iconColor={'black'}/>
        </Screen>


}

