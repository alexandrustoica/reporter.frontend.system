import {combineEpics, createEpicMiddleware} from "redux-observable";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {ReportEpic} from "../reports/Epics";
import {reportsReducer} from "../reports/Actions";
import {SystemEpic} from "../system/Epics";
import {userReducer} from "../user/Actions";
import {UserEpic} from "../user/Epics";
import {systemReducer} from "../system/Actions";
import thunk from "redux-thunk";

const reducer = combineReducers({
    reportsReducer: reportsReducer,
    userReducer: userReducer,
    systemReducer: systemReducer
})

const epic = combineEpics(ReportEpic, UserEpic, SystemEpic)

const epicMiddleware = createEpicMiddleware(epic);

export const store = createStore(reducer,
    applyMiddleware(epicMiddleware),
    //applyMiddleware(thunk)
);
