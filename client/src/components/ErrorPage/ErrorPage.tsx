import * as React from 'react'
import './styles.css'
import { Container, Grid, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { ApplicationState } from '../../redux/state/ApplicationState'

interface IErrorPageProps {
    errorMessage: string
}

class ErrorPage extends React.Component<IErrorPageProps> {

    public render() {
        return (
            <div className={'error-page'}>
                <Container fixed>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography component="div" style={{ backgroundColor: '#ffeded', height: '50px' }}>
                                <div style={{ paddingTop: '14px', fontSize: '14px' }}>
                                    {this.props.errorMessage}
                                </div>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
}

function mapStateToProps({ errorMessage }: ApplicationState) {
    return {
        errorMessage
    }
}

export default connect(mapStateToProps)(ErrorPage)