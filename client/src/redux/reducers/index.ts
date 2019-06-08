export function rootReducer(state = {isUserValid:true}, action:any){
    switch(action.type) {
        case 'ENABLE_ERROR_PAGE':
            return {...state, isUserValid: false}
        default:
            return state
    }
}
