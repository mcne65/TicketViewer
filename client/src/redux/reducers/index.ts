export function rootReducer(state = {isUserValid:true}, action:any){
    switch(action.type) {
        case 'ENABLE_ERROR_PAGE':
            return {...state, isUserValid: false}
        case 'UPDATE_TICKETS':
            return {...state, tickets: action.content}
        case 'DISABLE_LOGIN_PAGE':
            return {...state, disableLoginPage: true}
        default:
            return state
    }
}
