import {Endpoint} from "../service/Endpoint";
import {store} from "./store";
import {ReportEpicFollowUpAction} from "../service/ReportEpicActions";
import {NotificationEpicFollowUpAction} from "../service/NotificationEpicAction";

class WebSocketConnection {

    constructor() {
        this.websocket = null
    }

    open = () => {
        this.websocket = new WebSocket(Endpoint.WS)

        this.websocket.onopen = (event) =>
            console.log("WebSocket Opened!")

        this.websocket.onmessage = (event) =>
            eventReducer(JSON.parse(event.data))

        this.websocket.onerror = (event) =>
            console.log(event.message)
    }

    close = () => R.compose(
        message => console.log(message),
        () => this.websocket.close)("WebSocket Closed!")
}

const eventReducer = (event) => {
    const handlers = ({
        ['REPORT_CREATED']: (report) => (!report.isSpam) ?
            store.dispatch(ReportEpicFollowUpAction.addToNearReports(report)) : {},
        ['REPORT_DELETED']: (report) =>
            store.dispatch(ReportEpicFollowUpAction.delete(report)),
        ['REPORT_SOLVED']: (report) =>
            store.dispatch(ReportEpicFollowUpAction.markReportAsSolved(report)),
        ['REPORT_MARKED_AS_SPAM']: (report) =>
            store.dispatch(ReportEpicFollowUpAction.markReportAsSpam(report)),
        ['NOTIFICATION_CREATED']: (notification) =>
            store.dispatch(NotificationEpicFollowUpAction.add(notification)),
        ['SECTION_CREATED']: (section) =>
            store.dispatch(ReportEpicFollowUpAction.addCreatedSection(section)),
        ['SECTION_DELETED']: (section) =>
            store.dispatch(ReportEpicFollowUpAction.deleteSection(section)),
        ['NOTIFICATION_MARKED_AS_READ']: (notification) =>
            store.dispatch(NotificationEpicFollowUpAction.markNotificationAsRead(notification))
    })
    handlers[event.type] ?
        handlers[event.type](event.data) : null
}

export const webSocketConnection = new WebSocketConnection()