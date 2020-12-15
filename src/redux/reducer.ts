const defaultState = {
    user: {},
    config: {},
    colors: [
        { color: '"#7b1fa2', name: 'test', timestamp: '123' }
    ],
    currentColor: {},
}

export default function reducer(state = defaultState, { type, payload }: { type: string, payload: any}): any {
    switch (type) {
        case 'SET_USER_ACTION':
            return {
                ...state,
                user: {
                    email: payload.email,
                    uid: payload.uid
                }
            }
        case 'SET_CONFIG_ACTION':
            return {
                ...state,
                config: {
                    name: payload.name
                }
            }
        case 'SET_COLORS_ACTION':
            return {
                ...state,
                colors: payload.colors
            }
        }
    return state
}
