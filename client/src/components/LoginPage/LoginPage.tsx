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
    enableErrorPage: (errorMessage: string) => void
    disableLoginPage: () => void
    updateTicketTable: (content: any) => void
    updateSessionIdentity: (email: string, password: string) => void
    tickets: any,
}

class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {

    constructor(props: any) {
        super(props)
        this.state = {
            email: '',
            password: ''
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

    handleOnSignin() {
        const { email, password } = this.state
        fetch(`http://localhost:5000/api/tickets/${email}/${password}`)
            .then(res => res.json())
            .then(res => {
                if (res.err) {
                    this.props.enableErrorPage('Error occured, please try again later')
                } else {
                    if (res.data.error === "Couldn't authenticate you") {
                        this.props.enableErrorPage('Email address / password combination is incorrect, try again.')
                    } else {
                        this.props.disableLoginPage()
                        this.props.updateTicketTable(res.data.requests)
                        this.props.updateSessionIdentity(email, password)
                    }
                }
            }).catch(() => {
                this.props.enableErrorPage('Server unavailable, please contact zendesk support or try again later')
            })
    }

    public render() {
        const { email, password } = this.state
        return (
            <div className={'login-page'}>
                <Container fixed>
                    <Typography variant="h6" gutterBottom>
                        Sign into Ticket Viewer for rozajaybird.zendesk.com
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
                                style={{
                                    margin: '15px',
                                    width: '223px',
                                    backgroundColor: '#0E373D',
                                    color: 'white'
                                }}
                                variant="contained"
                                disableRipple
                                disabled={(email.length > 1 && password.length > 1) ? false : true}
                                onClick={() => this.handleOnSignin()}
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


function mapStateToProps({ tickets }: ApplicationState) {
    return {
        tickets
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        enableErrorPage: (errorMessage: string) => dispatch(actions.enableErrorPage(errorMessage)),
        updateTicketTable: (content: any) => dispatch(actions.updateTicketTable(content)),
        disableLoginPage: () => dispatch(actions.disableLoginPage()),
        updateSessionIdentity: (email: string, password: string) => dispatch(actions.updateSessionIdentity(email, password))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)