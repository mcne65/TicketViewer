import * as React from 'react'
import './styles.css'
import { Container, Grid, TextField, Typography, Button } from '@material-ui/core'

interface LoginPageState {
    email: string,
    password: string,
}

export class LoginPage extends React.Component<any, LoginPageState> {

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
        console.log(this.state)
        fetch("http://localhost:5000/")
        .then(res => res.json())
        .then(res => console.log(res))
    }

    public render() {
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