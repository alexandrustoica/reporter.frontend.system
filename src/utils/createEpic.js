import * as Rx from "rxjs/Rx";

const createEpicWith = (forActionType, withPromise, withTranslation, errorHandler) => action$ =>
    action$.ofType(forActionType).mergeMap(action => Rx.Observable
        .fromPromise(withPromise(action))
        .map(withTranslation)
        .catch(errorHandler))

const defaultErrorHandler = error => Rx.Observable.of(
    ({type: 'DEFAULT_ERROR', payload: error}))

export const createEpic = () => ({
    forActionType: type => ({
        withPromise: promise => ({
            map: (func, errorHandler = defaultErrorHandler) =>
                createEpicWith(type, promise, func, errorHandler)
        }),
        withPromiseToJson: promise => ({
            map: (func, errorHandler = defaultErrorHandler) => createEpicWith(
                type, action => promise(action).then(response => response.json()), func, errorHandler)
        })
    })
})