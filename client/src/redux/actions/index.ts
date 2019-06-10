
export function enableErrorPage():any{
    return{
        type: 'ENABLE_ERROR_PAGE',
    }
}

export function updateTicketTable(content:any):any{
    return{
        type: 'UPDATE_TICKETS',
        content: content
    }
}

export function disableLoginPage():any{
    return{
        type: 'DISABLE_LOGIN_PAGE',
    }
}

export function enableTicketsTablePage():any{
    return{
        type: 'ENABLE_TICKETSTABLE_PAGE',
    }
}

export function enableSingleTicketPage(row:any):any{
    console.log(row)
    return{
        type: 'ENABLE_SINGLE_TICKET_PAGE',
        payload: row
    }
}

export function resetApplication():any{
    return{
        type: 'RESET_APPLICATION',
    }
}