import {combineEpics} from "redux-observable";
import {Endpoint} from "./Endpoint";
import {createEpic} from "../utils/createEpic";
import {getDataFromServer} from "../utils/getDataFromServer";
import {AsyncStorage} from "react-native";

const SystemEpicFollowUpAction = {
    updateToken: token => ({type: 'UPDATE_TOKEN_DONE', payload: token}),
    register: user => ({type: 'REGISTER_DONE', payload: user}),
    login: token => ({type: 'LOGIN_DONE', payload: token}),
}

const GetLocalTokenEpic = createEpic()
    .forActionType('UPDATE_TOKEN')
    .withPromise(() => AsyncStorage.getItem('token'))
    .map(SystemEpicFollowUpAction.updateToken)

const LoginEpic = createEpic()
    .forActionType('LOGIN')
    .withPromise(action => (getDataFromServer()
        .fromEndpoint(Endpoint.LOGIN)
        .withMethod('POST')
        .withToken()
        .with(action.payload))
        .then(response => response.headers.get("authorization")))
    .map(SystemEpicFollowUpAction.login)

const RegisterEpic = createEpic()
    .forActionType('REGISTER')
    .withPromise(action => (getDataFromServer()
        .fromEndpoint(Endpoint.REGISTER)
        .withMethod('POST')
        .withToken()
        .with(action.payload))
        .then(response => ({
            username: action.payload.username,
            password: action.payload.password
        })))
    .map(SystemEpicFollowUpAction.register)

export const SystemEpic = combineEpics(
    LoginEpic,
    RegisterEpic,
    GetLocalTokenEpic
)

export const SystemAction = {
    updateToken: () => ({type: 'UPDATE_TOKEN'}),
    login: user => ({type: 'LOGIN', payload: user}),
    register: user => ({type: 'REGISTER', payload: user}),
    saveToLocalStorage: (token, lastUpdated, user) => ({
        type: 'SAVE_TO_LOCAL_STORAGE',
        payload: {
            token: token,
            currentUser: user,
            lastUpdated: lastUpdated
        }
    })
}

export const systemReducer = (state = {}, action) => {

    const handlers = ({
        ['SAVE_TO_LOCAL_STORAGE_DONE']: (state, action) => ({
            ...state
        }),
        ['UPDATE_TOKEN_DONE']: (state, action) => action.payload != null ?
            ({
                ...state,
                lastUpdated: Date.now(),
                token: action.payload
            }) : state,
        ['LOGIN_DONE']: (state, action) => ({
            ...state,
            lastUpdated: Date.now(),
            token: action.payload
        }),
        ['REGISTER_DONE']: (state, action) => ({
            ...state,
            currentUser: action.payload
        })
    })

    return handlers[action.type] ?
        handlers[action.type](state, action) : state
}