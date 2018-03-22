export const SystemAction = {
    login: user => ({type: 'LOGIN', payload: user}),
    register: user => ({type: 'REGISTER', payload: user})
}

export const systemReducer = (state = {}, action) => {

    const handlers = ({
        ['LOGIN_DONE']: (state, action) => ({...state, token: action.payload}),
        ['REGISTER_DONE']: (state, action) => ({...state, currentUser: action.payload})
    })

    return handlers[action.type] ?
        handlers[action.type](state, action) : state
}