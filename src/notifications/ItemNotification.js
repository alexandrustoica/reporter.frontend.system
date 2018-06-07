import * as React from "react";
import {Text, TouchableOpacity} from "react-native";
import {Colors} from "../elements/color/Colors";
import {Box} from "../elements/box/Box";
import {SystemIcon} from "../elements/icon/SystemIcon";
import {IconType} from "../elements/icon/IconType";
import moment from "moment/moment";
import {HBox} from "../elements/box/HBox";
import {Icon} from "react-native-elements";

const CardStyle = {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: Colors.BLUE,
    shadowOffset: {
        width: 0,
        height: 10
    },
    shadowRadius: 10,
    shadowOpacity: 0.15,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
}

const IconStyle = {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    width: 80,
    height: '80%',
    borderRadius: 10,
}

const TitleStyle = {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 24,
    fontWeight: 'bold'
}

const TextStyle = {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold'
}

const DateStyle = {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 20,
}

export class Notification {
    constructor(notification) {
        this.id = notification.id
        this.title = notification.title;
        this.date = notification.date;
        this.message = notification.message;
        this.isRead = notification.read;
    }
}

const CoverIcon = (props) =>
    <Box alignItems={'center'}
         justifyContent={'center'}
         style={[IconStyle, {backgroundColor: props.color}]}>
        <Icon name={'notifications-active'} color={'white'}/>
    </Box>

export const ItemNotification = (props) =>
    <TouchableOpacity
        activeOpacity={1.0}
        onPress={() =>
            props.markNotificationAsRead(props.item.id)}
        style={CardStyle}>

        <HBox alignItems={"center"}>
            <CoverIcon
                color={props.item.isRead ? Colors.GREY : Colors.SUMMER_BLUE}
                icon={IconType.PLUS_DARK}/>
            <Box flex={3} flexDirection={'column'}>
                <Text style={TitleStyle}>{props.item.title}</Text>
                <Text style={TextStyle}>{props.item.message}</Text>
                <Text
                    style={DateStyle}>{moment(props.item.date).fromNow()}</Text>
            </Box>
        </HBox>
    </TouchableOpacity>

ItemNotification.defaultProps = {
    item: new Notification({
        id: "0",
        title: "notification",
        message: "message",
        date: Date.now(),
        isRead: false
    }),
    markNotificationAsRead: (id) => {},
    icon: IconType.REPORTS_ICON,
    coverColor: Colors.LIGHT_BLUE
}