import {Endpoint} from "../service/Endpoint";
import {store} from "./store";
import {ReportEpicFollowUpAction} from "../service/ReportEpicActions";

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
            const handlers = ({
                ['REPORT_CREATED']: (report) =>
                    store.dispatch(ReportEpicFollowUpAction.addToNearReports(report)),
                ['REPORT_DELETED']: (report) =>
                    store.dispatch(ReportEpicFollowUpAction.delete(report)),
                ['REPORT_MARKED_AS_SOLVED']: (report) =>
                    store.dispatch(ReportEpicFollowUpAction.markReportAsSolved(report)),
                ['REPORT_MARKED_AS_SPAM']: (report) =>
                    store.dispatch(ReportEpicFollowUpAction.markReportAsSpam(report)),
            })
            handlers[event.type] ? handlers[event.type](event.data) : null
        }

        this.websocket.onerror = (event) => console.log(event.message)
    }

    close = () =>{
        this.websocket.close()
        console.log("WebSocket Closed!")
    }
}

export const webSocketConnection = new WebSocketConnection()