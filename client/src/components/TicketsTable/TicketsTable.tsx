import * as React from 'react'
import './styles.css'
import { Container, Grid, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Paper, Button } from '@material-ui/core'
import { ApplicationState } from '../../redux/state/ApplicationState'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/index'
import SingleTicket from '../SingleTicket/SingleTicket'

interface ITicketsTableState {
    page: number,
    rowsPerPage: number,
}

interface ITicketsTableProps {
    enableSingleTicketPage: () => void,
    resetApplication: () => void
    tickets: any,
    viewWholeTable: boolean,
    viewSingleTicketPage: boolean,
}

class TicketsTable extends React.Component<ITicketsTableProps, ITicketsTableState> {

    constructor(props: any) {
        super(props)
        this.state = {
            page: 0,
            rowsPerPage: 25
        }
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    handleChangePage(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
        newPage: number,
    ) {
        console.log(newPage)
        this.setState({
            page: newPage
        })
    }


    handleChangeRowsPerPage(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        console.log(event.target.value)
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10)
        })
    }

    public render() {

        let rows: any
        let emptyRows = 0

        if (this.props.tickets !== undefined) {
            rows = this.props.tickets.map((ticket: any) => {
                return {
                    id: ticket.id,
                    status: ticket.status,
                    subject: (ticket.subject.length > 50) ? ticket.subject.substring(0, 50) + '...' : ticket.subject,
                    is_public: ticket.is_public,
                    created_at: ticket.created_at,
                    updated_at: ticket.updated_at
                }
            })
            emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, rows.length - this.state.page * this.state.rowsPerPage);
        } else {
            rows = undefined
        }

        return (
            <div className={'tickets-tabke-page'}>
                <Container fixed>
                    {this.props.viewSingleTicketPage ? <SingleTicket /> : null}
                    {this.props.viewWholeTable
                        ?
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <Button
                                variant="outlined"
                                color="secondary"
                                style={{marginTop:'10px'}}
                                onClick={this.props.resetApplication}
                                > Sign out </Button>
                            </Grid>
                            <Grid item xs={2}>
                            </Grid>
                            <Grid item xs={8}>
                                <TablePagination
                                    component="div"
                                    align='right'
                                    rowsPerPageOptions={[5, 10, 25, 30]}
                                    colSpan={3}
                                    count={rows === undefined ? 0 : rows.length}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'Rows per page' },
                                        native: true,
                                    }}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Paper>
                                    <div >
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell> ID </TableCell>
                                                    <TableCell> Status </TableCell>
                                                    <TableCell> Subject </TableCell>
                                                    <TableCell> Created at </TableCell>
                                                    <TableCell> Updated at </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody
                                                onClick={this.props.enableSingleTicketPage}
                                            >
                                                {rows === undefined
                                                    ?
                                                    null
                                                    :
                                                    rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                                        .map((row: any) => (
                                                            <TableRow
                                                                key={row.id}
                                                                hover
                                                                className={'table-row'}
                                                            >
                                                                <TableCell>
                                                                    {row.id}
                                                                </TableCell>
                                                                <TableCell >{row.status}</TableCell>
                                                                <TableCell>{row.subject}</TableCell>
                                                                <TableCell>{row.created_at}</TableCell>
                                                                <TableCell>{row.updated_at}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: 48 * emptyRows }}>
                                                        <TableCell colSpan={6} />
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                        :
                        null
                    }
                </Container>
            </div>
        )
    }

}


function mapStateToProps({ tickets, viewWholeTable, viewSingleTicketPage }: ApplicationState) {
    return {
        tickets,
        viewWholeTable,
        viewSingleTicketPage
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        enableSingleTicketPage: () => dispatch(actions.enableSingleTicketPage()),
        resetApplication: () => dispatch(actions.resetApplication()),
        updateTicketTable: (content: any) => dispatch(actions.updateTicketTable(content)),
        disableLoginPage: () => dispatch(actions.disableLoginPage()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TicketsTable)