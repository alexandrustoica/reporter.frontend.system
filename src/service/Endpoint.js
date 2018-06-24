//const base = '172.30.114.16'
const base = '192.168.0.30'

export const Endpoint = {
    LOGIN: `http://${base}:8080/login`,
    REGISTER: `http://${base}:8080/users/register`,
    REPORTS: `http://${base}:8080/reports`,
    // PHOTOS: (id) => `http://${base}:8080/reports/${id}/photos`,
    USERS: `http://${base}:8080/users`,
    NOTIFICATIONS: `http://${base}:8080/notifications`,
    CRITICAL_SECTIONS: `http://${base}:8080/sections`,
    WS: `ws://${base}:8080/ws_reports`
}