
export function enableErrorPage():any{
    return{
        type: 'ENABLE_ERROR_PAGE',
        status: false
    }
}

export function updateTicketTable(content:any):any{
    return{
        type: 'UPDATE_TICKETS',
        content: content
    }
}