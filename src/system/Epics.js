import {combineEpics} from "redux-observable";
import {Endpoint} from "../service/Endpoint";
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
    .withPromise(action => AsyncStorage.getItem('token'))
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