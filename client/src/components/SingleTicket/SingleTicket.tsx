import * as React from 'react'
import './styles.css'
import { CardActions, Typography, Button, Card, CardContent, Icon, Tooltip, Grid } from '@material-ui/core'
import { ApplicationState } from '../../redux/state/ApplicationState'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/index'

interface ISingleTicketProps {
    enableTicketsTablePage: () => void
    tickets: any
}

class SingleTicket extends React.Component<ISingleTicketProps> {

    handleOnClick(event: React.SyntheticEvent) {
        let currentTarget = event.currentTarget as HTMLInputElement
        this.setState({
            email: currentTarget.value
        })
    }

    public render() {

        return (
            <div className={'single-ticket-page'}>
                <Card>
                    <CardContent>
                        <Typography
                            className={'card-title'}
                            color="textPrimary"
                            gutterBottom align="left"
                            variant="h5"
                        >
                            Ticket (ID: 1) Details
                        {true ?
                                <Tooltip title="Not solvable by me" placement="top">
                                    <Icon style={{ color: 'red', marginLeft: '2px' }}>
                                        cancel
                        </Icon>
                                </Tooltip> :
                                <Tooltip title="Solvable by me" placement="top">
                                    <Icon style={{ color: 'green', marginLeft: '2px' }}>
                                        check_circle
                        </Icon>
                                </Tooltip>}
                        </Typography>

                    </CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            Status
                            </Grid>
                        <Grid item xs={6}>
                            Requester
                            </Grid>
                        <Grid item xs={6}>
                            Organisation
                        </Grid>
                        <Grid item xs={6}>
                            Assignee
                        </Grid>
                        <Grid item xs={12}>
                            Labels
                        </Grid>
                        <Grid item xs={12}>
                            Subject
                        </Grid>
                        <Grid item xs={12}>
                            Description
                        </Grid>
                    </Grid>
                    <CardActions>
                        <Button
                            style={{
                                backgroundColor: '#0E373D',
                                color: 'white'
                            }}
                            variant="outlined"
                            size="medium"
                            onClick={this.props.enableTicketsTablePage}
                        > Back to all tickets </Button>
                    </CardActions>
                </Card>
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
        enableTicketsTablePage: () => dispatch(actions.enableTicketsTablePage()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleTicket)