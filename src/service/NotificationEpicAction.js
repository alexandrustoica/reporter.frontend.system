import * as R from "ramda";
import {combineEpics} from "redux-observable";
import {createEpic} from "../utils/createEpic";
import {getDataFromServer} from "../utils/getDataFromServer";
import {Endpoint} from "./Endpoint";

export const NotificationEpicFollowUpAction = {
    markNotificationAsRead: notification => ({
        type: 'MARK_NOTIFICATION_AS_READ_DONE',
        payload: notification,
    }),
    getAll: notifications => ({
        type: 'GET_NOTIFICATIONS_DONE',
        payload: notifications
    }),
}

const GetAllNotificationsEpic = createEpic()
    .forActionType('GET_NOTIFICATIONS')
    .withPromiseToJson(action => getDataFromServer()
        .fromEndpoint(Endpoint.NOTIFICATIONS + `/${action.payload}/10`)
        .withMethod('GET')
        .withToken(action.token).withNothing())
    .map(NotificationEpicFollowUpAction.getAll)


const MarkNotificationAsReadEpic = createEpic()
    .forActionType('MARK_NOTIFICATION_AS_READ')
    .withPromiseToJson(action => getDataFromServer()
        .fromEndpoint(Endpoint.NOTIFICATIONS + `/${action.payload}`)
        .withMethod('PUT')
        .withToken(action.token).withNothing())
    .map(NotificationEpicFollowUpAction.markNotificationAsRead)

export const NotificationEpic = combineEpics(
    GetAllNotificationsEpic,
    MarkNotificationAsReadEpic
)

export class NotificationAction {

    constructor(token) {
        this.token = token;
    }
    markNotificationAsRead = id =>
        ({type: 'MARK_NOTIFICATION_AS_READ', token: this.token, payload: id})
    getAllAtPage = page =>
        ({type: 'GET_NOTIFICATIONS', token: this.token, payload: page})
}

export const notificationReducer = (state = {
    notifications: [],
    page: 0,
    isLast: false
}, action) => {
    const handlers = ({
        ['GET_NOTIFICATIONS_DONE']: (state, action) => ({
            ...state,
            notifications: R.uniqBy((it) => it.id,
                R.concat(state.notifications, action.payload.content)),
            page: action.payload.number,
            isLast: action.payload.last
        }),
        ['MARK_NOTIFICATION_AS_READ_DONE']: (state, action) =>
            ({...state, lastNotificationMarkedAsRead: action.payload}),
    })
    return handlers[action.type] ?
        handlers[action.type](state, action) : state
}