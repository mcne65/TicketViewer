export function rootReducer(state = { isUserValid: true, viewWholeTable: true, viewSingleTicketPage: false }, action: any) {
    switch (action.type) {
        case 'ENABLE_ERROR_PAGE':
            return { ...state, isUserValid: false }
        case 'UPDATE_TICKETS':
            return { ...state, tickets: action.content }
        case 'DISABLE_LOGIN_PAGE':
            return { ...state, disableLoginPage: true }
        case 'ENABLE_TICKETSTABLE_PAGE':
            return { ...state, viewWholeTable: true, viewSingleTicketPage: false }
        case 'ENABLE_SINGLE_TICKET_PAGE':
            return { ...state, viewSingleTicketPage: true, viewWholeTable:false }
        default:
            return state
    }
}
