

export class UserAction {

    constructor(token) {
        this.token = token;
    }

    getCurrentUser = () => ({type: 'GET_CURRENT_USER', token: this.token})
}

export const userReducer = (state = {}, action) => {
    const handlers = ({
        ['CURRENT_USER_DONE']: (state, action) =>
            ({...state, currentUser: action.payload})
    })

    return handlers[action.type] ?
        handlers[action.type](state, action) : state
}