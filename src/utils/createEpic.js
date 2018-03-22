import * as Rx from "rxjs/Rx";

const createEpicWith = (forActionType, withPromise, withTranslation) => action$ =>
    action$.ofType(forActionType).mergeMap(action => Rx.Observable
        .fromPromise(withPromise(action))
        .map(withTranslation))

export const createEpic = () => ({
    forActionType: type => ({
        withPromise: promise => ({
            map: func => createEpicWith(type, promise, func)
        }),
        withPromiseToJson: promise => ({
            map: func => createEpicWith(
                type, action => promise(action).then(response => response.json()), func)
        })
    })
})