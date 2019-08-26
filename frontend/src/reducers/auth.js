const initialState = {
    profile: {},
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "A":
            
            return [...state]
    
        default:
            return state
    }
}

export default authReducer;