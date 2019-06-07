import * as React from 'react'
import './styles.css'
import logo from '../../media/z-logo.svg'
import { Container, Grid, TextField, Typography, Button } from '@material-ui/core'

export class ErrorPage extends React.Component<any, any> {

    public render() {
        return (
            <div className={'error-page'}>
                <Container fixed>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography component="div" style={{ backgroundColor: '#ffeded', height: '50px' }}>
                                <div style={{ paddingTop: '14px', fontSize: '14px' }}>
                                    Email address / password combination is incorrect, try again.
                                </div>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }

}