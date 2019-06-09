import * as React from 'react'
import './styles.css'
import { Container, Grid, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@material-ui/core'
import { ApplicationState } from '../../redux/state/ApplicationState'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/index'


interface ILoginPageState {
    email: string,
    password: string,
    simplifiedTickets: any
}


interface ILoginPageProps {
    enableErrorPage: () => void
    disableLoginPage: () => void
    updateTicketTable: (content: any) => void
    tickets: any
}

class TicketsTable extends React.Component<ILoginPageProps, ILoginPageState> {

    constructor(props: any) {
        super(props)
        this.state = {
            email: '',
            password: '',
            simplifiedTickets: {}
        }
    }

    componentDidMount() {
        console.log(this.props.tickets)
        if (this.props.tickets !== undefined) {
            const filteredTickets = this.props.tickets.map((ticket: any) => {
                return {
                    id: ticket.id,
                    status: ticket.status,
                    subject: ticket.subject,
                    is_public: ticket.is_public,
                    created_at: ticket.created_at,
                    updated_at: ticket.updated_at
                }

            })
            this.setState({
                simplifiedTickets: filteredTickets
            })
        }
    }

    handleOnEmailChange(event: React.SyntheticEvent) {
        let currentTarget = event.currentTarget as HTMLInputElement
        this.setState({
            email: currentTarget.value
        })
    }

    handleOnPasswordChange(event: React.SyntheticEvent) {
        let currentTarget = event.currentTarget as HTMLInputElement
        this.setState({
            password: currentTarget.value
        })
    }

    handleOnSignin(event: React.SyntheticEvent) {
        fetch("http://localhost:5000/")
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.data.error === "Couldn't authenticate you") {
                    this.props.enableErrorPage()
                } else {
                    this.props.disableLoginPage()
                    this.props.updateTicketTable(res.data.requests)
                }
            })

    }

    public render() {
        console.log(this.props.tickets)
        let filteredTickets: any

        if (this.props.tickets !== undefined) {
            filteredTickets = this.props.tickets.map((ticket: any) => {
                return {
                    id: ticket.id,
                    status: ticket.status,
                    subject: (ticket.subject.length > 50) ? ticket.subject.substring(0, 50) + '...' : ticket.subject,
                    is_public: ticket.is_public,
                    created_at: ticket.created_at,
                    updated_at: ticket.updated_at
                }
            })
            console.log(filteredTickets)
        } else {
            filteredTickets = undefined
        }

        return (
            <div className={'login-page'}>
                <Container fixed>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell> ID </TableCell>
                                        <TableCell align="right"> Status </TableCell>
                                        <TableCell> Subject </TableCell>
                                        <TableCell align="right"> Created at </TableCell>
                                        <TableCell align="right"> Updated at </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(filteredTickets === undefined) ? null : filteredTickets.map((ticket: any) => (
                                        <TableRow 
                                        className={'table-row'}
                                        key={ticket.id}
                                        hover
                                        onClick={() => console.log('display this row')}
                                        >
                                            <TableCell component="th" scope="row">
                                                {ticket.id}
                                            </TableCell>
                                            <TableCell align="right">{ticket.status}</TableCell>
                                            <TableCell>{ticket.subject}</TableCell>
                                            <TableCell align="right">{ticket.created_at}</TableCell>
                                            <TableCell align="right">{ticket.updated_at}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                component="div"
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={filteredTickets === undefined ? 0 : filteredTickets.length}
                                rowsPerPage={25}
                                page={2}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'Rows per page' },
                                    native: true,
                                }}
                                onChangePage={() => console.log('hies')}
                            // onChangeRowsPerPage={handleChangeRowsPerPage}
                            // ActionsComponent={TablePaginationActions}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }

}


function mapStateToProps({ isUserValid, tickets }: ApplicationState) {
    return {
        isUserValid,
        tickets
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        enableErrorPage: () => dispatch(actions.enableErrorPage()),
        updateTicketTable: (content: any) => dispatch(actions.updateTicketTable(content)),
        disableLoginPage: () => dispatch(actions.disableLoginPage()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TicketsTable)