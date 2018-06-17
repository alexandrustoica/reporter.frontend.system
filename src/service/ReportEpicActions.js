import {Endpoint} from "./Endpoint";
import {createEpic} from "../utils/createEpic";
import {getDataFromServer} from "../utils/getDataFromServer";
import {combineEpics} from 'redux-observable'
import * as Rx from "rxjs";
import * as R from "ramda";

export const ReportEpicFollowUpAction = {
    takePhoto: photo => ({type: 'TAKE_PHOTO_DONE', payload: photo}),
    cleanPhotos: () => ({type: 'CLEAN_PHOTOS_DONE'}),
    removePhoto: photo => ({type: 'REMOVE_PHOTO_DONE', payload: photo}),
    create: report => ({type: 'CREATE_REPORT_DONE', payload: report}),
    delete: report => ({type: 'DELETE_REPORT_DONE', payload: report}),
    update: report => ({type: 'UPDATE_REPORT_DONE', payload: report}),
    getById: report => ({type: 'GET_REPORT_BY_ID_DONE', payload: report}),
    addCreatedSection: section => ({type: "SECTION_CREATED", payload: section}),
    deleteSection: section => ({type: "SECTION_DELETED", payload: section}),
    addToNearReports: report => ({
        type: 'ADD_NEAR_REPORT_DONE',
        payload: report
    }),
    getAll: reports => ({type: 'GET_REPORTS_DONE', payload: reports}),
    getAllNear: reports => ({
        type: 'GET_REPORTS_NEAR_LOCATION_DONE',
        payload: reports
    }),
    getReportOwnerUsername: reportWithOwner =>
        ({type: 'GET_REPORT_OWNER_USERNAME_DONE', payload: reportWithOwner}),
    getCriticalSectionsNear: criticalSections =>
        ({
            type: 'GET_CRITICAL_SECTIONS_NEAR_LOCATION_DONE',
            payload: criticalSections
        }),
    markReportAsSolved: report => ({
        type: 'MARK_REPORT_AS_SOLVED_DONE',
        payload: report
    }),
    markReportAsSpam: report => ({
        type: 'MARK_REPORT_AS_SPAM_DONE',
        payload: report
    })
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

const MarkReportAsSolvedEpic = createEpic()
    .forActionType('MARK_REPORT_AS_SOLVED')
    .withPromiseToJson(action => getDataFromServer()
        .fromEndpoint(Endpoint.REPORTS + `/${action.payload}/solved`)
        .withMethod('PUT')
        .withToken(action.token).withNothing())
    .map(ReportEpicFollowUpAction.markReportAsSolved)

const MarkReportAsSpamEpic = createEpic()
    .forActionType('MARK_REPORT_AS_SPAM')
    .withPromiseToJson(action => getDataFromServer()
        .fromEndpoint(Endpoint.REPORTS + `/${action.payload}/spam`)
        .withMethod('PUT')
        .withToken(action.token).withNothing())
    .map(ReportEpicFollowUpAction.markReportAsSpam)

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

const GetAllReportsNearLocationEpic = createEpic()
    .forActionType('GET_REPORTS_NEAR_LOCATION')
    .withPromiseToJson(action => getDataFromServer()
        .fromEndpoint(Endpoint.REPORTS + `/near`)
        .withMethod('PUT')
        .withToken(action.token)
        .with(action.payload))
    .map(ReportEpicFollowUpAction.getAllNear)

const GetCriticalSectionsNearLocationEpic = createEpic()
    .forActionType('GET_CRITICAL_SECTIONS_NEAR_LOCATION')
    .withPromiseToJson(action => getDataFromServer()
        .fromEndpoint(Endpoint.CRITICAL_SECTIONS)
        .withMethod('POST')
        .withToken(action.token)
        .with(action.payload))
    .map(ReportEpicFollowUpAction.getCriticalSectionsNear)

const GetReportOwnerUsernameEpic = createEpic()
    .forActionType('GET_REPORT_OWNER_USERNAME')
    .withPromiseToJson(action => getDataFromServer()
        .fromEndpoint(Endpoint.REPORTS + `/${action.payload}/owner`)
        .withMethod('GET')
        .withToken(action.token).withNothing())
    .map(ReportEpicFollowUpAction.getReportOwnerUsername)

export const ReportEpic = combineEpics(
    CreateReportEpic,
    UpdateReportEpic,
    DeleteReportEpic,
    GetReportByIdEpic,
    GetAllReportsEpic,
    MarkReportAsSolvedEpic,
    MarkReportAsSpamEpic,
    GetReportOwnerUsernameEpic,
    GetCriticalSectionsNearLocationEpic,
    GetAllReportsNearLocationEpic,
    TakePhotoEpic
)

export class ReportAction {
    delete = id => ({type: 'DELETE_REPORT', token: this.token, payload: id})
    getById = id => ({type: 'GET_REPORT_BY_ID', token: this.token, payload: id})
    create = report =>
        ({type: 'CREATE_REPORT', token: this.token, payload: report})
    update = report =>
        ({type: 'UPDATE_REPORT', token: this.token, payload: report})
    getAllAtPage = page =>
        ({type: 'GET_REPORTS', token: this.token, payload: page})
    takePhoto = camera => ({type: 'TAKE_PHOTO', payload: camera})
    getAllReportsNear = (araa) =>
        ({type: 'GET_REPORTS_NEAR_LOCATION', token: this.token, payload: araa})
    getAllCriticalSectionsNear = (araa) => ({
        type: 'GET_CRITICAL_SECTIONS_NEAR_LOCATION',
        token: this.token,
        payload: araa
    })
    getReportOwnerUsername = (id) =>
        ({type: 'GET_REPORT_OWNER_USERNAME', token: this.token, payload: id})
    markReportAsSpam = (id) =>
        ({type: 'MARK_REPORT_AS_SPAM', token: this.token, payload: id})
    markReportAsSolved = (id) =>
        ({type: 'MARK_REPORT_AS_SOLVED', token: this.token, payload: id})

    constructor(token) {
        this.token = token;
    }
}

const initialState = {
    reports: [],
    photos: [],
    wantedOwnerUsername: {ownerUsername: 'none'},
    reportsNearUserLocation: [],
    criticalSectionsNearUserLocation: []
}

export const reportsReducer = (state = initialState, action) => {
    const handlers = ({
        ['GET_REPORTS_DONE']: (state, action) => ({
            ...state,
            reports: R.uniqBy((it) => it.id, R.concat(state.reports, action.payload.content)),
            page: action.payload.number,
            isLast: action.payload.last
        }),
        ['GET_CRITICAL_SECTIONS_NEAR_LOCATION_DONE']: (state, action) => ({
            ...state,
            criticalSectionsNearUserLocation: action.payload
        }),
        ['GET_REPORT_OWNER_USERNAME_DONE']: (state, action) => ({
            ...state,
            wantedOwnerUsername: action.payload
        }),
        ['GET_REPORTS_NEAR_LOCATION_DONE']: (state, action) => ({
            ...state,
            reportsNearUserLocation: action.payload,
        }),
        ['ADD_NEAR_REPORT_DONE']: (state, action) => ({
            ...state,
            reportsNearUserLocation: R.uniqBy((it) => it.id,
                R.concat([action.payload], state.reportsNearUserLocation)),
        }),
        ['GET_REPORT_BY_ID_DONE']: (state, action) =>
            ({...state, wantedReport: action.payload}),
        ['DELETE_REPORT_DONE']: (state, action) => ({
            ...state,
            reports: R.filter(it => it.id !== action.payload.id, state.reports),
            reportsNearUserLocation: R.filter(it => it.id !== action.payload.id,
                state.reportsNearUserLocation)
        }),
        ['SECTION_CREATED']: (state, action) =>
            ({
                ...state,
                criticalSectionsNearUserLocation: R.uniqBy((it) => it.id,
                    R.concat([action.payload], state.criticalSectionsNearUserLocation))
            }),
        ['SECTION_DELETED']: (state, action) =>
            ({
                ...state,
                criticalSectionsNearUserLocation:
                    R.filter(it => it.id !== action.payload.id,
                        state.criticalSectionsNearUserLocation)
            }),
        ['CREATE_REPORT_DONE']: (state, action) =>
            ({...state, reports: [action.payload, ...state.reports]}),
        ['UPDATE_REPORT_DONE']: (state, action) =>
            ({...state, report: action.payload}),
        ['TAKE_PHOTO_DONE']: (state, action) =>
            ({...state, photos: [...state.photos, action.payload]}),
        ['CLEAN_PHOTOS_DONE']: (state, action) =>
            ({...state, photos: []}),
        ['REMOVE_PHOTO_DONE']: (state, action) =>
            ({
                ...state, photos: R.filter(it =>
                    it.uri !== action.payload.uri, state.photos)
            }),
        ['MARK_REPORT_AS_SOLVED_DONE']: (state, action) =>
            ({
                ...state,
                reports: R.map(it => it.id === action.payload.id ?
                    action.payload : it, state.reports),
                reportsNearUserLocation: R.filter(it => it.id !== action.payload.id,
                    state.reportsNearUserLocation)
            }),
        ['MARK_REPORT_AS_SPAM_DONE']: (state, action) =>
            ({
                ...state,
                reports: R.map(it => it.id === action.payload.id ?
                    action.payload : it, state.reports),
                reportsNearUserLocation: R.filter(it => it.id !== action.payload.id,
                    state.reportsNearUserLocation)
            }),
    })

    return handlers[action.type] ?
        handlers[action.type](state, action) : state
}