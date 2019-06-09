import * as React from 'react'
import './styles.css'
import { Container, Grid, TextField, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { ApplicationState } from '../../redux/state/ApplicationState'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/index'


interface ILoginPageState {
    email: string,
    password: string,
}


interface ILoginPageProps {
    enableErrorPage: () => void
    disableLoginPage: () => void
    updateTicketTable: (content:any) => void
    tickets: any
}

class TicketsTable extends React.Component<ILoginPageProps, ILoginPageState> {

    constructor(props: any) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleOnEmailChange(event: React.SyntheticEvent){
        let currentTarget = event.currentTarget as HTMLInputElement
        this.setState({
            email: currentTarget.value
        })
    }

    handleOnPasswordChange(event: React.SyntheticEvent){
        let currentTarget = event.currentTarget as HTMLInputElement
        this.setState({
            password: currentTarget.value
        })
    }

    handleOnSignin(event: React.SyntheticEvent){
        fetch("http://localhost:5000/")
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.data.error === "Couldn't authenticate you"){
                this.props.enableErrorPage()
            } else {
                this.props.disableLoginPage()
                this.props.updateTicketTable(res.data.requests)
            }
        })

    }

    public render() {
        console.log(this.props.tickets)
        return (
            <div className={'login-page'}>
                <Container fixed>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell> Hello </TableCell>
                                        <TableCell align="right"> What </TableCell>
                                        <TableCell align="right"> What </TableCell>
                                        <TableCell align="right"> What </TableCell>
                                        <TableCell align="right"> What </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={'hello'}>
                                        <TableCell component = "th" scope="row">
                                            name
                                        </TableCell>
                                        <TableCell align="right">hie</TableCell>
                                        <TableCell align="right">hie</TableCell>
                                        <TableCell align="right">hie</TableCell>
                                        <TableCell align="right">hie</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }

}


function mapStateToProps({isUserValid, tickets}: ApplicationState){
    return {
      isUserValid,
      tickets
    }
  }

function mapDispatchToProps(dispatch:any){
    return {
        enableErrorPage: () => dispatch(actions.enableErrorPage()),
        updateTicketTable: (content:any) => dispatch(actions.updateTicketTable(content)),
        disableLoginPage: () => dispatch(actions.disableLoginPage()),
    }
}
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(TicketsTable)