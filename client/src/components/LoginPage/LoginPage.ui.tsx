import * as React from 'react'
import './styles.css'
import { Container, Grid, TextField, Typography, Button } from '@material-ui/core'
import { ApplicationState } from '../../redux/state/ApplicationState'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/index'


interface ILoginPageState {
    email: string,
    password: string,
}


interface ILoginPageProps {
    enableErrorPage: () => void
    updateTicketTable: (content:any) => void
    tickets: any
}

class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {

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
                this.props.updateTicketTable(res.data.requests)
            }
        })

    }

    public render() {
        console.log(this.props.tickets)
        return (
            <div className={'login-page'}>
                <Container fixed>
                    <Typography variant="h6" gutterBottom>
                        Sign into Ticket Viewer
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-email"
                                label="Email"
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => this.handleOnEmailChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-password"
                                label="Password"
                                margin="normal"
                                variant="outlined"
                                type="password"
                                onChange={(e) => this.handleOnPasswordChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                style={{ margin: '15px', width: '223px' }}
                                variant="contained"
                                color="primary"
                                disableRipple
                                onClick={(e) => this.handleOnSignin(e)}
                            >
                                Sign in
                            </Button>
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
        updateTicketTable: (content:any) => dispatch(actions.updateTicketTable(content))
    }
}
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)