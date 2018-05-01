import {Endpoint} from "./Endpoint";
import {createEpic} from "../utils/createEpic";
import {getDataFromServer} from "../utils/getDataFromServer";
import {combineEpics} from 'redux-observable'
import * as Rx from "rxjs";
import * as R from "ramda";

const ReportEpicFollowUpAction = {
    takePhoto: photo => ({type: 'TAKE_PHOTO_DONE', payload: photo}),
    create: report => ({type: 'CREATE_REPORT_DONE', payload: report}),
    delete: report => ({type: 'DELETE_REPORT_DONE', payload: report}),
    update: report => ({type: 'UPDATE_REPORT_DONE', payload: report}),
    getById: report => ({type: 'GET_REPORT_BY_ID_DONE', payload: report}),
    getAll: reports => ({type: 'GET_REPORTS_DONE', payload: reports}),
}

const TakePhotoEpic = action$ =>
    action$.ofType('TAKE_PHOTO')
        .mergeMap(action => Rx.Observable.fromPromise(
            action.payload.takePictureAsync({quality: 1, base64: true}))
            .map(ReportEpicFollowUpAction.takePhoto))

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
        .fromEndpoint(Endpoint.REPORTS + `/${action.payload}/10`)
        .withMethod('GET')
        .withToken(action.token).withNothing())
    .map(ReportEpicFollowUpAction.getAll)

export const ReportEpic = combineEpics(
    CreateReportEpic,
    UpdateReportEpic,
    DeleteReportEpic,
    GetReportByIdEpic,
    GetAllReportsEpic,
    TakePhotoEpic
)

export class ReportAction {

    takePhoto = camera => ({type: 'TAKE_PHOTO', payload: camera})
    delete = id => ({type: 'DELETE_REPORT', token: this.token, payload: id})
    getById = id => ({type: 'GET_REPORT_BY_ID', token: this.token, payload: id})
    create = report =>
        ({type: 'CREATE_REPORT', token: this.token, payload: report})
    update = report =>
        ({type: 'UPDATE_REPORT', token: this.token, payload: report})
    getAllAtPage = page =>
        ({type: 'GET_REPORTS', token: this.token, payload: page})

    constructor(token) {
        this.token = token;
    }
}

export const reportsReducer = (state = {reports: [], photos: []}, action) => {
    const handlers = ({
        ['GET_REPORTS_DONE']: (state, action) => ({
            ...state,
            reports: R.uniqBy((it) => it.id, R.concat(state.reports, action.payload.content)),
            page: action.payload.number,
            isLast: action.payload.last
        }),
        ['GET_REPORT_BY_ID_DONE']: (state, action) =>
            ({...state, wantedReport: action.payload}),
        ['DELETE_REPORT_DONE']: (state, action) => ({
            ...state,
            reports: [...R.filter(it => it.id === action.id, state.reports)]
        }),
        ['CREATE_REPORT_DONE']: (state, action) =>
            ({...state, reports: [action.payload, ...state.reports]}),
        ['UPDATE_REPORT_DONE']: (state, action) =>
            ({...state, report: action.payload}),
        ['TAKE_PHOTO_DONE']: (state, action) =>
            ({...state, photos: [...state.photos, action.payload]})
    })

    return handlers[action.type] ?
        handlers[action.type](state, action) : state
}