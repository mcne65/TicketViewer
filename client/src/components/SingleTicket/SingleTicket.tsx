import * as React from 'react'
import './styles.css'
import { Chip, Typography, Button, Card, CardContent, Icon, Tooltip, Grid } from '@material-ui/core'
import { ApplicationState } from '../../redux/state/ApplicationState'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/index'

interface ISingleTicketProps {
    enableTicketsTablePage: () => void
    currentTicket: any

}


interface ISingleTicketState {
    organisationName: string,
    assigneeName: string,
    requesterName: string,
    ticketTags: any
}

class SingleTicket extends React.Component<ISingleTicketProps, ISingleTicketState> {

    constructor(props: any) {
        super(props)
        this.state = {
            organisationName: '',
            assigneeName: '',
            requesterName: '',
            ticketTags: []
        }
    }

    componentDidMount() {
        const organisationName = fetch("http://localhost:5000/organisationID")
            .then(res => res.json())
            .then(res => {
                if (res.data.error === "Couldn't authenticate you") {
                    // this.props.enableErrorPage()
                } else {
                    // this.props.disableLoginPage()
                    // this.props.updateTicketTable(res.data.requests)
                    console.log(res.data)
                    this.setState({
                        organisationName: res.data.organization.name
                    })
                }
            })

        const userName = fetch("http://localhost:5000/userID")
            .then(res => res.json())
            .then(res => {
                if (res.data.error === "Couldn't authenticate you") {
                    // this.props.enableErrorPage()
                } else {
                    // this.props.disableLoginPage()
                    // this.props.updateTicketTable(res.data.requests)
                    console.log(res.data)
                    this.setState({
                        requesterName: res.data.user.name,
                        assigneeName: res.data.user.name
                    })
                }
            })
        
        const tagId = this.props.currentTicket.id
        const tags = fetch(`http://localhost:5000/api/tags/${tagId}`)
            .then(res => res.json())
            .then(res => {
                if (res.data.error === "Couldn't authenticate you") {
                    // this.props.enableErrorPage()
                } else {
                    // this.props.disableLoginPage()
                    // this.props.updateTicketTable(res.data.requests)
                    console.log(res.data)
                    this.setState({
                        ticketTags: res.data.tags
                    })
                }
            })

        Promise.all([organisationName, userName, tags])
    }

    public render() {
        const currentTicket = this.props.currentTicket
        const ticketTags = this.state.ticketTags
        console.log(this.state.ticketTags)
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
                            <Typography variant="h5" component="h4">
                                <b>Status:</b> {currentTicket.status}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h5" component="h4">
                                <b>Requester:</b> {this.state.requesterName}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant="h5" component="h4">
                                <b>Organisation:</b> {this.state.organisationName}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h5" component="h4">
                                <b>Assignee:</b> {this.state.assigneeName}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={11}>
                            <Typography variant="h5" component="h4">
                                <b>Labels:</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={10}>
                            {
                                ticketTags.map(
                                    (elem: any) => {
                                        return <Chip key={elem} variant="outlined" size="small" label={elem} />;
                                    }
                                )
                            }
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="h5" component="h3">
                                <b>Subject:</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="body2" component="p">
                                {currentTicket.subject}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="h5" component="h3">
                                <b>Description:</b>
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