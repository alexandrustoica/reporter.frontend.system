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

        this.websocket.onopen = (event) => {
            console.log("WebSocket Opened!")
        }

        this.websocket.onmessage = (event) => {
            const broadcastEvent = JSON.parse(event.data)
            console.log(broadcastEvent)
            const handlers = ({
                ['REPORT_CREATED']: (report) => (!report.isSpam) ?
                    store.dispatch(ReportEpicFollowUpAction.addToNearReports(report)) : {},
                ['REPORT_DELETED']: (report) =>
                    store.dispatch(ReportEpicFollowUpAction.delete(report)),
                ['REPORT_SOLVED']: (report) =>
                    store.dispatch(ReportEpicFollowUpAction.markReportAsSolved(report)),
                ['REPORT_MARKED_AS_SPAM']: (report) =>
                    store.dispatch(ReportEpicFollowUpAction.markReportAsSpam(report)),
                // ['NOTIFICATION_CREATED'] : (notification) =>
                //     store.dispatch(NotificationEpicFollowUpAction.getAll([notification])),
                ['SECTION_CREATED']: (section) =>
                    store.dispatch(ReportEpicFollowUpAction.addCreatedSection(section)),
                ['SECTION_DELETED']: (section) =>
                    store.dispatch(ReportEpicFollowUpAction.deleteSection(section)),
                ['NOTIFICATION_MARKED_AS_READ']: (notification) =>
                    store.dispatch(NotificationEpicFollowUpAction.markNotificationAsRead(notification))
            })
            handlers[broadcastEvent.type] ?
                handlers[broadcastEvent.type](broadcastEvent.data) : null
        }

        this.websocket.onerror = (event) => console.log(event.message)
    }

    close = () => {
        this.websocket.close()
        console.log("WebSocket Closed!")
    }
}

export const webSocketConnection = new WebSocketConnection()