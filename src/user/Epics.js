import {createEpic} from "../utils/createEpic";
import {Endpoint} from "../service/Endpoint";
import {getDataFromServer} from "../utils/getDataFromServer";
import {combineEpics} from 'redux-observable'

const UserEpicFollowUpAction = {
    currentUser: user => ({type: 'CURRENT_USER_DONE', payload: user})
}

const GetCurrentUserEpic = createEpic()
    .forActionType('GET_CURRENT_USER')
    .withPromiseToJson(action => getDataFromServer()
        .fromEndpoint(Endpoint.USERS + '/current')
        .withMethod('GET')
        .withToken(action.token)
        .withNothing())
    .map(UserEpicFollowUpAction.currentUser)

export const UserEpic = combineEpics(GetCurrentUserEpic)