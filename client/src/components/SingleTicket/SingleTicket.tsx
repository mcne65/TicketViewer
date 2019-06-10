import * as React from 'react'
// import './styles.css'
import { Fab, CardActions, Typography, Button, Card, CardContent, Icon, Tooltip } from '@material-ui/core'
import { ApplicationState } from '../../redux/state/ApplicationState'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/index'

interface ISingleTicketProps {
    enableTicketsTablePage: () => void
    tickets: any
}

class SingleTicket extends React.Component<ISingleTicketProps> {

    constructor(props: any) {
        super(props)
    }

    handleOnClick(event: React.SyntheticEvent) {
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


    public render() {

        return (
            <div className={'login-page'}>
                <Card>
                    <CardContent>
                        <Typography
                            className={'card-title'}
                            color="textPrimary"
                            gutterBottom align="left"
                            variant="h5"
                        >
                            Ticket Details
                        {true ? 
                        <Tooltip title="Not solvable by me" placement="top">   
                        <Icon style={{color: 'red', marginLeft: '2px'}}>
                            cancel
                        </Icon>
                        </Tooltip>:
                        <Tooltip title="Solvable by me" placement="top">   
                        <Icon style={{color: 'green', marginLeft: '2px'}}>
                            check_circle
                        </Icon>
                        </Tooltip>}
                        </Typography>
                        
                    </CardContent>
                    <CardActions>
                        <Button 
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