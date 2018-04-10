export const SystemAction = {
    updateToken: () => ({type: 'UPDATE_TOKEN'}),
    login: user => ({type: 'LOGIN', payload: user}),
    register: user => ({type: 'REGISTER', payload: user}),
    saveToLocalStorage: (token, lastUpdated, user) => ({
        type: 'SAVE_TO_LOCAL_STORAGE',
        payload: {
            token: token,
            currentUser: user,
            lastUpdated: lastUpdated
        }})
}

export const systemReducer = (state = {}, action) => {

    const handlers = ({
        ['SAVE_TO_LOCAL_STORAGE_DONE']: (state, action) => ({
            ...state
        }),
        ['UPDATE_TOKEN_DONE']: (state, action) => action.payload != null ?
            ({...state,
                lastUpdated: Date.now(),
                token: action.payload}) : state,
        ['LOGIN_DONE']: (state, action) => ({
            ...state,
            lastUpdated: Date.now(),
            token: action.payload
        }),
        ['REGISTER_DONE']: (state, action) => ({
            ...state,
            currentUser: action.payload
        })
    })

    return handlers[action.type] ?
        handlers[action.type](state, action) : state
}