import * as React from 'react'
import './styles.css'
import { CardActions, Typography, Button, Card, CardContent, Icon, Tooltip, Grid } from '@material-ui/core'
import { ApplicationState } from '../../redux/state/ApplicationState'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/index'

interface ISingleTicketProps {
    enableTicketsTablePage: () => void
    currentTicket: any
}

class SingleTicket extends React.Component<ISingleTicketProps> {

    handleOnClick(event: React.SyntheticEvent) {
        let currentTarget = event.currentTarget as HTMLInputElement
        this.setState({
            email: currentTarget.value
        })
    }

    public render() {
        const currentTicket = this.props.currentTicket
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
                            Ticket (ID: {currentTicket.id}) Details
                        {!currentTicket.can_be_solved_by_me ?
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
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={5}>
                            Status: {currentTicket.status}
                        </Grid>
                        <Grid item xs={6}>
                            Requester
                            </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={5}>
                            Organisation
                        </Grid>
                        <Grid item xs={6}>
                            Assignee
                        </Grid>
                        <Grid item xs={1}>

                        </Grid>
                        <Grid item xs={11}>
                            Labels
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={10}>
                            Subject: {currentTicket.subject}
                        </Grid>
                        <Grid item xs={1}>

                        </Grid>
                        <Grid item xs={1}>

                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="h5" component="h2">
                                Description:
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="body2" component="p">
                                {currentTicket.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                    </Grid>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={10}>
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    style={{
                                        backgroundColor: '#0E373D',
                                        color: 'white'
                                    }}
                                    variant="outlined"
                                    size="medium"
                                    onClick={this.props.enableTicketsTablePage}
                                > Back to all tickets </Button>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            </div>
        )
    }
}


function mapStateToProps({ isUserValid, currentTicket }: ApplicationState) {
    return {
        isUserValid,
        currentTicket
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        enableTicketsTablePage: () => dispatch(actions.enableTicketsTablePage()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleTicket)