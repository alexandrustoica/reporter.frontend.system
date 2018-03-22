const withData = (method, token, body) => ({
    method: method,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
    },
    body: JSON.stringify(body)
})


export const getDataFromServer = () => ({
    fromEndpoint: endpoint => ({
        withMethod: method => ({
            withToken: token => ({
                withNothing: () => fetch(endpoint, withData(method, token)),
                with: data => fetch(endpoint, withData(method, token, data))
            })
        })
    })
})