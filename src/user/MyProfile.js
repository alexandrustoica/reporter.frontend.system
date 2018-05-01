import React from "react";
import {Box} from "../elements/box/Box";
import {IconType} from "../elements/icon/IconType";
import {Screen} from "../elements/box/screen/Screen";
import {Text, View} from "react-native";
import {NavigationBar} from "../elements/components/NavigationBar";
import {store} from "../utils/store";
import {UserAction} from "../service/UserEpicAction";
import moment from "moment/moment";
import {EditText} from "../elements/components/EditText";
import {Colors} from "../elements/color/Colors";


export default class Profile extends React.Component {

    static navigationOptions = {header: null};

    constructor(props) {
        super(props)
        const {token} = store.getState().systemReducer
        this.state = {
            token: token,
            userReducer: store.getState().userReducer
        }
    }

    __unsubscribeCurrentUserObserver = store.subscribe(() => {
        console.log(store.getState().userReducer)
        this.setState({userReducer: store.getState().userReducer})
    })

    componentWillMount = () =>
        store.dispatch(new UserAction(this.state.token).getCurrentUser())

    render = () =>
        <Screen backgroundColor={'white'}>
            <NavigationBar
                text={"My Profile"}
                align={'left'}
                leftIcon={IconType.BACK_DARK}
                rightIcon={IconType.TIME_DARK}
                leftAction={() => this.props.navigation.goBack()}
                rightAction={() => this.props.navigation.navigate('EditProfile')}/>
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
                icon={IconType.PROFILE_DARK}/>
            <EditText
                text={`Email ${this.state.userReducer.currentUser.email}`}
                editable={false}
                icon={IconType.PROFILE_DARK}/>
            <EditText
                text={`Account created ${moment(this.state.userReducer.currentUser.date).fromNow()}`}
                editable={false}
                icon={IconType.TIME_DARK}/>
        </Screen>


}

