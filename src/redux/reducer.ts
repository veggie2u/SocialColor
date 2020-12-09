const defaultState = {
    user: {},
    config: {}
}

export default function reducer(state = defaultState, { type, payload }: { type: string, payload: any}): any {
    switch (type) {
        case 'SET_USER_STATE':
            return {
                ...state,
                user: {
                    email: payload.email
                }
            }
        case 'SET_CONFIG_STATE':
            return {
                ...state,
                config: {
                    name: payload.name
                }
            }
    }
    return state
}
