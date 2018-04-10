import * as R from "ramda";

export class ReportAction {

    constructor(token) {
        this.token = token;
    }

    takePhoto = camera => ({type: 'TAKE_PHOTO', payload: camera})
    delete = id => ({type: 'DELETE_REPORT', token: this.token, payload: id})
    getById = id => ({type: 'GET_REPORT_BY_ID', token: this.token, payload: id})
    create = report =>
        ({type: 'CREATE_REPORT', token: this.token, payload: report})
    update = report =>
        ({type: 'UPDATE_REPORT', token: this.token, payload: report})
    getAllAtPage = page =>
        ({type: 'GET_REPORTS', token: this.token, payload: page})
}

export const reportsReducer = (state = {reports: [], photos: []}, action) => {
    const handlers = ({
        ['GET_REPORTS_DONE']: (state, action) => ({
            ...state,
            reports: R.uniq(R.concat(state.reports, action.payload.content)),
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