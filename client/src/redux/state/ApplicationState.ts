export interface ApplicationState {
    isUserValid: boolean,
    disableLoginPage: boolean,
    viewWholeTable: boolean,
    viewSingleTicketPage: boolean,
    sessionEmail: string,
    sessionPassword: string,
    errorMessage: string,
    currentTicket?: any,
    tickets?: any
}