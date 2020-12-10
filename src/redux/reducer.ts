const defaultState = {
    user: {},
    config: {},
    data: {
        color: 'red'
    }
}

export default function reducer(state = defaultState, { type, payload }: { type: string, payload: any}): any {
    switch (type) {
        case 'SET_USER_ACTION':
            return {
                ...state,
                user: {
                    email: payload.email
                }
            }
        case 'SET_CONFIG_ACTION':
            return {
                ...state,
                config: {
                    name: payload.name
                }
            }
        case 'SET_COLOR_ACTION':
            return {
                ...state,
                data: {
                    color: payload.color
                }
            }
    }
    return state
}
