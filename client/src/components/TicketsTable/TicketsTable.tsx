import * as React from 'react'
import './styles.css'
import { Container, Grid, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Paper, TableFooter } from '@material-ui/core'
import { ApplicationState } from '../../redux/state/ApplicationState'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/index'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            color: theme.palette.text.secondary,
            marginLeft: theme.spacing(2.5),
        },
    }),
);


interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    function handleFirstPageButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        onChangePage(event, 0);
    }

    function handleBackButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        onChangePage(event, page - 1);
    }

    function handleNextButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        onChangePage(event, page + 1);
    }

    function handleLastPageButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    }

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="First Page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Next Page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Last Page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}


interface ILoginPageState {
    email: string,
    password: string,
    simplifiedTickets: any,
    page: number,
    setPage: number,
    setRowsPerPage: number
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
            simplifiedTickets: {},
            page: 0,
            setPage: 0,
            setRowsPerPage: 5
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

    handleChangePage(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
        newPage: number,
    ) {
        this.setState({
            setPage: newPage
        })
    }


    handleChangeRowsPerPage(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        this.setState({
            setRowsPerPage: parseInt(event.target.value, 10)
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
        const useStyles2 = makeStyles((theme: Theme) =>
            createStyles({
                root: {
                    width: '100%',
                    marginTop: theme.spacing(3),
                },
                table: {
                    minWidth: 500,
                },
                tableWrapper: {
                    overflowX: 'auto',
                },
            }),
        );
        // const classes = useStyles2();
        let rows = filteredTickets
        const emptyRows = 25 - Math.min(25, 101 - this.state.page * 25);

        return (
            <div className={'login-page'}>
                <Container fixed>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Paper>
                                <div >
                                    <Table>
                                        <TableBody>
                                            {rows===undefined?null:rows.slice(this.state.page * 25, this.state.page * 25 + 25).map((row: any) => (
                                                <TableRow key={row.id}>
                                                    <TableCell component="th" scope="row">
                                                        {row.status}
                                                    </TableCell>
                                                    <TableCell align="right">{row.created_at}</TableCell>
                                                    <TableCell align="right">{row.updated_at}</TableCell>
                                                </TableRow>
                                            ))}
                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: 48 * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10, 25]}
                                                    colSpan={3}
                                                    count={rows ===undefined?0:rows.length}
                                                    rowsPerPage={25}
                                                    page={this.state.page}
                                                    SelectProps={{
                                                        inputProps: { 'aria-label': 'Rows per page' },
                                                        native: true,
                                                    }}
                                                    onChangePage={this.handleChangePage}
                                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                                    ActionsComponent={TablePaginationActions}
                                                />
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </div>
                            </Paper>
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
                                onChangePage={this.handleChangePage}
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