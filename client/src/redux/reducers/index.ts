const InitialState = {
    isUserValid: true, 
    viewWholeTable: true, 
    viewSingleTicketPage: false,
    disableLoginPage: false,
    sessionEmail: '',
    sessionPassword:'',
    errorMessage: ''
}


export function rootReducer(state = InitialState, action: any) {
    switch (action.type) {
        case 'ENABLE_ERROR_PAGE':
            return { ...state, isUserValid: false, errorMessage: action.payload }
        case 'UPDATE_TICKETS':
            return { ...state, tickets: action.content }
        case 'DISABLE_LOGIN_PAGE':
            return { ...state, disableLoginPage: true }
        case 'ENABLE_TICKETSTABLE_PAGE':
            return { ...state, viewWholeTable: true, viewSingleTicketPage: false }
        case 'ENABLE_SINGLE_TICKET_PAGE':
            return { ...state, viewSingleTicketPage: true, viewWholeTable:false, currentTicket: action.payload }
        case 'RESET_APPLICATION':
            return { ...InitialState}
        case 'UPDATE_SESSION_IDENTITY':
            return { ...state, sessionEmail: action.email ,sessionPassword: action.password}
        default:
            return state
    }
}
