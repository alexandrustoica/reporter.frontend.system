import {createEpic} from "../utils/createEpic";
import {Endpoint} from "./Endpoint";
import {getDataFromServer} from "../utils/getDataFromServer";
import {combineEpics} from 'redux-observable'

const UserEpicFollowUpAction = {
    currentUser: user => ({type: 'CURRENT_USER_DONE', payload: user}),
    updateUser: user => ({type: 'CURRENT_USER_DONE', payload: user})
}

const GetCurrentUserEpic = createEpic()
    .forActionType('GET_CURRENT_USER')
    .withPromiseToJson(action => getDataFromServer()
        .fromEndpoint(Endpoint.USERS + '/current')
        .withMethod('GET')
        .withToken(action.token)
        .withNothing())
    .map(UserEpicFollowUpAction.currentUser)


const UpdateUserEpic = createEpic()
    .forActionType('UPDATE_USER')
    .withPromiseToJson(action => getDataFromServer()
        .fromEndpoint(Endpoint.USERS + '/')
        .withMethod('PUT')
        .withToken(action.token)
        .with(action.payload))
    .map(UserEpicFollowUpAction.updateUser)

export const UserEpic = combineEpics(GetCurrentUserEpic, UpdateUserEpic)

export class UserAction {

    getCurrentUser = () => ({type: 'GET_CURRENT_USER', token: this.token})
    update = (user) => ({type: 'UPDATE_USER', token: this.token, payload: user})

    constructor(token) {
        this.token = token;
    }
}

const initialStateValue = {
    currentUser: {
        id: 0,
        username: 'Loading',
        name: 'Loading',
        password: 'Loading',
        email: 'Loading',
        role: 'USER',
        date: Date.now(),
    }
}

export const userReducer = (state = initialStateValue, action) => {
    const handlers = ({
        ['CURRENT_USER_DONE']: (state, action) =>
            ({...state, currentUser: action.payload})
    })
    return handlers[action.type] ?
        handlers[action.type](state, action) : state
}