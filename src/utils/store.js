import {combineEpics, createEpicMiddleware} from "redux-observable";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {ReportEpic} from "../service/ReportEpicActions";
import {reportsReducer} from "../service/ReportEpicActions";
import {SystemEpic, systemReducer} from "../service/SystemEpicAction";
import {UserEpic, userReducer} from "../service/UserEpicAction";
import {
    NotificationEpic,
    notificationReducer
} from "../service/NotificationEpicAction";


const reducer = combineReducers({
    reportsReducer: reportsReducer,
    userReducer: userReducer,
    systemReducer: systemReducer,
    notificationReducer: notificationReducer,
})

const epic = combineEpics(ReportEpic, UserEpic, SystemEpic, NotificationEpic)

const epicMiddleware = createEpicMiddleware(epic);

export const store = createStore(reducer,
    applyMiddleware(epicMiddleware),
    //applyMiddleware(thunk)
);
