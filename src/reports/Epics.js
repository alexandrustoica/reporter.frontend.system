import {Endpoint} from "../service/Endpoint";
import {createEpic} from "../utils/createEpic";
import {getDataFromServer} from "../utils/getDataFromServer";
import {combineEpics} from 'redux-observable'

const ReportEpicFollowUpAction = {
    create: report => ({type: 'CREATE_REPORT_DONE', payload: report}),
    delete: report => ({type: 'DELETE_REPORT_DONE', payload: report}),
    update: report => ({type: 'UPDATE_REPORT_DONE', payload: report}),
    getById: report => ({type: 'GET_REPORT_BY_ID_DONE', payload: report}),
    getAll: reports => ({type: 'GET_REPORTS_DONE', payload: reports}),
}

const CreateReportEpic = createEpic()
    .forActionType('CREATE_REPORT')
    .withPromiseToJson(action => getDataFromServer()
        .fromEndpoint(Endpoint.REPORTS)
        .withMethod('POST')
        .withToken(action.token)
        .with(action.payload))
    .map(ReportEpicFollowUpAction.create)

const UpdateReportEpic = createEpic()
    .forActionType('UPDATE_REPORT')
    .withPromiseToJson(action => getDataFromServer()
        .fromEndpoint(Endpoint.REPORTS)
        .withMethod('PUT')
        .withToken(action.token)
        .with(action.payload))
    .map(ReportEpicFollowUpAction.update)

const DeleteReportEpic = createEpic()
    .forActionType('DELETE_REPORT')
    .withPromiseToJson(action => getDataFromServer()
        .fromEndpoint(Endpoint.REPORTS + `/${action.payload}`)
        .withMethod('DELETE')
        .withToken(action.token).withNothing())
    .map(ReportEpicFollowUpAction.delete)

const GetReportByIdEpic = createEpic()
    .forActionType('GET_REPORT_BY_ID')
    .withPromiseToJson(action => getDataFromServer()
        .fromEndpoint(Endpoint.REPORTS + `/${action.payload}`)
        .withMethod('GET')
        .withToken(action.token).withNothing())
    .map(ReportEpicFollowUpAction.getById)

const GetAllReportsEpic = createEpic()
    .forActionType('GET_REPORTS')
    .withPromiseToJson(action => getDataFromServer()
        .fromEndpoint(Endpoint.REPORTS + `?page=${action.payload}&size=10`)
        .withMethod('GET')
        .withToken(action.token).withNothing())
    .map(ReportEpicFollowUpAction.getAll)

export const ReportEpic = combineEpics(
    CreateReportEpic,
    UpdateReportEpic,
    DeleteReportEpic,
    GetReportByIdEpic,
    GetAllReportsEpic
)