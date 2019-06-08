export function rootReducer(state = {isUserValid:true}, action:any){
    switch(action.type) {
        case 'ENABLE_ERROR_PAGE':
            return {...state, isUserValid: false}
        case 'UPDATE_TICKETS':
            return {...state, tickets: action.content}
        default:
            return state
    }
}
