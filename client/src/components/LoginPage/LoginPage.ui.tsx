import * as React from 'react'
import './styles.css'
import { Container, Grid, TextField, Typography, Button } from '@material-ui/core'

export class LoginPage extends React.Component<any, any> {

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
                                id="outlined-name"
                                label="Email"
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-name"
                                label="Password"
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                            className={'sign-in-button'}
                            style={{margin: '15px'}}
                            variant="contained"
                            color="primary"
                            disableRipple>
                                Sign in
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }

}